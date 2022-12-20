/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * 0.5,
 height = window.innerHeight * 0.9,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };

 let svg;



/**
* APPLICATION STATE
* */
let nta = {
    geojson: null,
    hover: {
        Borough: null,
        Neighborhood: null,
        Percent_Latinx: null,
    }
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/NTA_NYC.json")
]).then(([geojson]) => {
 nta.geojson = geojson;
 console.log("nta: ", nta);
 init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

    svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "#90B3A0");

    const projection = d3.geoAlbersUsa().fitSize([width, height], nta.geojson);
    const geoPath = d3.geoPath().projection(projection);

    svg.selectAll(".nta")
        .data(nta.geojson.features)
        .join("path")
        .attr("d", geoPath)
        .attr("class", "nta")
        .attr("fill", "transparent")
        .attr("stroke", "black")
        .on("mouseover", (mouseevent, d) => {
            // console.log(d)
            nta.hover.Neighborhood = d.properties.NTAName;
            nta.hover.Borough = d.properties.BoroName;
            nta.hover.Percent_Latinx = d.properties.Percent_Latino;
            // console.log(nta)
            draw();
        })

 
 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {

    const hoverData = Object.entries(nta.hover);

    d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(d => 
        d[1]
        ? `${d[0]}: ${d[1]}`
        : null
        )
 
draw();
}