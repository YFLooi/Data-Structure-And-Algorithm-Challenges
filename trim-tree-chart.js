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
let pushCounter = 0;
let loopCounter = 0;
const idList = [0,1,2,3,4,5]
const targetId = 2;
let idMap = [];

function treeTrimmer(branch){
  const result = [];

  for(const [key, value] of Object.entries(branch)){
    //Push into next iteration if children are present
    //This prevents blank arrays from appearing in result[] 
    //Cannot add ' && "children" in value' as a condition, loop will not check leaf nodes
    loopCounter += 1;

    console.log(`Current iteration: ${loopCounter}`);
    if(typeof value === 'object'){
      console.log(`Branch to push to next level: ${JSON.stringify(value)}`);

      let valueToCheck = value;
      if(value.id === targetId && "children" in value){
        delete valueToCheck["id"]; 
        delete valueToCheck["children"]; 
      //Must put this condition here, otherwise "children" will be missed
      } else if(value.id === targetId){
        delete valueToCheck["id"];
      }

      result.push(treeTrimmer(valueToCheck));
    } else {
      console.log(`Current content in result[]: ${JSON.stringify(result)}`);
      console.log(`Branch to push to results[]: ${JSON.stringify(branch)}`);
      pushCounter += 1; //= number of leaf nodes

      //check if "children" are present
      if("children" in branch){
        result.push({["id"]:value});
      } else {
        //result.push({["children"]:[{[key]:value}]});
        result.push({["id"]:value});
      }
      
    }
  }
  idMap = [...result];
  return result;
}
let newObj = [];
function objBuilder(outputMap){
  console.log(`\nCurrent input: ${JSON.stringify(outputMap)}`)
  console.log(`\n${outputMap[0].length}`)

  for(i=0; i<outputMap.length; ++i){
    if(outputMap.length === 2){
      const {id, children} = outputMap[i];
      newObj = [...newObj, {["id"]:id, ["children"]:children}];
      //objBuilder(children);
    } else if(outputMap.length === 1){
      const id = outputMap[i];
      newObj = [...newObj, {["id"]:id}];
    }

  }

}

const objMap = treeTrimmer(newTree1);
console.log(JSON.stringify(objMap));
//console.log(Object.keys(newTree1[0]));
console.log(`loop ran ${loopCounter} times`);
console.log(`result.push() done ${pushCounter} times`);
console.log(`resulting idMap: ${JSON.stringify(idMap)}`);
// objBuilder(idMap);
// console.log(`newObj: ${JSON.stringify(newObj)}`);

