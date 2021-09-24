/* globals d3 */

async function scatterplot() {
    let data = await d3.csv(
      'cities.csv',
      d3.autoType
    );
    let filtered = data.filter(d => d.eu == true);
    var len = filtered.length;
    
    d3.select('.city-count').text("Number of Cities: " + len );

    const width = 700;
    const height = 550;


    const svg = d3.select('.population-plot')
		    .append('svg')
        .attr('width', width)
        .attr('height', height)

    const enter = svg.selectAll('circle')
        .data(filtered)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) {
          if(d.population > 1000000) {
          return 8;
          }
          else{
          return 4;
          }})
      
      svg.selectAll("text")
          .data(filtered)
          .enter()
          .filter(function(d) { return d.population > 1000000})
          .append("text")
          .text((d) => (d.country))
          .attr("alignment-baseline", "top")
          .attr("text-anchor", "middle")
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("dy", -10)
          .attr("font-size", "11px")
      }
    
  scatterplot();

  async function barchart() {
    let data = await d3.csv(
        'buildings.csv',
        d3.autoType
      );
    let filtered = data.sort(function(a, b) {return b.height_m - a.height_m;
    });
    console.log(filtered)

    const width = 600;
    const height = 500;
  
    const svg = d3.select(".building-plot")
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    

    const enter =svg.selectAll('rect')
      .data(filtered)
      .enter()
      .append("rect")
      .attr("y", function(d, i) {
        return i * (height / filtered.length);})
      .attr("height", 35)
      .attr("width", function(d) {
        { return (d.height_px) };})
      .attr("x", 180)
      .attr("fill", "teal")
      .on("click", function(event,d) {
        d3.select(".image")
          .attr("src", "img/" + d.image);
          d3.select(".building-name").text(d.building);
        d3.select(".height").text(d.height_ft);
        d3.select(".city").text(d.city);
        d3.select(".country").text(d.country);
        d3.select(".floors").text(d.floors);
        d3.select(".completed").text(d.completed);
        });
  
    svg.selectAll("text")
        .data(filtered)
        .enter()
        .append("text")
        .text((d) => (d.building))
        .attr("y", function(d, i) {
          return (i+.5) * (height / filtered.length);})
        .attr("height", 35)
        .attr("width", function(d) {
          { return (d.height_px) };})
        .attr("x", 0)
        .attr("font-size", "12px")

    svg.selectAll(".textclass")
        .data(filtered)
        .enter()
        .append("text")
        .attr("class", ".textclass")
        .text((d) => (d.height_ft + " ft"))
        .attr("y", function(d, i) {
          return (i+.5) * (height / filtered.length);})
        .attr("height", 35)
        .attr("x",  function(d) {
          { return (d.height_px + 170)};} )
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("text-anchor", "end")
      
  }
      
  barchart();
