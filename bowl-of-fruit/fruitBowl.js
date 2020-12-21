const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

export const fruitsBowl = (selection, props) => {
  const { fruits, height } = props;
  const circles = selection
    // .selectAll("circle") is an empty selection
    .selectAll("circle")
    // .data(ARRAY) sets up data section of data join
    .data(fruits);

  circles
    .enter()
    .append("circle")
    .attr("cx", (d, i) => i * 120 + 60)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles)
    .attr("fill", (d) => colorScale(d.type))
    .transition()
    .duration(1000)
    .attr("r", (d) => radiusScale(d.type));
  circles.exit().transition().duration(1000).attr("r", 0).remove();
};

// module.exports = fruitsBowl;
