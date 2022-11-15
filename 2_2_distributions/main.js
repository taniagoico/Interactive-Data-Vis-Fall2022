/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40},
  radius = 5


/* LOAD DATA */
d3.csv("../data/cereal.csv", d3.autoType)
  .then(data => {
    console.log(data)

//     /* SCALES */

    // xScale - linear, count
    const xScale = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.calories))])
    .range([margin.left, width - margin.right])

    // yScale - linear, count
    const yScale = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.rating))])
    .range([height - margin.bottom, margin.top])

    //rScale
    const rScale = d3.scaleSqrt()
    .domain([0, Math.max(...data.map(d => d.fiber))])
    .range([0, 14])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
  

    // colorScale
    const colorScale = d3.scaleOrdinal()
    .domain(["H", "C"])
    .range(["red", "steelblue"])
    
//     /* HTML ELEMENTS */

    // svg
    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("overflow", "visible")


    // circles
    const circles = svg.selectAll(".dot")
    .data(data)
    .join(
      enter => enter
      .append("circle")
      .attr("r", 0)
      .call(sel => sel.transition()
      .duration(10000)
      .attr("r", d => rScale(d.fiber))),
      update => update,
      exit => exit,
      )
    .attr("class", "dot")
    .attr("cx", d => xScale(d.calories))
    .attr("cy", d => yScale(d.rating))
    .attr("r", d => rScale(d.fiber))
    .attr("fill", d => colorScale(d.type))

    svg.selectAll("text.label")
    .data(data)
    .enter()
      .append("text")
      .attr("class", "label")
      // .text(d=>(d.name))
      .attr("x", d=>xScale(d.calories))
      .attr("y", d=>yScale(d.rating))
      .attr("text-anchor", "start")

      svg.append("g")
        .style("transform",`translate(0px,${height-margin.bottom}px)`)
        .call(xAxis);

      svg.append("g")
        .style("transform",`translate(${margin.left}px,0px)`)
        .call(yAxis);

      svg.append("text")
        .style("transform",`translate(${width/2}px,${height}px)`)
        .style("text-anchor", "middle")
       .text("Calories");

       svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "0em")
       .style("text-anchor", "middle")
       .text("Cereal Rating");


      });






    // const cerealLabels = svg
    // .selectAll(".cereal-labels")
    // .data(data, d => d.fiber)
    // .join("text")
    // .attr("x", d => xScale(d.calories))
    // .attr("y", d => yScale(d.rating))
    // .text(d => d.fiber)
    // .attr("text-anchor", "middle")
    // .attr("class", "cereal-labels")

/* LOAD DATA */
// d3.json("../data/environmentRatings.json", d3.autoType)
//   .then(data => {
//     console.log(data)

//     /* SCALES */

//     // xScale - linear, count
//     const xScale = d3.scaleLinear()
//     .domain([0, 1])
//     .range([margin.left, width - margin.right])

//     // yScale - linear, count
//     const yScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range([height - margin.bottom, margin.top])

//     // colorScale
//     const colorScale = d3.scaleOrdinal()
//     .domain(["R", "D"])
//     .range(["red", "blue"])
    
//     /* HTML ELEMENTS */

//     // svg
//     const svg = d3.select("#container")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "pink")

//     // x axis

//     // y axis

//     // circles
//     const circles = svg.selectAll(".dot")
//     .data(data)
//     .join(
//       enter => enter
//       .append("circle")
//       .attr("r", 0)
//       .call(sel => sel.transition()
//       .duration(1000)
//       .delay(d => d.ideologyScore2020 * 200)
//       .attr("r", 10)),
//       update => update,
//       exit => exit,
//       )
//     .attr("class", "dot")
//     .attr("cx", d => xScale(d.ideologyScore2020))
//     .attr("cy", d => yScale(d.envScore2020))
//     .attr("r", 5)
//     .attr("fill", d => colorScale(d.Party))
    
  // });