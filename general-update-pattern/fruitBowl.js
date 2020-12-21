const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

const xPosition = (d, i) => i * 180 + 100;

export const fruitsBowl = (selection, props) => {
  const { fruits, height } = props;
  const circles = selection
    // .selectAll("circle") is an empty selection
    .selectAll("circle")
    // .data(ARRAY) sets up data section of data join
    .data(fruits, (d) => d.id);

  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .merge(circles)
    .attr("r", (d) => radiusScale(d.type))
    .attr("fill", (d) => colorScale(d.type));
  circles.exit().remove();

  const text = selection.selectAll("text").data(fruits, (d) => d.id);

  text
    .enter()
    .append("text")
    .attr("x", xPosition)
    .attr("y", height / 2)
    .merge(text)
    .text((d) => d.type);
  text.exit().remove();
};

// module.exports = fruitsBowl;
