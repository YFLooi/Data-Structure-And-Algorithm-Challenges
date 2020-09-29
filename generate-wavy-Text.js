function StringChallenge(strArr) { 
  const inputString = strArr[0];
  const inputStringLength = strArr[0].length;
  const numRows = strArr[1];
  let rowStore = {};
  
  //Populate rowStore with num of row elements = numRows, 
  //and each row with an array of length = inputStringLength
  for (i=0; i<numRows; ++i){
    rowStore[`${i}`] = new Array(inputStringLength).fill(" ");
  }

  console.log(`num rows to create: ${numRows}`);
  console.log(`num of columns per row: ${inputStringLength}`);
  console.log(rowStore);
  console.log("\n");
  
  console.log(`inputStringLength: ${inputStringLength}`);

  //Use coordinate system to target correct cells in rowStore
  let rowNum = 0;
  const largestRowNum = numRows-1;
  const largestColumnNum = inputStringLength-1;

  //let the inner if-else iterate 'i'
  for(i=0; i<=largestColumnNum;){
    //Conditions here ensure this step does not reach the last row and 
    //that it stops when no more columns exist
    if(rowNum<largestRowNum && i<=largestColumnNum){
      for(j=0; j<largestRowNum; ++j){
        console.log(`\nAt downslope`);
        console.log(`Current row: ${rowNum}`);
        console.log(`Current column: ${i}`);
        rowStore[rowNum][i] = inputString[i]
        rowNum++;
        i++; 
      }
    }
    //Conditions here ensure this step does not reach the first row and 
    //that it stops when no more columns exist
    if(rowNum === largestRowNum && i<=largestColumnNum){
      for(j=0; j<largestRowNum; ++j){
        console.log(`\nAt upslope`);
        console.log(`Current row: ${rowNum}`);
        console.log(`Current column: ${i}`);
        rowStore[rowNum][i] = inputString[i]
        rowNum--;
        i++;
      }
    }
  }
  //logs resulting row output
  let numKeys = Object.keys(rowStore).length;
  for(i=0; i<numKeys; ++i){
    //console.log(rowStore[`${i}`]);
    console.log(rowStore[i].join(""));
  }

  // code goes here  
  //return stringDisplay; 
  return null;
}
  
StringChallenge(["armageddonBomBA",4]);