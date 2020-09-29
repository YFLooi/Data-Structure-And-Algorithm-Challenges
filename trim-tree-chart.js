/** Ideas? 
  Convert to JSON?
  https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
  Recursion?
  https://stackoverflow.com/questions/17554768/sort-json-objects-into-nested-tree
  https://stackoverflow.com/questions/11922383/how-can-i-access-and-process-nested-objects-arrays-or-json
  Iterating objects in JS
  https://attacomsian.com/blog/javascript-iterate-objects

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

const newTree1 = [
  {
    id: 1,
    children: [
      {id: 2},
      {id: 3}
    ]
  },
  {
    id: 4,
    children: [
      {id: 5}
    ]
  },
]
const newTree2 = [
  {
    id: 0,
    children: [
      {
        id: 1,
        children: [
          {id: 2},
          {id: 3}
        ]
      },
      {
        id: 4,
        children: [
          {id: 5}
        ]
      }
    ]
  }
]

//What this does is assemble a new tree using bits from the existing tree
let branchStore = [];

let pushCounter = 0;
let loopCounter = 0;
const idList = [0,1,2,3,4,5]
let targetId = 2;
function treeTrimmer(branch){
  const result = [];

  // for(const prop in branch){
  //   console.log(`Contents in current branch: ${JSON.stringify(branch)}`);
  //   const value = branch[prop];

  //   //If array, means still needs to be processed
  //   if(typeof value === 'object'){
  //     console.log(`Value to be pushed: ${JSON.stringify(value)}`)
  //     result.push(value);
  //     result.push(treeTrimmer(value));
  //   }
  //   // //If array, means still needs to be processed
  //   // if(Array.isArray(value)){ 
  //   //   console.log(`Array to be iterated: ${JSON.stringify(value)}`)
  //   //   result.push(treeTrimmer(value));
  //   // //If object, can decide to cut or not
  //   // } else if(typeof value === 'object'){
  //   //   console.log(`Value to be pushed: ${JSON.stringify(value)}`)
  //   //   result.push(value);
  //   //   result.push(treeTrimmer(value));
  //   // }
  // }
  for(const [key, value] of Object.entries(branch)){
    //console.log(`${key}: ${JSON.stringify(value)}`);

    //Push into next iteration if children are present
    //This prevents blank arrays from appearing in result[] 
    //Cannot add ' && "children" in value' as a condition, loop will not check leaf nodes
    if(typeof value === 'object'){
      console.log(`Branch to push to next level: ${JSON.stringify(value)}`);
      result.push(treeTrimmer(value));
    } else {
      console.log(`Branch to push to results[]: ${JSON.stringify(branch)}`);
      pushCounter += 1; //= number of leaf nodes
      if(branch.id === targetId){
        delete branch["id"]; 
        delete branch["children"]; 
      } else {
        result.push(branch);
      }
    }
    loopCounter += 1;

  }

  return result;
}

const objMap = treeTrimmer(newTree1);
console.log(JSON.stringify(objMap));
//console.log(Object.keys(newTree1[0]));
console.log(`loop ran ${loopCounter} times`)
console.log(`result.push() done ${pushCounter} times`)