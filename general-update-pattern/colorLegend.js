export const colorLegend = (selection, props) => {
  const { colorScale, height, circleRadius } = props;

  const groups = selection.selectAll("g").data(colorScale.domain());

  const groupsEnter = groups.enter().append("g");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${i * 180 + 100},${height / 2})`);

  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", circleRadius)
    .attr("fill", colorScale);

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .attr("y", 120)
    .text((d) => d);
};
