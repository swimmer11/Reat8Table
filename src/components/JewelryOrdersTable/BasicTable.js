import React from "react";
import "../../ProjectCSS/reactTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import dataJSON from "./data.json";


const BasicTable = () => {
  const finalData = React.useMemo(() => dataJSON, []);
  const finalColumnDef = React.useMemo(() => columnDef, []);

  const [sorting, setSorting] = React.useState([]);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,

  });



  return (
    <>

    <div className="table">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (

                    <th
                      key={columnEl.id}
                      colSpan={columnEl.colSpan}
                      onClick={columnEl.column.getToggleSortingHandler()}
                    >
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                      {/* CODE FOR UP AND DOWN SORTING */}
                      {
                        { 
                          asc: <FontAwesomeIcon icon={faSortUp} size="2x"/>, desc: <FontAwesomeIcon icon={faSortDown} size="2x" />,}[
                          columnEl.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
      <strong>
                
                Page{' '}
               {tableInstance.options.state.pagination.pageIndex} of {' '}
               {tableInstance.getPageCount() - 1}
       </strong>
       |
     <div>
       Go to page:
        
      <input className="pagination_button"  
       type="text"
        defaultValue={ tableInstance.options.state.pagination.pageIndex}
        onChange={(e) => tableInstance.setPageIndex(e.target.value)}
        style={{ width: '25px', height:'15px' }}

      />
    </div>  

           <button className="pagination_button"  onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}> {'<< Previous'} </button>
            <button className="pagination_button" onClick={() => tableInstance.nextPage()}
           disabled={!tableInstance.getCanNextPage()}> {'Next>>'} 
              </button>
           
      <select className="pagination_button"
        value={tableInstance.options.state.pagination.pageSize}
        onChange={(e) => tableInstance.setPageSize(e.target.value)}
      > 
        
        {[10, 20, 50,100].map((pageSizeEl) => {
          return (
            <option key={pageSizeEl} value={pageSizeEl}>
       Show {pageSizeEl}
            </option>
          );
        })}
      </select>
   
      </div>
     </div>   
    </>
  );
};

export default BasicTable;