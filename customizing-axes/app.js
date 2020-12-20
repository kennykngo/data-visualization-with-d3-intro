const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = { top: 20, right: 20, bottom: 20, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(d3.axisLeft(yScale));

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".3s"));

  // bottom axis
  g.append("g").call(xAxis).attr("transform", `translate(0, ${innerHeight})`);
  // yAxis(g.append("g"));

  g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("y", (d) => yScale(yValue(d)))
    // .append("rect")
    .attr("width", (d) => xScale(xValue(d)))
    // .attr("width", (d) => xScale(d.population))
    .attr("height", yScale.bandwidth());
};

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  render(data);
});
