const input = [4,5,6,5,6];
const input2 = [2,3,14,0,66,100,100,71,22,0,0,0,66,66,3,29];

function numberIdentifier(numArray){
  let numArrayCopy = [...numArray];
  let uniqueNumbers = [];
  let uniquePairs = [];
  let otherNumberTypes = [];
  
  //Iteration always starts from numArrayCopy[0]
  //As numbers are spliced out, will the loop's max run be shortened? Yes, but chaotically
  //Thus, use numArray.length instead of numArrayCopy.length
  for(i=0; i<numArray.length; ++i){
    //Stop iterating if no numbers remaining in numArrayCopy
    if(numArrayCopy.length === 0){
      break;
    }

    let inputNum = numArrayCopy[0];
    // console.log(`input number: ${inputNum}`);

    //pick the 1st number in the array, then remove it so that it does not end up being double-counted
    const inputNumPosition = numArrayCopy.findIndex((e) => e === inputNum);
    numArrayCopy.splice(inputNumPosition, 1);
    let newNumArray = [...numArrayCopy]
    // console.log(`Array to iterate:`);
    // console.log(newNumArray);

    //count number of duplicates
    let duplicateCount = 0;
    for(j=0; j<newNumArray.length; ++j){
      //console.log(`input number: ${inputNum}`);
      //console.log(`current number: ${numArrayCopy[j]}`);

      if (inputNum === numArrayCopy[j]){
        duplicateCount++;
      }
    }
    
    //Removes all instance of inputNumber-s considered
    //Only runs if duplicateCount > 0 (non-unique numbers)
    //This only applies for numbers with duplicates. Unique numbers have been automatically 
    //removed by the splice after new inputNum is selected
    for(k=0; k<duplicateCount; ++k){
      const duplicateNumPosition = numArrayCopy.findIndex((e) => e === inputNum);
      numArrayCopy.splice(duplicateNumPosition, 1);
      
      // console.log(`Remaining numbers after duplicates are removed:`);
      // console.log(numArrayCopy);
    }
    // console.log(`New length of numArrayCopy: ${numArrayCopy.length}`);
    // console.log(`Input number was duplicated ${duplicateCount} times\n`);

    //Classify inputNum here
    if(duplicateCount === 0){
      uniqueNumbers = [...uniqueNumbers, inputNum];
    } else if(duplicateCount === 1){
      uniquePairs = [...uniquePairs, inputNum];
    } else if(duplicateCount > 1){
      otherNumberTypes = [...otherNumberTypes, inputNum];
    }
  }

  //Show results obtained
  console.log(`\nThe number and quantity of numbers obtained for each category are:`)
  console.log(`Unique numbers: ${uniqueNumbers.length} numbers, consisting of ${uniqueNumbers.toString()}`);
  console.log(`Pair numbers: ${uniquePairs.length} numbers, consisting of ${uniquePairs.toString()}`);
  console.log(`Other number types: ${otherNumberTypes.length} numbers, consisting of ${otherNumberTypes.toString()}`);

  //console.log(`Algo ran for ${i} iterations`)
};

numberIdentifier(input);
numberIdentifier(input2);