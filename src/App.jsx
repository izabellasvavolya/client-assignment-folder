import { useState } from 'react';

// table component
import EditableTable from './EditableTable.jsx';

// mock data for table
import { createMockTableData } from './mockData.js';

import './App.css';


export default function App() { 

  /* We'll use useState so that React can remember the table data
  and update cell when it changes */
  const [tableData, setTableData] = useState(() => createMockTableData(100));
  return (
    <main>

    <h1>Dynamic Table</h1>

    <EditableTable tableData={tableData} />
    {/* pass table data to table component */}
    </main>
  );
}