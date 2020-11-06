import { 
    select,
    csv,
    scaleLinear,
    max,
    scaleBand,
    axisLeft,
    axisBottom
   } from 'd3'
  
  const svg = select('svg');
  
  const width = + svg.attr('width');
  const height = + svg.attr('height');
  
  const render = data => {
    const xValue = d => d.country;
    const yValue = d => d.population;
    const margin = { top: 20, right: 20, bottom: 30, left: 110 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
      const yScale = scaleLinear()
        .domain([max(data, yValue), 0])
        .range([0, innerHeight]);
    
        const xScale = scaleBand()
          .domain(data.map(xValue))
          .range([0, innerWidth])
          .padding(0.1);  
    
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        g.append('g').call(axisLeft(yScale));
        g.append('g').call(axisBottom(xScale))
            .attr('transform', `translate(0,${innerHeight})`);
    
      g.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('x', d => xScale(xValue(d)))
          .attr('y', d => yScale(yValue(d)))
          .attr('height', d => innerHeight - yScale(yValue(d)))
          .attr('width', xScale.bandwidth())
  };
  
  // Turning from vertical to horizontal with help from Sam Slotenmaker
  
  csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = + d.population * 1000;
    });
      render(data);
  })