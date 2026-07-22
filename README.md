# Dynamic Editable Table

A reusable editable table built with React and JavaScript.
Table supports different column types, column visibility controls, direct cell editing, local saving and optimized rendering for large datasets.

## Features

- String, number, boolean and selection list columns
- Direct editing inside table cells
- Show and hide columns
- Save changes locally using `localStorage`
- Reset the table to the original mock data
- Supports 5,000 rows
- Virtualized rendering for better performance
- Schema driven and reusable with different datasets
- Columns displayed according to `ordinalNo`
- Optional column widths
- Read-only columns

## Schema changes

Two properties were added:

### `options?: string[]`

Used only for columns with the `selection` type. It contains the allowed values for the dropdown.

Example:

```js
{
  id: "department",
  ordinalNo: 4,
  title: "Department",
  type: "selection",
  width: 160,
  options: ["Engineering", "Sales", "Support", "Marketing"]
}