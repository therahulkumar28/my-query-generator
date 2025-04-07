export const TABLE_SCHEMA = `
  {
    "_id": "string",
    "name": "string",
    "departments": [
      {
        "name": "string",
        "employees": "number"
      }
    ]
  }
`;

export const SCHEMA_DESCRIPTION = `
  - _id: Unique ID of company
  - name: Company name
  - departments: List of departments
    - name: Name of department
    - employees: Number of employees in dept
`;

export const FEW_SHOT_EXAMPLE = `
Input: name of departments where number of employees is greater than 1000
Output: [
  { "$match": { "departments.employees": { "$gt": 1000 } } },
  { "$project": { "departments": { "$filter": {
      "input": "$departments",
      "as": "dept",
      "cond": { "$gt": ["$$dept.employees", 1000] }
  } } } }
]
`;
