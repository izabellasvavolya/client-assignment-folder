import { useState, useMemo } from "react";

const ROW_HEIGHT = 44;
const TABLE_HEIGHT = 460;
const OVERSCAN_ROWS = 5;

export default function EditableTable({
  tableData,
  onCellChange,
}) {
  const columns = tableData.columns;
  const data = tableData.data;

  const [scrollTop, setScrollTop] = useState(0);

  const [visibleColumnIds, setVisibleColumnIds] = useState(() =>
    columns.map((column) => column.id)
  );

  const visibleColumns = useMemo(
    () =>
      columns.filter((column) =>
        visibleColumnIds.includes(column.id)
      ),
    [columns, visibleColumnIds]
  );

    const gridTemplateColumns = useMemo(
    () =>
      visibleColumns
        .map((column) => `${column.width ?? 150}px`)
        .join(" "),
    [visibleColumns]
  );

  // Calculate which rows should be rendered
  const visibleRowCount = Math.ceil(
    TABLE_HEIGHT / ROW_HEIGHT
  );

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_ROWS
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
    <div>
      <h2>Employees</h2>

      {/* Show and hide column checkboxes */}
      <div>
        {columns.map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={visibleColumnIds.includes(
                column.id
              )}
              onChange={() =>
                toggleColumn(column.id)
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
                            value={
                              row[column.id]
                            }
                            onChange={(
                              newValue
                            ) =>
                              onCellChange(
                                rowIndex,
                                column.id,
                                newValue
                              )
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
    </div>
  );
}

function CellEditor({
  column,
  value,
  onChange,
}) {
  // Number column
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