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

  const bowl = selection
    .selectAll("rect")
    .data([null])
    .enter()
    .append("rect")
    .attr("y", 100)
    .attr("width", 920)
    .attr("height", 300)
    .attr("rx", 300 / 2);

  const groups = selection.selectAll("g").data(fruits, (d) => d.id);

  const groupsEnter = groups.enter().append("g");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${i * 180 + 100},${height / 2})`);

  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", (d) => radiusScale(d.type))
    .attr("fill", (d) => colorScale(d.type));

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .attr("y", 120)
    .text((d) => d.type);
};
