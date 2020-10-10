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
const newTree4 = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: [
              {id: 4},
              {id: 5}
            ]
          },
        ]
      },
      { 
        id: 6,
        children: [
          {id: 7 },
          {id: 8}
        ]
      }
    ]
  },
]

const idList = [1,2,3,4,5,6,7,8]
const targetId = 2;
/**
 * What this does is assemble a new tree using bits from the existing tree
 * @param {*} branch 
 * @param {*} counter 
 * @param {*} removalTarget 
 */
function treeTrimmer(branch, counter, removalTarget){
  let result = [];  
  let childrenOfChildren = [];
  let idOfCurrentParentofParents = 0;
  let largestParentId = 0;

  function trimmerFunction(branch, counter, removalTarget, parentId){
    console.log(`Current iteration: ${counter}`);

    //This logic stops recursion once end of input branch reached
    if(counter === branch.length){
      //Reset parentId once at end of current branch
      parentId = null;
      //Stops current recursion loop
      return null;
    //This logic handles parent nodes (The ones with "children")
    } else if("id" in branch[counter] && "children" in branch[counter]){
      console.log(`\nCurrent content of childrenOfChildren[]:`)
      console.table(JSON.stringify(childrenOfChildren));
      console.log(`No. items in branch: ${branch.length}\n`)

      //If iterating over "children" and found more "children", append them in the "children" of the 
      //branch being processed
      if(parentId !== null){
        console.log(`Found children[] inside branch belonging to parentId ${parentId}. Making a list of them...`)
        console.log(`children[] found:`)
        console.table(JSON.stringify(branch));
        
        //Iterate and push every item in the branch's children[] to childrenOfChildren[]
        //Over here, branch === children[] of last parent
        //This loop ensures recursion done only once for each children[]
        for(let i=0; i<branch.length; ++i){
          //Need some kind of handler here to join children of removalTarget to children of preceeding parent...

          // if(branch[i]["id"] === removalTarget){
          //   childrenOfChildren.push({
          //     parent: parentId,
          //     child: {id: branch[i+1]["id"], children: []}
          //   });
          //   i+1
          // }
          if(branch[i]["id"] !== removalTarget){
            childrenOfChildren.push({
              parent: parentId,
              child: {id: branch[i]["id"], children: []}
            });
          }
          //Used later to reconstruct the tree
          if(branch[i]["id"] > largestParentId){
            largestParentId = branch[i]["id"];
          }

          //Run over the children[] in the current parent before this loop ends
          trimmerFunction(branch[i]["children"], 0, removalTarget, branch[i]["id"]);
        }

      //This condition kicks in for first parent if no prior children found 
      } else if(branch[counter]["id"] !== removalTarget){
        result.push({
          id: branch[counter]["id"],
          children: []
        });
        console.log(`New top parent branch of id ${branch[counter]["id"]}. result[] array becomes: ${JSON.stringify(result)}`);
        idOfCurrentParentofParents = branch[counter]["id"];

        //Run over the children[] in the top parent
        trimmerFunction(branch[counter]["children"], 0, removalTarget, branch[counter]["id"]); 
      }
    //This logic handles leaf nodes
    } else if ("id" in branch[counter]){
      if(parentId !== null){
        //Final leaf node(s) in sequence of "children" is pushed to last position in childrenOfChildren[]
        console.log(`Found a final leaf node inside branch belonging to parentId ${parentId}`)
        console.log(branch);
        
        for(let j=0; j<branch.length; ++j){
          if(branch[j]["id"] !== removalTarget){
            const existingParentIdLocation = childrenOfChildren.findIndex(parent => parent["parent"] === parentId)
            console.log(`Existing parent for leaf at childrenOfChildren[${existingParentIdLocation}]`);
            
            //Place children with the same parent together in the same child[] array
            if(existingParentIdLocation === -1){
              childrenOfChildren.push({
                parent: parentId,
                child: [{id: branch[j]["id"]}]
              });  
            } else {
              const newChild = {id: branch[j]["id"]}  
              childrenOfChildren[existingParentIdLocation]["child"].push(newChild)
            }
          }
        }
        //No recursion call here. Leaf node is at very end already

      //If no parent found, simply push leaves into results[]
      //This happens if a leaf is at the top parent branch
      } else if (branch[counter]["id"] !== removalTarget){
        result.push({id: branch[counter]["id"]});
      }

    }

    //This call only moves to the next top parent branch??
    //Not necessary since our example has only 1 top parent branch
    //"counter" is only used in this situation. For children[] in children[],
    //the "for" loops take care of them
    //trimmerFunction(branch, counter+1, removalTarget, parentId)
  }

  trimmerFunction(branch, counter, removalTarget, null);
  
  console.log(`\nResulting childrenOfChildren[] to be joined with top parent:\n${JSON.stringify(childrenOfChildren)}\n`);
  
  //Once all leaves are accounted for, return the leaves and all branches above it to the very first parent branch
  //This works on the basis that children from the same parent branch have same parentId
  //Uses reverse-joining since it needs to look into only a fixed depth of 2, i.e childrenOfChildren[i][child]
  //In childrenOfChildren, there is a parent of all parents that each child branch joins to
  //To avoid having to deal with nesting, start with the largest-numbered parent first (lowest in the tree).
  //Nest this with the next lower numbered parent. Continue until reached the parent that is the child of the parent of all parents
  console.log(`Largest ID possible: ${largestParentId}`);
  console.log(`idOfCurrentParentOfParents: ${idOfCurrentParentofParents}`);

 
  //Times run = Number of elements in childrenOfChildren
  for(let k=largestParentId; k>0; --k){
    console.log(`Current value of k:${k}`);
    const indexOfChild = childrenOfChildren.findIndex(child => child["parent"] === k);
    //Parent has child of id === child's "parent"
    const indexOfParent = childrenOfChildren.findIndex(parent => parent["child"]["id"] === k);
    console.log(`Child to insert located at pos ${indexOfChild}. Parent to receive located at pos ${indexOfParent}`);

    //Examine final form of childrenOfChildren[]
    if(k===1){
      console.table(childrenOfChildren);
    }
  
    //indexOfParent will become "-1" once all children inserted up to element(s) with parent = 1
    if(indexOfChild !== -1 && indexOfParent !== -1){
      const currentParent = childrenOfChildren[indexOfParent]
      const currentChild = childrenOfChildren[indexOfChild]
      console.log(`
        Current parent: ${JSON.stringify(currentParent)}\n
        Current child: ${JSON.stringify(currentChild)}
      `)
      
      //Push child into parent
      childrenOfChildren[indexOfParent]["child"]["children"].push(currentChild["child"]);
    }
  }

  const indexOfParentOfParents = result.findIndex(parent => parent["id"] === idOfCurrentParentofParents);
  
  //Insert the children of all childrenOfChildren elements with parent = idOfCurrentParentofParents to the parentOfParents
  for(let l=0; l<childrenOfChildren.length; ++l){
    if(childrenOfChildren[l]["parent"]=== idOfCurrentParentofParents){
      result[indexOfParentOfParents]["children"].push(
        childrenOfChildren[l]["child"]
      );
    }
  }

  //Remove id of removalTarget from idList
  const indexOfId = idList.findIndex(id => id === removalTarget);
  console.log(`id to remove located at index ${indexOfId} of idList`);
  idList.splice(indexOfId, 1);

  return result;
}

const objMap = treeTrimmer(inputTree, 0, 5);
console.log(`Output objMap: ${JSON.stringify(objMap)}`);
console.log(`New idList: ${JSON.stringify(idList)}`);

