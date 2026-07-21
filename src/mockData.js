// department data
const departmentOptions = [
    "Engineering",
    "Sales",
    "Support", 
    "Marketing",
];

// options for columns
const columns = [
    {
        id: "id", 
        title: "ID",
        type: "number",
        editable: false, // we can't edit the ID column
        width: 80,
        ordinalNo: 1,
    },

    {
        id: "name",
        title: "Name",
        type: "string",
        width: 180,
        ordinalNo: 2,
    },

    {
        id: "department",
        title: "Department",
        type: "selection",
        width: 160,
        ordinalNo: 4,
        options: departmentOptions
    },
    {   id: "active",
        title: "Active",
        type: "boolean",
        width: 100,
        ordinalNo: 5,
    }
];

// create example rows for table

export function createMockTableData(rowCount = 100) {

    const data = [];

    for (let index = 0; index < rowCount; index++) {
        const row = {
            id: String(index + 1),
            name: `Employee ${index + 1}`,
            age: 21 + (index % 40),
            department:
              departmentOptions[index % departmentOptions.length],
            active: index % 2 === 0,
        };
        data.push(row);
    }
        
    return {
        columns: columns,
        data: data,
    };
}
