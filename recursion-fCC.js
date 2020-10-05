//https://www.freecodecamp.org/news/understanding-recursion-in-javascript/

//counting down recursively
const inputNum = 5;

function countDown(inputNum){
  //base case
  if(inputNum === 0){
    return; //terminates recursion
  }
  console.log(inputNum);  
  return countDown(inputNum - 1);
}
//countDown(inputNum);

//return each object in array recursively
const inputObj = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}];

function countObj(inputObj){
  const objAvailable = inputObj.length; 
  let newObjArray = [];

  //This one cannot accept parms from parent function, 
  function iterateObjArr(inputObj, counter){
    //base case
    if(counter === objAvailable){
      return; //terminates recursion
    } else {
      console.log(inputObj[counter]);  
      newObjArray.push(inputObj[counter]);
      return iterateObjArr(inputObj, counter+1);
    }
  }
  iterateObjArr(inputObj, 0);

  return newObjArray;
}
const newObjArray = countObj(inputObj);
//console.log(newObjArray);


//return each object in array recursively
const inputString = "abcdefg";

function reverseString(inputString){
  //Set to start from base zero, hence length = 4 becomes 3 for 0,1,2,3 elements
  const stringLength = inputString.length-1; 
  let newStringArray = [];

  //This one cannot accept parms from parent function, 
  function iterateString(inputString, counter){
    //base case. The recursion terminates once any condition of base case is satisfied
    if(counter === -1){
      return; //terminates recursion
    } else {
      //console.log(inputString[counter]);  
      newStringArray.push(inputString[counter]);
      return iterateString(inputString, counter-1);
    }
  }
  iterateString(inputString, stringLength);

  return newStringArray.join("");
}
const newString = reverseString(inputString);
console.log(newString);


let oddOrEven = (number) => {
  if (number === 0) {
      return 'Even';
  } else if (number === 1) {
      return 'Odd';
  } else {
      return oddOrEven(number - 2);
  }
};
console.log(oddOrEven(20)) // Even
console.log(oddOrEven(75)) // Odd
console.log(oddOrEven(98)) // Even
console.log(oddOrEven(113)) // Odd
