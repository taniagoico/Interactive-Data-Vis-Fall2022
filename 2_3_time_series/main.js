 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60};

/* LOAD DATA */
d3.csv('../data/Primary-energy-consumption-from-fossilfuels-nuclear-renewables.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Entity,
    consumption: +d.Fossil_fuels
  }
}).then(data => {
  console.log('data :>> ', data);

  const germanydata = data.filter(d => d.country === "Germany")
  console.log(germanydata)

  // // SCALES

  const yScale = d3.scaleLinear()
  .domain(d3.extent(germanydata, d => d.consumption))
  .range([height - margin.bottom, margin.top])

  const xScale = d3. scaleTime()
  .domain(d3.extent(germanydata, d => d.year))
  .range([margin.left, width - margin.right])

  // // CREATE SVG ELEMENT

  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);


  // // BUILD AXES

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)


  // // LINE GENERATOR FUNCTION

  // const line = d3.line()
  // .x(d => xScale(d.year))
  // .y(d => yScale(d.consumption))

  const area = d3.area()
  .x(d => xScale(d.year))
  .y0(height - margin.bottom)
  .y1(d => yScale(d.consumption))

  // const groupedData = d3.groups(data, d => d.country)

   // // DRAW LINE

  const path = svg.selectAll("path.ger")
  .data([germanydata])
  .join("path")
  .attr("d", d => area(d))
  // .attr("class", ([country, data]) => country)
  .attr("stroke", "black")
  .attr("fill", "pink")

  //AREA GENERATOR

  svg.append("path")
  .data([germanydata])
  .join("path")
  .attr("class", "line-area")
  .attr("d", d => area)

// CALL AXES

  svg.append("text")
   .style("transform",`translate(${width/2}px,${height}px)`)
   .style("text-anchor", "middle")
   .text("Year");

 svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% Consumption from Fossil Fuels");

svg.append("g")
   .style("transform",`translate(0px,${height-margin.bottom}px)`)
   .call(xAxis);
     
svg.append("g")
   .style("transform",`translate(${margin.left}px,0px)`)
   .call(yAxis);

});