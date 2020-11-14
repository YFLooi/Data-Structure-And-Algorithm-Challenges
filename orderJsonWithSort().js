const inputJson = '[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04},{"name":"apple","price":4.04}]'
function sortByPriceAscending(jsonString) {
    // Your code goes here
    const inputOrder = JSON.parse(jsonString);
    console.log(inputOrder);
    const outputOrder = inputOrder.sort((a, b)=>{
        if(a.price == b.price){
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            
            if (nameA < nameB) {
                return -1; 
            }
            if (nameA > nameB) {
                return 1; 
            }
            return 0; 
        } else {
            return a.price - b.price
        }
    })
    console.log(outputOrder);
}


sortByPriceAscending(inputJson);

//console.log();