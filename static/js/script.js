import { select, arc, outerRadius, innerRadius, scaleOrdinal } from 'd3';

import {
  dataSource1,
  dataSource2,
  proxyUrl,
  selectedColumn,
} from './config.js';

// Get data from dataSource 2 (GEO PenR) and count all the years in the array
getData(dataSource2).then((RDWData) => {
  // console.log("all data: ", RDWData)
  const locationArray = filterData(RDWData, selectedColumn);
  console.log('All location data', locationArray);
  
  // Thanks to @Razpudding / Laurens
  let aantalPerJaarArray = [];
  locationArray.forEach((jaar) => {
    // if the array includes a empty value, change it to 0
    // else make a new array with all the years + number of values
    if (aantalPerJaarArray.find((item) => item.year == jaar) == undefined) {
      aantalPerJaarArray.push({
        year: jaar,
        value: 0,
      });
    }
    // Count for every found item 1 to the value
    aantalPerJaarArray.find((item) => item.year == jaar).value += 1;
  });
  // Unique values
  const uniqueAreaValues = listUnique(locationArray);
  console.log('Unique area values:', uniqueAreaValues);
  
	makePieChart(aantalPerJaarArray);
});

// Fetch the data to json
async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Returns all values for a certain key in an array of data
let filterData = (dataArray, key) => {
  return dataArray.map((item) => item[key].slice(0, 4));
};

// Returns all unique values in an array
let listUnique = (dataArray) => {
  //logica which finds unique values
  let uniqueArray = [];
  dataArray.forEach((item) => {
    if (uniqueArray.indexOf(item) == -1) {
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
};

// Making the pie chart
function makePieChart(data) {
  console.log('Making piechart', data);
  const svg = select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  let radius = 170;
  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // const color = scaleOrdinal(["#4497eb", "#3679bc", "#295b8d", "#1b3c5e", "#0e1e2f"]);
  const color = scaleOrdinal(d3.schemeCategory10);

  // Add .sort(null) after .pie() if you don't want to sort it
  const pie = d3.pie().value((d) => d.value);

  let path = arc()
    .outerRadius(radius)
    .innerRadius(radius - 100);

  let pathOver = arc()
    .outerRadius(radius + 10)
    .innerRadius(radius - 90);

  let colorPaths = (d) => color(d.data.value);

  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius + 60);

  const labelValue = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 70);

  const pies = g
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  pies
    .append('path')
    .attr('d', path)
    .attr('fill', colorPaths)
    .attr('class', 'arcPath')
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut)
 		// .on('click', onMouseClick)

  pies
    .append('text')
    .text((d) => d.data.year)
    .attr('class', 'arcText')
    .attr('transform', function (d) {
      return 'translate(' + label.centroid(d) + ')';
    });
 		// .attr('transform', d => `translate(${label.centroid(d)})`)

  pies
    .append('text')
    .text((d) => d.data.value)
    .attr('fill', colorPaths)
    .attr('transform', function (d) {
      return 'translate(' + labelValue.centroid(d) + ')';
    });

  function onMouseOver() {
    d3.select(this)
      .transition(1000)
      .attr('fill-opacity', '0.5')
      .attr('class', 'pathHover')
      .attr('d', pathOver);
    // console.log('*in*');
  }

  function onMouseOut() {
    d3.select(this)
      .transition(1000)
      .attr('fill-opacity', '1')
      .attr('class', 'arcPath')
      .attr('stroke', '')
      .attr('d', path);
    // console.log('*out*')
  }
}

// function onMouseClick() {
//   // console.log('*click*');
// }
