import { loadAndProcessData, parseYear } from "./loadingAndProcessData.js";
import { colorLegend } from "./colorLegend.js";
import { lineChart } from "./lineChart.js";
const svg = d3.select("svg");
const lineChartG = svg.append("g");
const colorLegendG = svg.append("g");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const selectedYear = 2018;

let data;

const render = () => {
  const yValue = (d) => d.population;
  const colorValue = (d) => d.name;
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const lastYValue = (d) => yValue(d.values[d.values.length - 1]);

  const nested = d3
    .nest()
    .key(colorValue)
    .entries(data)
    .sort((b, a) => d3.ascending(lastYValue(a), lastYValue(b)));
  console.log(nested);

  colorScale.domain(nested.map((d) => d.key));

  lineChartG.call(lineChart, {
    colorScale,
    colorValue,
    yValue,

    title: "Population Over Time By Region",
    xValue: (d) => d.year,
    xAxisLabel: "Time",
    yAxisLabel: "Population",

    margin: { top: 60, right: 280, bottom: 88, left: 105 },
    width,
    height,
    data,
    nested,
    selectedYear,
  });

  colorLegendG
    .append("g")
    .attr("transform", `translate(735, 121)`)
    .call(colorLegend, {
      colorScale,
      circleRadius: 10,
      spacing: 55,
      textOffset: 15,
    });
};

loadAndProcessData().then((loadedData) => {
  data = loadedData;
  render();
});
