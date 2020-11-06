// Endpoint which returns locations of parking places, including area IDs
import { endpoint, endpointTwo, selectedColumn} from './config.js'

getData(endpointTwo)
 .then(RDWData => {
  	console.log("all data: ", RDWData)
  	const locationArray = filterData(RDWData, selectedColumn)
    console.log("All location data", locationArray);

  	const uniqueAreaValues = listUnique(locationArray)
    console.log("Unique area values:", uniqueAreaValues) 
  
  	// console.log(usageArray, areaIdArray)
})

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Returns all values for a certain key in an array of data
let filterData = (dataArray, key) => {
  return dataArray.map(item => item[key])
}

// Returns all unique values in an array
let listUnique = (dataArray) => {
  //logica which finds unique values
  let uniqueArray = []
  dataArray.forEach(item => {
    if (uniqueArray.indexOf(item) == -1)
    {
      uniqueArray.push(item)
    }
  })
  return uniqueArray
}