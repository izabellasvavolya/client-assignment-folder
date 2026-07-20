import { useState } from 'react'

// table component
import EditableTable from './EditableTable.jsx'

// mock data for table
import { createMockTableData } from './mockData.js'

import './App.css'

// ccreate mock data for table
const tableData = createMockTableData(100);

export default function App() {
  return (
    <main>

    <h1>Dynamic Table</h1>

    <EditableTable tableData={tableData} />
    {/* pass table data to table component */}
    </main>
  );
}