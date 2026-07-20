export default function EditableTable({ tableData, onCellChange })
{
    const columns = tableData.columns;
    const data = tableData.data;

    // return jsx that react will display

    return (
        
        // this contains entire table
        <div>
            {/* table title */}
            <h2>Employees</h2>
             
            {/* columns title */}
            {/* go through every item in column array */}
            <div>
                {columns.map((column) => (
                    <strong key={column.id}>
                        {column.title}{" "}
                    </strong>))}

            </div>

        {/* columns array decided which fields exist */}
        {/* the point of this is to make table dynamic and reusable */}

        {data.map((row, rowIndex) => (
            <div key={row.id}>
                {columns.map((column) => (
                    <input
                        key={column.id}
                        value={row[column.id] ?? ""}
                        onChange={(event) => 
                            onCellChange(rowIndex, column.id, event.target.value)
                        }   
                    />
                ))}              
            </div>       
        ))}
        </div>
    );
}