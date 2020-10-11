/**
 * Challenge question: Given orgChartMap below, build a function that removes
 * objects by id, then updates orgChartMap and positionIds.
 * Any children of the removed object should join to the next higher id
 * Ex: If id===2 is removed, {id:4, children:[{id:6},{id:7}]} becomes the child of {id:1}
 */

//This tree has only a single origin parent/parent of parents at id===1
const orgChartMap = [
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
const positionIds = [1,2,3,4,5,6,7,8]

/**
 * What this does is to first iterate over every branch then leaf in the tree to find the 
 * branch/leaf with id === removalTarget. Once removalTarget is dealt with, the entire tree is
 * reassembled in reverse starting from the leaves
 * @param {array} branch  The current {id:x children:[]} object
 * @param {number} counter Denotes the current parent of parents (id=1 in this example)
 * @param {number} removalTarget The target id to remove. Can belong to a branch or leaf
 */
//Still buggy. Won't work witn newTree5, but works fine with newTree3
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

           //Used later to reconstruct the tree
          if(branch[i]["id"] > largestParentId){
            largestParentId = branch[i]["id"];
          }

          if(branch[i]["id"] === removalTarget){
            //Checks each child in branch[i] before removing branch[i]
            //children of branch[i] are joined as children of the next-higher parent
            const child = branch[i]["children"]
            //If a branch is found in const child[], assume that rest of child[] is made of branches and
            //process the whole lot as a branch
            if("id" in child[0] && "children" in child[0]){
              trimmerFunction(child, 0, removalTarget, parentId);      
              //If a leaf is found, just push it in as a child of parent parentId
            } else if("id" in child[0]){
              for(let m=0; m<branch[i]["children"].length; ++m){
                const existingParentIdLocation = childrenOfChildren.findIndex(parent => parent["parent"] === parentId)
                console.log(`Existing parent for leaf at childrenOfChildren[${existingParentIdLocation}]`);
                
                //Place children with the same parent together in the same child[] array
                if(existingParentIdLocation === -1){
                  childrenOfChildren.push({
                    parent: parentId,
                    child: [child[m]]
                  });  
                } else {
                  const newChild = child[m]  
                  childrenOfChildren[existingParentIdLocation]["child"].push(newChild)
                }
              }
            }
          }
          if(branch[i]["id"] !== removalTarget){
            childrenOfChildren.push({
              parent: parentId,
              child: {id: branch[i]["id"], children: []}
            });

            //Run over the children[] in the current parent before this loop ends
            trimmerFunction(branch[i]["children"], 0, removalTarget, branch[i]["id"]);
          }
        
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

  //Remove id of removalTarget from positionIds
  const indexOfId = positionIds.findIndex(id => id === removalTarget);
  console.log(`id to remove located at index ${indexOfId} of positionIds`);
  positionIds.splice(indexOfId, 1);

  return result;
}

const newOrgChartMap = treeTrimmer(orgChartMap, 0, 2);
//Assign newOrgChartMap to orgChartMap
orgChartMap.splice(0, orgChartMap.length, newOrgChartMap);

//Final result:
//Show new list of positionIds
console.log(`New positionIds: ${JSON.stringify(positionIds)}`);
console.log(`New orgChartMap: ${JSON.stringify(orgChartMap)}`);


