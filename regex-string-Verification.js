function StringChallenge(str) { 
  // code goes here  
  const inputString = str;

  const splitInputString = inputString.split(' ');
  let inputPattern = splitInputString[0];
  let targetCharacters = splitInputString[1];

  const letters = /^[a-zA-Z]+$/;
  const numbers = /^[1-9]+$/;
  const triplet = /^[a-zA-Z][a-zA-Z][a-zA-Z]$/;
  const multiplet = /^[a-zA-Z]$/;

  let stillValid = true;
  let inputPatternLength = inputPattern.length;
  for(i=0; i<inputPatternLength; ++i){
    //since targetCharacters are of all kinds, we need
    //to iterate by input pattern
    //Once the segment of an input pattern is processed,
    //it is cut off, so that the next one can be processed
    console.log(`Remaining input pattern: ${inputPattern}`);

    if(inputPattern[0] === "+"){
      console.log(`Matched pattern matched: "+"`)
      if(targetCharacters[0].match(letters)){
        //slices off inputPattern so that both the require inputPatterna and targetCharacter
        //are at position [0] of their respective strings
        inputPattern = inputPattern.slice(1);
        targetCharacters = targetCharacters.slice(1);
        console.log(`new target: ${targetCharacters}\n`);
      } else {
        stillValid = false;
        break;
      }
    } else if(inputPattern[0] === "$"){
      console.log(`Matched pattern matched: "$"`)
      if(targetCharacters[0].match(numbers)){
        inputPattern = inputPattern.slice(1);
        targetCharacters = targetCharacters.slice(1);
        console.log(`new target: ${targetCharacters}\n`);
      } else {
        stillValid = false;
        break;
      }
      
    } else if(inputPattern[0] === "*" && inputPattern[0+1] !== "{"){
      console.log(`Matched pattern matched: "*"`)
      let tripletTarget = `${targetCharacters[0]}${targetCharacters[1]}${targetCharacters[2]}`
      if(tripletTarget.match(triplet)){
        inputPattern = inputPattern.slice(1);
        //slice 3 off only if 3 confirmed
        targetCharacters = targetCharacters.slice(3);
        console.log(`new target: ${targetCharacters}\n`);
      } else {
        stillValid = false;
        break;
      }
      console.log(`new target: ${targetCharacters}`);
    } else if(inputPattern[0] === "*" && inputPattern[0+1] === "{"){
      console.log(`Matched pattern matched: "*{N}"`)
      let numTargetCharacters = inputPattern[0+2];
      console.log(`num of * targets: ${numTargetCharacters}`);

      let newTargetCharacters = "";
      for(i=0; i<numTargetCharacters; ++i){
        newTargetCharacters = `${newTargetCharacters}${targetCharacters[i]}`;
      }
      console.log(`Target characters for *{N}: ${newTargetCharacters}`);

      
      if(newTargetCharacters.matchAll(multiplet)){
        //slices off *{N} to avoid feeding invalid inputPattern, e.g. {
        inputPattern = inputPattern.slice(4);
        //slice N characters off only if confirmed true
        targetCharacters = targetCharacters.slice(Number(numTargetCharacters));
        //since this special case is 4 chars long, we reduce remaining number of iterations
        //accordingly
        inputPatternLength-4; 
        
      } else {
        stillValid = false;
        break;
      }
      
      console.log(`new target: ${targetCharacters}\n`);
    } else {
      console.log("Invalid pattern detected. Aborting...")
      break;
    }
  }

  console.log(`The second string of target characters is ${stillValid} to the inputPattern specified\n`);
  return stillValid; 
}
   
StringChallenge("++$*{3}$* az1baa1gaa");
StringChallenge("++$*{3}+* az1baa1gaa");

