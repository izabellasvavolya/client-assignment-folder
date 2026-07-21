import {useState} from "react";

export default function EditableTable({ tableData, onCellChange })
{
    const columns = tableData.columns;
    const data = tableData.data;

    const [visibleColumnIds, setVisibleColumnIds] = useState(() =>
            columns.map((column) => column.id)
    );

    const visibleColumns = columns.filter((column) =>
        visibleColumnIds.includes(column.id)
    );

    function toggleColumn(columnId) {
        setVisibleColumnIds((previousIds) =>
            previousIds.includes(columnId)
                ? previousIds.filter((id) => id !== columnId)
                : [...previousIds, columnId]
        );
    }

    //return jsx that react will display

    return (
        
        <div>
            {/* table title */}
            <h2>Employees</h2>

            <div>
                {columns.map((column) => (
                    <label key={column.id}>
                        <input
                            type="checkbox"
                            checked={visibleColumnIds.includes(column.id)}
                            onChange={() => toggleColumn(column.id)}
                        />
                        {column.title}
                    </label>
                ))}
            </div>
             
            {/* columns title */}
            {/* go through every item in column array */}
            <div>
                {visibleColumns.map((column) => (
                    <strong key={column.id}>
                        {column.title}{" "}
                    </strong>))}

            </div>

        {/* columns array decided which fields exist */}
        {/* the point of this is to make table dynamic and reusable */}

        {data.map((row, rowIndex) => (
            <div key={row.id}>
                {visibleColumns.map((column) => (
                    <div key ={column.id}>
                        <CellEditor
                            column={column}
                            value={row[column.id]}
                            onChange={(newValue) => 
                               onCellChange(rowIndex, column.id, newValue)
                }       />  
                </div>
                ))}        
            </div>       
        ))}
        </div>
    );
}

function CellEditor({ column, value, onChange }) {
    // number column

    if (column.type === "number") {
        return (
            <input
                type="number"
                value={value ?? ""}
                onChange = {(event) => {
                    const newValue = event.target.value;

                    onChange(
                        newValue === "" ? "" : Number(newValue)
                    );
                }}
                />
        );
    }

    // bool column
    if (column.type === "boolean") {
        return (
            <input
                type="checkbox"
                checked = {Boolean(value)}
                onChange = {(event) => 
                    onChange(event.target.checked)}
            />
        );
    }

    // selection column
    if (column.type === "selection") {
        return (
            <select
                value={value ?? ""}
                onChange = {(event) => 
                    onChange(event.target.value)
                }
                >
                    {column.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
        );
    }

    // string column
    return (
        <input
            type="text"
            value={value ?? ""}
            onChange = {(event) => 
                onChange(event.target.value)
            }
        />
    );
}