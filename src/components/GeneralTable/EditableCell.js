import { useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // You need to return some JSX here, for example, an input field
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;