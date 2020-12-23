const svg = d3.select("svg");

console.log(document.body.clientWidth);
console.log(document.body.clientHeight);

const height = document.body.clientHeight;
const width = document.body.clientHeight;

svg
  .attr("width", width)
  .attr("height", height)
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("rx", 40);
