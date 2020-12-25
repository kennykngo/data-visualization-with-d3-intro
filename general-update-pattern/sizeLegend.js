export const sizeLegend = (selection, props) => {
  const { sizeScale, spacing, textOffset } = props;

  const ticks = sizeScale.ticks(5).filter((d) => d !== 0);

  const groups = selection.selectAll("g").data(ticks);

  const groupsEnter = groups.enter().append("g");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(0, ${i * spacing})`);

  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", sizeScale)
    .attr("fill", "black");

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text((d) => d)
    .attr("x", textOffset)
    .attr("dy", "0.32em");
};
