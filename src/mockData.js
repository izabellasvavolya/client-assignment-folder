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
        width: 80,
        ordialNo: 1,
    },

    {
        id: "name",
        title: "Name",
        type: "string",
        width: 180,
        ordialNo: 2,
    },

    {
        id: "department",
        title: "Department",
        type: "selection",
        width: 160,
        ordialNo: 4,
        optins: departmentOptions
    },
    {   id: "active",
        title: "Active",
        type: "boolean",
        width: 100,
        ordialNo: 5,
    }
];