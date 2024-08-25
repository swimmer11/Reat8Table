import { createColumnHelper } from "@tanstack/react-table";
import EditableCell from "../GeneralTable/EditableCell";



const columnHelper = createColumnHelper();

export const columnDef = [
  columnHelper.accessor("id", {
    header: "Id",
    type: "number",
  }),
  {
    accessorKey:"first_name",
    header: "First Name",
    cell: EditableCell,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
    
  },
];
