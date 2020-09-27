const inputArray = [9,529,20,15,32,1041]
/**Expected conversions: 
  "1001" = 9
  "1000010001" = 529
  "10100" = 20
  "1111" = 15
  "100000" = 32
  "10000010001" = 1041
  "001"; //Nonsense in binary. Only '0' starts with zero
*/

//Takes in integers as input, and convert them to binary
//It then takes in the binary number to find the longest binary gap
//How to measure efficiency of algorithm?
//I have an input range of 1 to 2,147,483,647 (the Mersenne prime: The max declarable +ve value of a 32-bit signed binary integer)
function binaryGapLengthCounter(inputNum){
  //Convert inputNum to binary using the 'divide by 2' method
  let remainderArray = [];
  let numerator = inputNum;

  //'0' in binary is a special case
  console.log(`Given inputNum: ${inputNum}`);
  if(inputNum === 0){
    remainderArray.splice(0, 0, "0");
  } else if(inputNum > 0){
    while(numerator > 0.5){
      if(numerator%2 === 0){
        numerator = Math.floor(numerator/2);
        remainderArray.splice(0, 0, "0"); //Inserts first in, last out
      } else if(numerator%2 === 1){
        numerator = Math.floor(numerator/2);
        remainderArray.splice(0, 0, "1");
      } 
    }
  } else {
    console.log(`Please insert a positive integer >= 0`);
  }

  //Now to find the goal posts that define a binary gap:
  let binaryString = remainderArray.join("");
  console.log(`Resulting binary digit: ${binaryString}`);
  //The 'posts' refer to number '1' in binaryString
  let postIndices = [];
  for(i=0; i<binaryString.length; ++i){
    if(binaryString[i] === "1"){
      //Use first-in-last-out so that first input is largest, 
      //thus can simply subtract postIndices[0] with postIndices[1] without -ve output
      postIndices.splice(0, 0, i); 
    }
  }
  console.log(postIndices);
  console.log(`Posts identifed at positions ${postIndices.join(",")}`);

  //Calculating the distance between goal posts to find the binary gaps:
  if(postIndices.length <= 1){
   console.log(`No binary gaps found`) 
  } else {
    let largestBinaryGap = 0;
    for(j=0; j<postIndices.length-1; ++j){
      const binaryGap = (postIndices[j] - postIndices[j+1] - 1);
      
      //Doing this saves the trouble of having to compare and find which of several 
      //binary gaps is largest
      if(binaryGap > largestBinaryGap){
        largestBinaryGap = binaryGap;
      }
    }
    console.log(`Largest binary gap is ${largestBinaryGap}`)
  }
}

binaryGapLengthCounter(2500000);

/**Expected conversions: 
  "1001" = 9
  "1000010001" = 529
  "10100" = 20
  "1111" = 15
  "100000" = 32
  "10000010001" = 1041
  "001"; //Nonsense in binary. Only '0' starts with zero
*/