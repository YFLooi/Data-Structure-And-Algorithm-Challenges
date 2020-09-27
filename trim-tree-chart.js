/** Ideas? 
  Convert to JSON?
  https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
  Recursion?
  https://stackoverflow.com/questions/17554768/sort-json-objects-into-nested-tree

*/

const inputTree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 4,
            children: [
              { id:6 },
              { id:7 }
            ]
          }
        ]
      },
      { 
        id: 3,
        children: [
          {
            id: 5,
            children: [
              { id:8 }
            ]
          }
        ]
      }
    ]
  }
]

