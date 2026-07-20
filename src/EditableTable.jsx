export default function EditableTable({ tableData })
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

        {data.map((row) => (
            <div key={row.id}>
                {columns.map((column) => (
                    <span key={column.id}>
                        {String(row[column.id])}{" "}
                    </span>
                ))}
            </div>       
        ))}
        </div>
    );
}