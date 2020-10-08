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
          }
        ]
      },
      
    ]
  },
]

const idList = [0,1,2,3,4,5]
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

  function trimmerFunction(branch, counter, removalTarget, parentId){
    console.log(`Current iteration: ${counter}`);

    //This logic stops recursion once end of input branch reached
    if(counter === branch.length){
      return null;
    //This logic handles parent nodes (The ones with "children")
    }else if("id" in branch[counter] && "children" in branch[counter]){
      //If iterating over "children" and found more "children", append them in the "children" of the 
      //branch being processed
      if(parentId !== null && branch[counter]["id"] !== removalTarget){
        console.log(`Found children[] inside branch belonging to parentId ${parentId}. Making a list of them...`)
        //newest branch would be pushed to last position in childrenOfChildren[]
        const existingParentId = childrenOfChildren.findIndex(parent => parent["parent"] === parentId)

        //Place children with the same parent together in the same child[] array
        if(existingParentId === -1){
          childrenOfChildren.push({
            parent: parentId,
            child: {id: branch[counter]["id"], children: []}
          });  
        } else {
          childrenOfChildren[existingParentId]["child"].push(
            {id: branch[counter]["id"], children: []}
          );
        }

        //How to iterate over the contents of this "children" key to push into "children" of "children"??
        trimmerFunction(branch[counter]["children"], 0, removalTarget, branch[counter]["id"]);   

        //Reset parentId once at end of current branch
        if(counter === branch.length){
          parentId = null;
        }
      //This condition guarantees branches/leaves with id=removalTarget will not be added
      //This condition only kicks in if not iterating over "children" of input branch
      } else if(branch[counter]["id"] !== removalTarget){
        result.push({
          id: branch[counter]["id"],
          children: []
        });
        console.log(`New parent branch found. result[] array becomes: ${JSON.stringify(result)}`);

        //Iterate over the contents of "children" key
        trimmerFunction(branch[counter]["children"], 0, removalTarget, branch[counter]["id"]);   
      }
    //This logic handles leaf nodes
    } else if ("id" in branch[counter]){
      if(parentId !== null && branch[counter]["id"] !== removalTarget){
        //Final leaf node(s) in sequence of "children" is pushed to last position in childrenOfChildren[]
        console.log(`Found a final leaf node inside branch belonging to parentId ${parentId}. Making a list of them...`)
        //newest branch would be pushed to last position in childrenOfChildren[]
        const existingParentIdLocation = childrenOfChildren.findIndex(parent => parent["parent"] === parentId)
        console.log(`Existing parent found at childrenOfChildren[${existingParentIdLocation}]`);

        //Place children with the same parent together in the same child[] array
        if(existingParentIdLocation === -1){
          childrenOfChildren.push({
            parent: parentId,
            child: [{id: branch[counter]["id"]}]
          });  
        } else {
          const newChild = {id: branch[counter]["id"]}  
          childrenOfChildren[existingParentIdLocation]["child"].push(newChild)
        }

        console.log(`Current counter: ${counter} && current branch.length: ${branch.length}`)

        //Once all leaves are accounted for, return the leaves and all subsequent branches back 
        //to the very first parent branch
        //This works fine with just 1 child for each parent e.g. newTree4. BUT how handle parent branches with >1 child??
        //Clue: children from same parent branch have same parentId. Hmmm.......
        //This version now breaks if I add a branch to an existing branch. It works fine with multiple leaves on 1 branch
        //Reset parentId once at final leaf branch & return reverse-joined childrenOfChildren to base parent
        if(counter === branch.length-1){
          let joinedChildren = [];
          
          console.log(`childrenOfChildren found:`)
          console.table(JSON.stringify(childrenOfChildren));

          for(let i = childrenOfChildren.length-1; i>=1; --i){
            //This inserts the last child into the "children" of the previous child
            joinedChildren[0] = childrenOfChildren[i-1]["child"];
            joinedChildren[0]["children"].push(childrenOfChildren[i]["child"]);
          }
          
          //Insert joinedChildren[] to the parent, which is the last element in results[]
          result[result.length-1]["children"] = joinedChildren[0];

          parentId = null;
        }
      //Pushes leaves into results[]
      } else if (branch[counter]["id"] !== removalTarget){
        result.push({id: branch[counter]["id"]});
      }
    }

    trimmerFunction(branch, counter+1, removalTarget, parentId)
  }

  trimmerFunction(branch, counter, removalTarget, null);
  console.log(`\nResulting childrenOfChildren[] that joined with parent: ${JSON.stringify(childrenOfChildren)}\n`);
  return result;
}

//currently does not remove 4,6,7,5, and 8
const objMap = treeTrimmer(newTree4, 0, 999);
console.log(`Output objMap: ${JSON.stringify(objMap)}`);

