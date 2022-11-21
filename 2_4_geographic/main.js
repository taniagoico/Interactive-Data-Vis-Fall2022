/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */

 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, usheat]) => {
  
 console.log('geojson', geojson)
 console.log('usheat', usheat)

 const svg = d3.select("#container")
  .append ("svg")
  .attr("width", width)
  .attr("height", height);

  // SPECIFY PROJECTION

 const projection = d3.geoAlbersUsa()
  .fitSize([width, height], geojson)

  // DEFINE PATH FUNCTION

const pathGen = d3.geoPath(projection)

  // APPEND GEOJSON PATH  

  const states = svg.selectAll("path.states")
  .data(geojson.features)
  .join("path")
  .attr("class", "states")
  .attr("d", coords => pathGen(coords))
  .attr("fill", "grey")
  .attr("stroke", "black")
  
  // APPEND DATA AS SHAPE

  const dataExtent = d3.extent(usheat, d => d.Change)

  colorScale = d3.scaleDiverging()
    .domain([dataExtent[0], 0, dataExtent[1]])
    .interpolator(d3.interpolateRdBu)


 const heatCircles = svg.selectAll("circle.heat")
  .data(usheat)
  .join("circle")
  .attr("class", "heatCircles")
  .attr("r", 3)
  .attr("fill", d => colorScale(d.Change))
  .attr("transform", (d) => {
   const [x, y] = projection([d.Long, d.Lat]);
   return `translate(${x}, ${y})`
 })



});