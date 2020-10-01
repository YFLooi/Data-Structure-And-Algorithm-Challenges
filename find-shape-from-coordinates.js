//Possible leads?
/** 
 * https://duckduckgo.com/?q=algorithm+identify+squares+from+coordinates&atb=v165-2__&ia=web
 * https://stackoverflow.com/questions/21658745/fast-formula-to-find-the-coordinate-of-the-4th-vertex-of-the-square-by-three-oth
 * https://www.geeksforgeeks.org/program-to-find-the-type-of-triangle-from-the-given-coordinates/
 * https://stackoverflow.com/questions/18006377/given-four-coordinates-check-whether-it-forms-a-square
 */

const someCoordinates = [ //8 available
  {x:-3, y:3},
  {x:3, y:3},
  {x:-6, y:0},
  {x:0, y:0},
  {x:3, y:0},
  {x:-3, y:-3},
  {x:0, y:-3},
  {x:3, y:-3},
]

//The idea: Generate all possible combination of 4 coordinates without duplication, then see if
//the difference in distance between them are the same

function squareFinder(coordinates){
  const numElementsPerCombo = 4; 
  let coordCombos = [];

  //Find all possible combinations (of permutations and combinations) of 4 coordinates
  for (let loop = 0; loop < (coordinates.length - numElementsPerCombo + 1); loop++) {
    let key = coordCombos.length;
    coordCombos[key] = [];
    for (let i = loop; i < loop + numElementsPerCombo; i++) {
      coordCombos[key].push(coordinates[i]);
    }
  }

  console.log(`Quads of coords found: ${JSON.stringify(coordCombos)}`);
  console.table(coordCombos)
  //return results;
}
squareFinder(someCoordinates)

var allArrays = ["a","b","c","d","e","f","g","h"];

const combine = (instr, outstr, index) => {
  let result = []
  for (var i = index; i < instr.length; i++) {
    // append the character
    outstr = outstr.concat(instr[i]);
    
    //print the result
    result.push(outstr)
    
    // make a recursive call at i + 1
    combine(instr, outstr, i + 1);
    
    // remove the character added in the first step
    outstr = outstr.slice(0, outstr.length - 1);
  }  
  return result
};

const combinations = combine(allArrays, "", 0); // a, ab, abc, ac, b, bc, c
console.log(combinations.length);
console.log(combinations)

// function coordinatesToShape(inputCoordinates) { 
//   //This algorithm cannot see a shape as a shape like people do
//   //However, it can find relationships between the coordinates that make a shape
//   //and use that to infer a shape
//   let matchingXPairs =  [];
//   let matchingYPairs =  [];
  
//   // console.log(`\nFinding matching X pairs...`);
//   // let remainingXInputs = [...inputCoordinates];
//   // for(i=0; i<inputCoordinates.length; ++i){
//   //   //console.log(`\nCurrent input: {${inputCoordinates[i].x},${inputCoordinates[i].y}}, at position ${i}`);
    
//   //   //Remove selected coordinates to prevent matching with itself
//   //   const indexOfDuplicate = remainingXInputs.findIndex(function(element){
//   //       return element === inputCoordinates[i];
//   //   });
//   //   remainingXInputs.splice(indexOfDuplicate, 1);
    
//   //   //Create a copy so that the length of remainingXInputs does not change from splicing while 
//   //   //loop is in operation
//   //   const remainingXInputsCopy = [...remainingXInputs];

//   //   for(j=0; j<remainingXInputs.length; ++j){
//   //     if(inputCoordinates[i].x === remainingXInputs[j].x){
//   //       console.log(`Pair found: {${inputCoordinates[i].x},${inputCoordinates[i].y}} and {${remainingXInputs[j].x},${remainingXInputs[j].y}}`);
        
//   //       //Remove match pair coord to prevent repeat match later
//   //       remainingXInputsCopy.splice(j, 1);
//   //     }
//   //   }

//   //   remainingXInputs = [...remainingXInputsCopy];

//   //   //Stop loop if no XInputs remain
//   //   //Does not work with .map()
//   //   if(remainingXInputs.length === 0){
//   //     break
//   //   }
//   // }
//   console.log(`\nFinding matching X pairs...`);
//   let xInputs = [...inputCoordinates];
//   for(i=0; i<inputCoordinates.length; ++i){
//     //Take all newest inputs from the start of the array
//     console.log(`\nCurrent input: {${xInputs[0].x},${xInputs[0].y}}, at position ${0}`);
//     //console.log(xInputs);
    
//     //Make all changes to yInputsCopy to avoid changing source while nested loop below runs
//     let xInputsCopy = [...xInputs];
//     //Remove input[0] from list to prevent makig matching pair with itself
//     const indexOfDuplicate = xInputsCopy.findIndex(function(element){
//       return element === xInputs[0];
//     });
//     xInputsCopy.splice(indexOfDuplicate,1);
    
//     let pairCoord = [];
//     for(j=0; j<xInputsCopy.length; ++j){
//       if(xInputs[0].x === xInputsCopy[j].x){
//         console.log(`Pair found: {${xInputs[0].x},${xInputs[0].y}} and {${xInputsCopy[j].x},${xInputsCopy[j].y}}`);
//         pairCoord = [...pairCoord, xInputsCopy[j]]
//       }
//     }

//     //console.log(`Matches found in yInputsCopy at:`);
//     //console.log(pairCoord);
//     for(k=0; k < pairCoord.length; ++k){
//       const indexOfDuplicate = xInputsCopy.findIndex(function(element){
//         return element === pairCoord[k];
//       });
//       xInputsCopy.splice(indexOfDuplicate,1);
//     }
    
//     // console.log(`Final yInputsCopy before loop repeats:`);
//     // console.log(xInputsCopy)
//     xInputs = [...xInputsCopy];
//     if(xInputs.length === 0){
//       break
//     }
//   }

//   console.log(`\nFinding matching Y pairs...`);
//   let yInputs = [...inputCoordinates];
//   for(i=0; i<inputCoordinates.length; ++i){
//     //Take all newest inputs from the start of the array
//     console.log(`\nCurrent input: {${yInputs[0].x},${yInputs[0].y}}, at position ${0}`);
//     console.log(yInputs);
    
//     //Make all changes to yInputsCopy to avoid changing source while nested loop below runs
//     let yInputsCopy = [...yInputs];
//     //Remove selected coord from list to prevent makig matching pair with itself
//     const indexOfDuplicate = yInputsCopy.findIndex(function(element){
//       return element === yInputs[0];
//     });
//     yInputsCopy.splice(indexOfDuplicate,1)
    
//     let pairCoord = [];
//     for(j=0; j<yInputsCopy.length; ++j){
//       if(yInputs[0].y === yInputsCopy[j].y){
//         console.log(`Pair found: {${yInputs[0].x},${yInputs[0].y}} and {${yInputsCopy[j].x},${yInputsCopy[j].y}}`);
//         pairCoord = [...pairCoord, yInputsCopy[j]]
//       }
//     }

//     console.log(`Matches found in yInputsCopy at:`);
//     console.log(pairCoord);
//     for(k=0; k < pairCoord.length; ++k){
//       const indexOfDuplicate = yInputsCopy.findIndex(function(element){
//         return element === pairCoord[k];
//       });
//       yInputsCopy.splice(indexOfDuplicate,1);
//     }
    
//     console.log(`Final yInputsCopy before loop repeats:`);
//     console.log(yInputsCopy)
//     yInputs = [...yInputsCopy];
//     if(yInputs.length === 0){
//       break
//     }
//   }

// }
  
// coordinatesToShape(someCoordinates);