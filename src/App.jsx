import { useState } from 'react';

// table component
import EditableTable from './EditableTable.jsx';

// mock data for table
import { createMockTableData } from './mockData.js';

import './App.css';


export default function App() { 

  /* We'll use useState so that React can remember the table data
  and update cell when it changes */
  // create initial table data with 100 rows
  const [tableData, setTableData] = useState(() => createMockTableData(5000));

  function handleCellChange(rowIndex, columnId, newValue) {
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

  return (
    <main>

    <h1>Dynamic Table</h1>

   <EditableTable
    tableData={tableData}
    onCellChange={handleCellChange}
    />
    </main>
  );
}