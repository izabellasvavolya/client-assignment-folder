import { useState, useMemo } from "react";

// height of one table row
const ROW_HEIGHT = 44;
// height of scrollable table area
const TABLE_HEIGHT = 800;
// extra rows to render above and below visible rows
// for smoother scrolling experience
const OVERSCAN_ROWS = 5;


export default function EditableTable({tableData,onCellChange,}) {
   
  const columns = tableData.columns;
  const data = tableData.data;
  
  // sort columns according to their ordinalNo 
  // copy the array to avoid mutating the original columns array
  const sortedColumns = useMemo(() =>   // useMemo to avoid unnecessary re-sorting on every render
    [...columns].sort(
      (firstColumn, secondColumn) =>
        firstColumn.ordinalNo - secondColumn.ordinalNo
    ),
  [columns]
);

    // stores how far user scrolled down the table
  const [scrollTop, setScrollTop] = useState(0);
  
  // stores id of visible columns, default to all columns visible
  const [visibleColumnIds, setVisibleColumnIds] = useState(() =>
    sortedColumns.map((column) => column.id)
  );

  // create an array of visible columns based on visibleColumnIds state
  // updates only when sortedColumns or visibleColumnIds change
const visibleColumns = useMemo(() =>
    sortedColumns.filter((column) =>
      visibleColumnIds.includes(column.id)
    ),
  [sortedColumns, visibleColumnIds]
);

// css for visible colums
const gridTemplateColumns = useMemo(
    () =>
      visibleColumns
        .map((column) => `${column.width ?? 180}px`)
        .join(" "),
    [visibleColumns]
  );

  // Calculate which rows should be rendered and fit inside table
  const visibleRowCount = Math.ceil(TABLE_HEIGHT / ROW_HEIGHT);

  // calculate first row that should be rendered
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_ROWS // add a few extra rows before
  );

  const endIndex = Math.min(
    data.length,
    startIndex +
      visibleRowCount +
      OVERSCAN_ROWS * 2
  );

  const visibleRows = data.slice(startIndex, endIndex);

  const totalHeight = data.length * ROW_HEIGHT;
  const offsetY = startIndex * ROW_HEIGHT;

  function toggleColumn(columnId) {
    setVisibleColumnIds((previousIds) => {
      if (previousIds.includes(columnId)) {
        return previousIds.filter(
          (id) => id !== columnId
        );
      }

      return [...previousIds, columnId];
    });
  }

  return (
     <section className="table-card">
        <div className="table-title">
            <h2>Employees</h2>
            <span>{data.length.toLocaleString()} rows</span>
        </div>

      {/* Show and hide column checkboxes */}
      <div className = "column-controls">
        {sortedColumns.map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={visibleColumnIds.includes(
                column.id
              )}
              onChange={() => toggleColumn(column.id)
              }
            />

            {column.title}
          </label>
        ))}
      </div>

      {/* Column titles */}
      <div
        className="table-row table-header"
        style={{ gridTemplateColumns }}
      >
        {visibleColumns.map((column) => (
          <div
            className="table-cell"
            key={column.id}
          >
            <strong>{column.title}</strong>
          </div>
        ))}
      </div>

      {/* Scrollable table body */}
      <div
        className="table-body"
        style={{ height: TABLE_HEIGHT }}
        onScroll={(event) =>
          setScrollTop(
            event.currentTarget.scrollTop
          )
        }
      >
        {/* Creates the full scrollbar height */}
        <div
          className="table-spacer"
          style={{ height: totalHeight }}
        >
          {/* Moves the visible rows to their correct position */}
          <div
            className="visible-rows"
            style={{
              transform: `translateY(${offsetY}px)`,
            }}
          >
            {visibleRows.map(
              (row, visibleIndex) => {
                const rowIndex =
                  startIndex + visibleIndex;

                return (
                  <div
                    key={row.id}
                    className="table-row"
                    style={{
                      gridTemplateColumns,
                      height: ROW_HEIGHT,
                    }}
                  >
                    {visibleColumns.map(
                      (column) => (
                        <div
                          className="table-cell"
                          key={column.id}
                        >
                          <CellEditor
                            column={column}
                            value={row[column.id]}

                            onChange={(
                              newValue
                            ) =>
                              onCellChange(rowIndex, column.id, newValue)
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CellEditor({column, value, onChange,}) {
  // Number column
  if (column.editable == false) 
    {
    return <span>{String(value)}</span>;
  }
  if (column.type === "number") {
    return (
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => {
          const newValue =
            event.target.value;

          onChange(
            newValue === ""
              ? ""
              : Number(newValue)
          );
        }}
      />
    );
  }

  // Boolean column
  if (column.type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) =>
          onChange(event.target.checked)
        }
      />
    );
  }

  // Selection column
  if (column.type === "selection") {
    return (
      <select
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {column.options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    );
  }

  // Default text column
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );
}