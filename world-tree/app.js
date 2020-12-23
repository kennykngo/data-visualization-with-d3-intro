const svg = d3.select("svg");

const height = document.body.clientHeight;
const width = document.body.clientHeight;

const treeLayout = d3.tree().size([height, width]);

svg.attr("width", width).attr("height", height);

d3.json("data.json").then((data) => {
  const root = d3.hierarchy(data);
  const links = treeLayout(root).links();
  const linkPathGenerator = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x);

  svg
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("d", linkPathGenerator);

  svg
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .text((d) => d.data.data.id);
});
