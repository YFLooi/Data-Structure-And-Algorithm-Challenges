//Possible leads?
/** 
 * https://duckduckgo.com/?q=algorithm+identify+squares+from+coordinates&atb=v165-2__&ia=web
 * https://stackoverflow.com/questions/21658745/fast-formula-to-find-the-coordinate-of-the-4th-vertex-of-the-square-by-three-oth
 * https://www.geeksforgeeks.org/program-to-find-the-type-of-triangle-from-the-given-coordinates/
 * https://stackoverflow.com/questions/18006377/given-four-coordinates-check-whether-it-forms-a-square
 */

const coordinatesList = [ //8 available
  {x:-3, y:3},
  {x:3, y:3},
  {x:-6, y:0},
  {x:0, y:0},
  {x:3, y:0},
  {x:-3, y:-3},
  {x:0, y:-3},
  {x:3, y:-3},
]
// const coordinatesList = [ //8 available
//   {x:0, y:0},
//   {x:3, y:0},
//   {x:0, y:-3},
//   {x:3, y:-3}
// ]

//Takes in given coordinates array and generates an array of its indices
const generateArrayIndices = (inputArray) => {
  let indices = [];

  //This populates indices[] with 0 to array.length
  for(i=0; i< inputArray.length; ++i){
    indices.push(`${i}`)
  }
  
  //console.log(`Available indices: ${indices}`);
  return indices;
}
/**
 * Operates like combinations (NOT permutation) NC(r), where N = num inputs, r = length of output
 * Works for an array of strings, NOT an array of objects/arrays since they can be iterated on
 * Sauce: https://js-algorithms.tutorialhorizon.com/2016/08/26/generate-all-combinations-of-a-string-in-javascript/
 * @param {*} instr The input string
 * @param {*} outstr The output string
 * @param {*} index The start position of the for loop on instr
 */
const combinationFinder = (instr, outstr, index, combinationLength) => {
  let possibleCombinations = []
  const outputCombinationLength = combinationLength;

  function combinationEngine(instr, outstr, index){
    //console.log(`Current instr,${instr},Current outstr,${outstr},Current index,${index}`)
    for (let i = index; i < instr.length; ++i) {
      // append the character
      outstr = outstr.concat(instr[i]);
      
      //print the result of each combination of 4 strings in length
      //console.log(`Output of iteration ${i}: ${outstr}`);
      if(outstr.length === outputCombinationLength){
        possibleCombinations.push(outstr);
      }
      
      // make a recursive call at i + 1
      combinationEngine(instr, outstr, i + 1);
      
      // remove all save for the last character in outstr, which was added in the first step
      outstr = outstr.slice(0, outstr.length - 1);
    }  
  }
  combinationEngine(instr, outstr, index)
  return possibleCombinations
};

//The idea: Generate all possible combination of 4 coordinates without duplication, then see if
//the difference in distance between them are the same
const squareFinder = (coordinatesList) => {
  const possibleCombinations = combinationFinder(generateArrayIndices(coordinatesList), "", 0, 4); 
  let numberOfSquares = 0;

  // console.log(`Solutions available: ${possibleCombinations.length}`);
  // console.log(`Possible solutions:`)
  // console.table(possibleCombinations);

  for(let i=0; i<possibleCombinations.length; ++i){
    // if(i===3){
    //   break;
    // }
    
    //Converts the string of array indices into integers
    const arrayCombination = [
      Number(possibleCombinations[i][0]), Number(possibleCombinations[i][1]), 
      Number(possibleCombinations[i][2]), Number(possibleCombinations[i][3])
    ];
    //Make array of coordinates based on indices in arrayCombination
    const coordinates = [
      coordinatesList[arrayCombination[0]], coordinatesList[arrayCombination[1]],
      coordinatesList[arrayCombination[2]], coordinatesList[arrayCombination[3]]
    ]
    //console.log(coordinates)

    //Find the length between each pair of coordinates using Pythagoras' theorem
    //This length is the length of 1 side of a square
    let lengthOfSides = [];
    const coordCombos = [[0,1],[1,2],[2,3],[0,2],[0,3],[1,3]];
    for(let j=0; j<coordCombos.length; ++j){
      const xLength = coordinates[coordCombos[j][0]]["x"] - coordinates[coordCombos[j][1]]["x"]; 
      const yLength = coordinates[coordCombos[j][0]]["y"] - coordinates[coordCombos[j][1]]["y"]; 

      //console.log(`xLength calculated: ${xLength}, yLength calculated: ${yLength}`);
      lengthOfSides.push(Math.pow(xLength, 2)+Math.pow(yLength, 2));
    }
    
    //Count each unique lengthOfSides. There must be 4 of the same for a "square" to be detected
    //console.log(lengthOfSides);
    var counts = {};
    for (let k = 0; k < lengthOfSides.length; k++) {
      //If a key has a lengthOfSides === 4, a square is detected
      if((1 + counts[lengthOfSides[k]]) === 4){
        numberOfSquares += 1;
      }

      //On each iteration, it looks for the key = lengthOfSides[k] and increments it by +1
      //'0' is used on first iteration (k=0) because counts[lengthOfSides[k]] does not exist at k=0
      counts[lengthOfSides[k]] = 1 + (counts[lengthOfSides[k]] || 0);
    }
  }

  return numberOfSquares;
}
const numberOfSquares = squareFinder(coordinatesList);
console.log(`Number of squares possible from input coordinates: ${numberOfSquares}`)

//Note: Still not correct...
//The idea: Generate all possible combination of 3 coordinates without duplication, then see if
//the difference in distance between them are the same
const triangleFinder = (coordinatesList) => {
  const possibleCombinations = combinationFinder(generateArrayIndices(coordinatesList), "", 0, 3); 
  let numberOfTriangles = {equilateral: 0, isoceles: 0, scalene: 0};

  // console.log(`Solutions available: ${possibleCombinations.length}`);
  // console.log(`Possible solutions:`)
  // console.table(possibleCombinations);

  for(let i=0; i<possibleCombinations.length; ++i){
    //Converts the string of array indices into integers
    const arrayCombination = [
      Number(possibleCombinations[i][0]), Number(possibleCombinations[i][1]), 
      Number(possibleCombinations[i][2])
    ];
    //Make array of coordinates based on indices in arrayCombination
    const coordinates = [
      coordinatesList[arrayCombination[0]], coordinatesList[arrayCombination[1]],
      coordinatesList[arrayCombination[2]]
    ]
    //console.log(coordinates)

    //Find the length between each pair of coordinates using Pythagoras' theorem
    //This length is the length of 1 side of a square
    let lengthOfSides = [];
    const coordCombos = [[0,1],[0,2],[1,2]];
    for(let j=0; j<coordCombos.length; ++j){
      const xLength = coordinates[coordCombos[j][0]]["x"] - coordinates[coordCombos[j][1]]["x"]; 
      const yLength = coordinates[coordCombos[j][0]]["y"] - coordinates[coordCombos[j][1]]["y"]; 

      //console.log(`xLength calculated: ${xLength}, yLength calculated: ${yLength}`);
      lengthOfSides.push(Math.sqrt(
        Math.pow(xLength, 2)+Math.pow(yLength, 2)
      ).toFixed(2));
    }
    
    //Count each unique lengthOfSides. There must be 4 of the same for a "square" to be detected
    //console.log(lengthOfSides);
    var counts = {};
    for (let k = 0; k < lengthOfSides.length; k++) {
      //Classifies by type
      if((1 + counts[lengthOfSides[k]]) === 2){
        numberOfTriangles["isoceles"] += 1;
      } else if((1 + counts[lengthOfSides[k]]) === 3){
        numberOfTriangles["equilateral"] += 1;
      }

      //On each iteration, it looks for the key = lengthOfSides[k] and increments it by +1
      //'0' is used on first iteration (k=0) because counts[lengthOfSides[k]] does not exist at k=0
      counts[lengthOfSides[k]] = 1 + (counts[lengthOfSides[k]] || 0);
    }
    //console.log(counts);
  }

  //Determines number of scalene triangles
  //Based on principles that any 3 points can make a triangle
  numberOfTriangles["scalene"] = possibleCombinations.length - numberOfTriangles["isoceles"] - numberOfTriangles["equilateral"];

  return numberOfTriangles;
}
const numberOfTriangles = triangleFinder(coordinatesList);
console.log(`Number of each type of triangles possible from input coordinates: ${JSON.stringify(numberOfTriangles)}`)