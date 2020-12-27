export const dropdownMenu = (selection, props) => {
  const { options, onOptionClicked, selectedOption } = props;

  // select will contain one element all the time
  let select = selection.selectAll("select").data([null]);
  select = select
    .enter()
    .append("select")
    .merge(select)
    .on("change", function (e) {
      onOptionClicked(this.value);
    });

  const option = select.selectAll("option").data(options);
  option
    .enter()
    .append("option")
    .merge(option)
    .attr("value", (d) => d)
    // property allows "selected" to exist if CB function renders true
    .property("selected", (d) => d === selectedOption)
    .text((d) => d);
};
