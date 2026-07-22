import { useState, useMemo } from 'react';

// table component
import EditableTable from './EditableTable.jsx';

// mock data for table
import { createMockTableData } from './mockData.js';

import './App.css';

const STORAGE_KEY = "tableData";

function getInitialTableData() {
  // check if we have saved data in local storage
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    }
    catch (error) {
      console.error("Error parsing saved table data:", error);
    }
  }
  return createMockTableData(5000); 
  }

  // default to 5000 rows if no saved data


export default function App() { 

  /* We'll use useState so that React can remember the table data
  and update cell when it changes */
  // create initial table data with 100 rows
  const [tableData, setTableData] = useState(getInitialTableData);

  // unsaved messages status
  const [saveMessage, setSaveMessage] = useState("");

  function handleCellChange(rowIndex, columnId, newValue) {
    setSaveMessage("You have unsaved changes.");

    setTableData((prevTableData) => {
      // copy the previous table data
      const newTableData = [ ...prevTableData.data];

      // find the row that was changed
      const oldRow = newTableData[rowIndex];

      if (!oldRow) { 
        return prevTableData; // row not found, return previous data
      }

      // copy changed row and update value
      newTableData[rowIndex] = { ...oldRow, [columnId]: newValue, };

      // return new table data
      return {
        ...prevTableData,
        data: newTableData,
      };
    });
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData));

    setSaveMessage("Changes saved.");
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    setTableData(createMockTableData(5000));
    setSaveMessage("Changes reset.");
  }


return (
  <main className="app">
    <div className="page-header">
      <div>
        <h1>Dynamic Table</h1>
        <p>Edit employee data and choose which columns to display.</p>
      </div>

      <div className="table-actions">
        <button className="save-button" onClick={handleSave}>
          Save changes
        </button>

        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>

        {saveMessage && (
           <span key={saveMessage} className="save-status">
            {saveMessage}
  </span>
)}
      </div>
    </div>

    <EditableTable
      tableData={tableData}
      onCellChange={handleCellChange}
    />
  </main>
);
}
