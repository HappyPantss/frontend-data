// import {
//     select,
//     csv,
//     pie,
//   	arc,
//  	 	outerRadius,
//   	innerRadius,
//   	scaleOrdinal,
//   	schemeCategory10,
// 		format
// } from 'd3'

import {
  getData,
  overviewUrl,
  dataSource1,
  dataSource2,
  proxyUrl,
  selectedColumn
} from './config.js'

getData(dataSource2)
 .then(RDWData => {
  	// console.log("all data: ", RDWData)
  	const locationArray = filterData(RDWData, selectedColumn)
    console.log("All year data", locationArray);

    // Unique values
  	const uniqueAreaValues = listUnique(locationArray)
    console.log("Unique year values:", uniqueAreaValues)
  
  	makingChart()
})

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

let filterData = (dataArray, key) => {
  return dataArray.map(item => item[key].slice(0,4))
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

// Making the pie chart
let makingChart = (data) => {

  let svg = d3.select('svg'),
      width = svg.attr('width'),
    	height = svg.attr('height');

  let radius = 200;
  let g = svg.append('g')
  	.attr('transform', `translate(${width / 2}, ${height / 2})`);

  // let color = d3.scaleOrdinal(["#4497eb", "#3679bc", "#295b8d", "#1b3c5e", "#0e1e2f"]);
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add .sort(null) after .pie() if you don't want to sort it
  const pie = d3.pie()
  	.value(function(d) {
    	return d.startdataarea
    });
  
  let path = d3.arc()
  	.outerRadius(radius)
  	.innerRadius(0);

  let label = d3.arc()
  	.outerRadius(radius)
  	.innerRadius(radius - 90);

  let pies = g.selectAll('.arc')
  	.data(pie(data))
  	.enter()
  	.append('g')
  	.attr('class', 'arc');

  pies.append('path')
    	.attr('d', path)
    	.attr('fill', (data, i) => {
  			return d3.schemeTableau10[i];
			});

  pies.append('text')
    .attr('class', 'arcText')
    .attr('transform', function(d) {
      return "translate(" + label.centroid(d) + ")";
    })
  	.text(function(d) {
  		return d.startdataarea;
  	})
}

// MAKING PIE CHART - CORRECT? 
// const svg = select('svg');

// const width = +svg.attr('width');
// const height = +svg.attr('height');

// const render = data => {
//   const radius = 200;
//   const g = svg.append('g')
//   .attr('transform', `translate(${width / 2}, ${height / 2})`);

//   // const color = d3.scaleOrdinal(["#4497eb", "#3679bc", "#295b8d", "#1b3c5e", "#0e1e2f"]);
//   const color = scaleOrdinal(schemeCategory10);

//   // Add .sort(null) after .pie() if you don't want to sort it
//   const pie = d3.pie().value(d => d.value);

//   const path = arc()
//   	.outerRadius(radius)
//   	.innerRadius(0);

//   const label = arc()
//   	.outerRadius(radius)
//   	.innerRadius(radius - 90);

//   const pies = g.selectAll('.arc')
//   	.data(pie(data))
//   	.enter().append('g')
//   	.attr('class', 'arc');

//   pies.append('path')
//   	.attr('d', path)
//     .attr('fill', d => color(d.data.value));

//   pies.append('text')
//     .text(d => d.data.year)
//     .attr('class', 'arcText')
//     .attr('transform', d => `translate(${label.centroid(d)})`)
// }

// csv('data.csv').then(data => {
//     data.forEach(d => {
//         d.year = +d.year;
//     });
//     render(data);
// })