// Endpoint which returns locations of parking places, including area IDs
import { endpoint, endpointTwo, selectedColumn} from './config.js'

getData(endpoint)
 .then(RDWData => {
  	console.log("all data: ", RDWData)
  	console.log("one datum", RDWData[0])
  	const areaIdArray = filterData(RDWData, selectedColumn)
    const usageArray = filterData(RDWData, 'usageid')

	const uniqueUsageValues = listUnique(usageArray)
    console.log("Unique usage values:", uniqueUsageValues)
  
  	const uniqueAreaValues = listUnique(areaIdArray)
    console.log("Unique area values:", uniqueAreaValues) 
  
  	// console.log(usageArray, areaIdArray)
})

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Returns all values for a certain key in an array of data
function filterData(dataArray, key) {
  return dataArray.map(item => item[key])
}

// Returns all unique values in an array
function listUnique(dataArray) {
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