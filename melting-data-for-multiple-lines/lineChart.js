import { parseYear } from "./loadingAndProcessData.js";
export const lineChart = (selection, props) => {
  const {
    colorScale,
    yValue,
    xValue,
    colorValue,
    title,
    xAxisLabel,
    yAxisLabel,
    margin,
    width,
    height,
    data,
    nested,
    selectedYear,
    setSelectedYear,
  } = props;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleTime()
    // extent returns an array of max and min
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const g = selection.selectAll(".container").data([null]);
  const gEnter = g.enter().append("g").attr("class", "container");
  gEnter.merge(g).attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tickFormat = (number) =>
    d3.format(".2s")(number).replace("G", "B").replace(".0", "");

  const xAxis = d3
    .axisBottom(xScale)
    // .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
    .tickPadding(10);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(tickFormat);

  const yAxisGEnter = gEnter.append("g").attr("class", "y-axis");

  const yAxisG = g.select(".y-axis");
  yAxisGEnter
    .merge(g.select(".y-axis"))
    .call(yAxis)
    .selectAll(".domain")
    .remove();

  yAxisGEnter
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -93)
    .attr("transform", `rotate(-90)`)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .merge(yAxisG.select(".axis-label"))
    .attr("x", -innerHeight / 2)
    .text(yAxisLabel);

  // bottom axis
  const xAxisGEnter = gEnter.append("g").attr("class", "x-axis");

  const xAxisG = g.select(".x-axis");

  xAxisGEnter
    .merge(xAxisG)
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`);

  xAxisG.select(".domain").remove();
  // yAxis(g.append("g"));

  xAxisGEnter
    .append("text")
    .attr("class", "axis-label")
    .attr("fill", "black")
    .attr("y", 75)
    .merge(xAxisG.select(".axis-label"))
    .attr("x", innerWidth / 2)
    .text(xAxisLabel);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveBasis);

  // chart maker
  const linePaths = g.merge(gEnter).selectAll(".line-path").data(nested);

  linePaths
    .enter()
    .append("path")
    .attr("class", "line-path")
    .merge(linePaths)
    .attr("d", (d) => lineGenerator(d.values))
    .attr("stroke", (d) => colorScale(d.key));

  const selectedYearDate = parseYear(selectedYear);

  // selectedYear
  gEnter
    .append("line")
    .attr("class", "selected-year-line")
    .attr("y1", 0)
    .merge(g.select(".selected-year-line"))
    .attr("x1", xScale(selectedYearDate))
    .attr("x2", xScale(selectedYearDate))
    .attr("y2", innerHeight);

  gEnter
    .append("text")
    .attr("class", "title")
    .attr("y", -10)
    .merge(g.select(".title"))
    .text(title);

  gEnter
    .append("rect")
    .attr("class", "mouse-interceptor")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .merge(g.select(".mouse-interceptor"))
    .on("mousemove", function () {
      const x = d3.mouse(this)[0];

      // console.log(xScale.invert(x));
      const hoveredDate = xScale.invert(x);
      setSelectedYear(hoveredDate.getFullYear());
    });
};
