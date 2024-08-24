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
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import dataJSON from "./data.json";
import { Form } from 'react-bootstrap';

const BasicTable = () => {
  const finalData = React.useMemo(() => dataJSON, [])
  const finalColumnDef = React.useMemo(() => columnDef, [])

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div  style={{ marginLeft: '50px'}}>
     
     <div className="search-box">
       {/* Global Filter Input Field */}
       Search all columns:
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
            style={{ marginLeft: '10px', width: '200px' }}
        />
      </div>
      
      <table>

       
      
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => (
                <th
                  key={columnEl.id}
                  colSpan={columnEl.colSpan}
                >
                  {/* Render the Header Content */}
                  {columnEl.isPlaceholder
                    ? null
                    : flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}

                  {/* Sorting  */}
                  <span
                      
                       onClick={columnEl.column.getToggleSortingHandler()}
                  >
                    &nbsp;&nbsp;
                    {(() => {
                      const sortStatus = columnEl.column.getIsSorted();
                      if (sortStatus === 'asc') {
                        return <FontAwesomeIcon icon={faSortUp} size="2x" />;
                      } else if (sortStatus === 'desc') {
                        return <FontAwesomeIcon icon={faSortDown} size="2x" />;
                      } else {
                        return <FontAwesomeIcon icon={faSort} size="2x" />;
                      }
                    })()}
                  </span>

                  <div></div>

                  {/* Filtering  */}
                  {columnEl.column.getCanFilter() ? (
                    
                    <input
                     
                      value={columnEl.column.getFilterValue() ?? ''}
                      onChange={(e) => columnEl.column.setFilterValue(e.target.value)}
                      placeholder={`Filter ${columnEl.column.columnDef.header}`}
                      style={{ marginTop: '5px', width: '50%' }}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => (
                <td key={cellEl.id}>
                  {flexRender(
                    cellEl.column.columnDef.cell,
                    cellEl.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <strong>
          Page{' '}
          {tableInstance.options.state.pagination.pageIndex} of{' '}
          {tableInstance.getPageCount() - 1}
        </strong>
        |
        <div>
          Go to page:
          <input
            className="pagination_button"
            type="text"
            defaultValue={tableInstance.options.state.pagination.pageIndex}
            onChange={(e) => tableInstance.setPageIndex(e.target.value)}
            style={{ width: '25px', height: '15px' }}
          />
        </div>

        <button
          className="pagination_button"
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<< Previous'}
        </button>
        <button
          className="pagination_button"
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          {'Next>>'}
        </button>

        <select
          className="pagination_button"
          value={tableInstance.options.state.pagination.pageSize}
          onChange={(e) => tableInstance.setPageSize(e.target.value)}
        >
          {[10, 20, 50, 100].map((pageSizeEl) => {
            return (
              <option key={pageSizeEl} value={pageSizeEl}>
                Show {pageSizeEl}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default BasicTable;
