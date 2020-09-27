//Possible leads?
/** 
 * https://duckduckgo.com/?q=algorithm+identify+squares+from+coordinates&atb=v165-2__&ia=web
 * https://stackoverflow.com/questions/21658745/fast-formula-to-find-the-coordinate-of-the-4th-vertex-of-the-square-by-three-oth
 * https://www.geeksforgeeks.org/program-to-find-the-type-of-triangle-from-the-given-coordinates/
 * https://stackoverflow.com/questions/18006377/given-four-coordinates-check-whether-it-forms-a-square
 */

const someCoordinates = [
  {x:-3, y:3},
  {x:3, y:3},
  {x:-6, y:0},
  {x:0, y:0},
  {x:3, y:0},
  {x:-3, y:-3},
  {x:0, y:-3},
  {x:3, y:-3},
]

function coordinatesToShape(inputCoordinates) { 
  //This algorithm cannot see a shape as a shape like people do
  //However, it can find relationships between the coordinates that make a shape
  //and use that to infer a shape
  let matchingXPairs =  [];
  let matchingYPairs =  [];
  
  // console.log(`\nFinding matching X pairs...`);
  // let remainingXInputs = [...inputCoordinates];
  // for(i=0; i<inputCoordinates.length; ++i){
  //   //console.log(`\nCurrent input: {${inputCoordinates[i].x},${inputCoordinates[i].y}}, at position ${i}`);
    
  //   //Remove selected coordinates to prevent matching with itself
  //   const indexOfDuplicate = remainingXInputs.findIndex(function(element){
  //       return element === inputCoordinates[i];
  //   });
  //   remainingXInputs.splice(indexOfDuplicate, 1);
    
  //   //Create a copy so that the length of remainingXInputs does not change from splicing while 
  //   //loop is in operation
  //   const remainingXInputsCopy = [...remainingXInputs];

  //   for(j=0; j<remainingXInputs.length; ++j){
  //     if(inputCoordinates[i].x === remainingXInputs[j].x){
  //       console.log(`Pair found: {${inputCoordinates[i].x},${inputCoordinates[i].y}} and {${remainingXInputs[j].x},${remainingXInputs[j].y}}`);
        
  //       //Remove match pair coord to prevent repeat match later
  //       remainingXInputsCopy.splice(j, 1);
  //     }
  //   }

  //   remainingXInputs = [...remainingXInputsCopy];

  //   //Stop loop if no XInputs remain
  //   //Does not work with .map()
  //   if(remainingXInputs.length === 0){
  //     break
  //   }
  // }
  console.log(`\nFinding matching X pairs...`);
  let xInputs = [...inputCoordinates];
  for(i=0; i<inputCoordinates.length; ++i){
    //Take all newest inputs from the start of the array
    console.log(`\nCurrent input: {${xInputs[0].x},${xInputs[0].y}}, at position ${0}`);
    //console.log(xInputs);
    
    //Make all changes to yInputsCopy to avoid changing source while nested loop below runs
    let xInputsCopy = [...xInputs];
    //Remove input[0] from list to prevent makig matching pair with itself
    const indexOfDuplicate = xInputsCopy.findIndex(function(element){
      return element === xInputs[0];
    });
    xInputsCopy.splice(indexOfDuplicate,1);
    
    let pairCoord = [];
    for(j=0; j<xInputsCopy.length; ++j){
      if(xInputs[0].x === xInputsCopy[j].x){
        console.log(`Pair found: {${xInputs[0].x},${xInputs[0].y}} and {${xInputsCopy[j].x},${xInputsCopy[j].y}}`);
        pairCoord = [...pairCoord, xInputsCopy[j]]
      }
    }

    //console.log(`Matches found in yInputsCopy at:`);
    //console.log(pairCoord);
    for(k=0; k < pairCoord.length; ++k){
      const indexOfDuplicate = xInputsCopy.findIndex(function(element){
        return element === pairCoord[k];
      });
      xInputsCopy.splice(indexOfDuplicate,1);
    }
    
    // console.log(`Final yInputsCopy before loop repeats:`);
    // console.log(xInputsCopy)
    xInputs = [...xInputsCopy];
    if(xInputs.length === 0){
      break
    }
  }

  console.log(`\nFinding matching Y pairs...`);
  let yInputs = [...inputCoordinates];
  for(i=0; i<inputCoordinates.length; ++i){
    //Take all newest inputs from the start of the array
    console.log(`\nCurrent input: {${yInputs[0].x},${yInputs[0].y}}, at position ${0}`);
    console.log(yInputs);
    
    //Make all changes to yInputsCopy to avoid changing source while nested loop below runs
    let yInputsCopy = [...yInputs];
    //Remove selected coord from list to prevent makig matching pair with itself
    const indexOfDuplicate = yInputsCopy.findIndex(function(element){
      return element === yInputs[0];
    });
    yInputsCopy.splice(indexOfDuplicate,1)
    
    let pairCoord = [];
    for(j=0; j<yInputsCopy.length; ++j){
      if(yInputs[0].y === yInputsCopy[j].y){
        console.log(`Pair found: {${yInputs[0].x},${yInputs[0].y}} and {${yInputsCopy[j].x},${yInputsCopy[j].y}}`);
        pairCoord = [...pairCoord, yInputsCopy[j]]
      }
    }

    console.log(`Matches found in yInputsCopy at:`);
    console.log(pairCoord);
    for(k=0; k < pairCoord.length; ++k){
      const indexOfDuplicate = yInputsCopy.findIndex(function(element){
        return element === pairCoord[k];
      });
      yInputsCopy.splice(indexOfDuplicate,1);
    }
    
    console.log(`Final yInputsCopy before loop repeats:`);
    console.log(yInputsCopy)
    yInputs = [...yInputsCopy];
    if(yInputs.length === 0){
      break
    }
  }

}
  
coordinatesToShape(someCoordinates);