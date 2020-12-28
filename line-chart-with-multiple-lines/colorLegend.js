export const colorLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset } = props;

  const groups = selection.selectAll("g").data(colorScale.domain()[0]);

  const groupsEnter = groups.enter().append("g").attr("class", "tick");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(0, ${i * spacing})`);

  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", circleRadius)
    .attr("fill", colorScale);

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text((d) => d)
    .attr("x", textOffset)
    .attr("dy", "0.32em");
};
