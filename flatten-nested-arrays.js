const array = [0, 1, 2, 3, 4];
const nestedArray1 = [[0, 1, 2, 3, 4],[5, 6, 7, 8]];
const nestedArray2 = [[0, 1, [2, 3], 4], [5, 6, 7, 8], 9];

//Solution:https://medium.com/@mayasavir/javascript-flatten-an-array-recursively-cc755a121f79
function unnestArrayWithRecursion (nestedArray) {
  let outputArray = [];

  function removeNesting(nestedArray, counter){
    if(counter === nestedArray.length){
      //Ends recursion
      return false;

      //Handles nested arrays
      //Once this line reaches end of nested array, it triggers the 'end recursion'
      //condition, thus resuming the recursion for the outermost array
    } else if (Array.isArray(nestedArray[counter])){
      removeNesting(nestedArray[counter], 0);

      //Handles everything that is not an array
    } else {
      outputArray.push(nestedArray[counter]);
    }

    //Moves to the next element in the array
    //Applies to both the outermost and nested arrays
    removeNesting(nestedArray, counter+1);
  }
  removeNesting(nestedArray, 0);

  return outputArray;
}
const unnestedDoubleNestedArray = unnestArrayWithRecursion(nestedArray1);
console.log(unnestedDoubleNestedArray);


//Solution to solve deeper nested arrays with iteration:https://medium.com/@mayasavir/javascript-flatten-an-array-recursively-cc755a121f79
function unnestArrayWithIteration (nestedArray) {
  let outputArray = [];

  for(i=0; i<nestedArray.length; ++i){
    for(j=0; j<nestedArray[i].length; ++j){
      outputArray.push(nestedArray[i][j]);
    }
  }

  return outputArray
}

const unnestedArray = unnestArrayWithIteration(nestedArray1);
console.log(unnestedArray);

