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
const newTree3 = [
  {id: 1},
  {id: 2},
  {id: 3}
]

//What this does is assemble a new tree using bits from the existing tree
let pushCounter = 0;
let loopCounter = 0;
const idList = [0,1,2,3,4,5]
const targetId = 2;
let idMap = [];


function treeTrimmer(branch, counter, removalTarget){
  let result = [];  

  function trimmerFunction(branch, counter, removalTarget, parentId){
    console.log(`Current iteration: ${counter}`);

    if(counter === branch.length){
      //stop recursion once end of input branch reached
      return null;
    //Dig deeper if "children" is encountered
    }else if("id" in branch[counter] && "children" in branch[counter]){
      if(branch[counter]["id"] !== removalTarget){
        result.push({
          id: branch[counter]["id"],
          children: []
        });
        //Iterate over the contents of "children" key
        //How to make sure this returns to the "children" array it worked on???
        trimmerFunction(branch[counter]["children"], 0, removalTarget, branch[counter]["id"])   
      }
    } else if ("id" in branch[counter]){
      if(parentId !== null && branch[counter]["id"] !== removalTarget){
        console.log(`Child id detected`)
        console.log(branch)
        console.log(`Current result[]:`)
        console.log(result)

        //newest branch would be pushed to last position in results[]
        result[result.length - 1]["children"].push({id: branch[counter]["id"]});

        //Reset parent id once at end of current branch
        if(counter === branch.length){
          parentId = null;
        }
      //Pushes leaves into results[]
      } else if (branch[counter]["id"] !== removalTarget){
        result.push({id: branch[counter]["id"]});
      }
    }

    trimmerFunction(branch, counter+1, removalTarget, parentId)
    //for(let i=0; i<branch.length; ++i){}
  }

  trimmerFunction(branch, counter, removalTarget, null);
  return result;
}
const objMap = treeTrimmer(inputTree, 0, "");
console.log(JSON.stringify(objMap));

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


//console.log(Object.keys(newTree1[0]));
// console.log(`loop ran ${loopCounter} times`);
// console.log(`result.push() done ${pushCounter} times`);
// console.log(`resulting idMap: ${JSON.stringify(idMap)}`);
// objBuilder(idMap);
// console.log(`newObj: ${JSON.stringify(newObj)}`);

// function treeTrimmer(branch, counter){
//   let result = [];  

//   function trimmerFunction(branch, counter){
//     for(let i=0; i<branch.length; ++i){
//       console.log(`Current iteration: ${counter}`);
//       if(counter === branch.length){
//         //stop loop once end of input branch reached
//         return null;
//       //Dig deeper if "children" is encountered
//       }else if(typeof value === 'object' ){
//         console.log(`Branch to push to next level: ${JSON.stringify(value)}`);
        
//         for(const [key, value] of Object.entries(branch)){}
//         let valueToCheck = value;
//         if(value.id === targetId && "children" in value){
//           delete valueToCheck["id"]; 
//           delete valueToCheck["children"]; 
//         //Must put this condition here, otherwise "children" will be missed
//         } else if(value.id === targetId){
//           delete valueToCheck["id"];
//         }

//         result.push(treeTrimmer(valueToCheck));
//       } else {
//         console.log(`Current content in result[]: ${JSON.stringify(result)}`);
//         console.log(`Branch to push to results[]: ${JSON.stringify(branch)}`);
//         pushCounter += 1; //= number of leaf nodes
//         result.push(value);

//         //check if "children" are present
//         // if("children" in branch){
//         //   result.push({["id"]:value});
//         // } else {
//         //   //result.push({["children"]:[{[key]:value}]});
//         //   result.push({["id"]:value});
//         // }
        
//       }
//     }
//   }

//   trimmerFunction(branch, counter);
//   return result;
// }