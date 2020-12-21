(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        // import { select, arc } from "d3";
        // import arc from "d3";
        // import { fruitsBowl } from "./fruitBowl";
        const fruitsBowl = require("./fruitBowl");

        const svg = d3.select("svg");

        // append method will append new DOM elements
        // will append the element into the svg element

        const height = +svg.attr("height");
        const width = +svg.attr("width");

        const colorScale = d3
          .scaleOrdinal()
          .domain(["apple", "lemon"])
          .range(["#c11d1d", "#eae600"]);

        const radiusScale = d3
          .scaleOrdinal()
          .domain(["apple", "lemon"])
          .range([50, 30]);

        const makeFruit = (type) => ({ type });

        const fruits = d3.range(5).map(() => makeFruit("apple"));

        // console.log(fruits);
        fruitsBowl(svg, { fruits });

        setTimeout(() => {
          fruits.pop();

          fruitsBowl(svg, { fruits });
        }, 1000);

        // replacing an apple with a lemon
        setTimeout(() => {
          fruits[2].type = "lemon";

          fruitsBowl(svg, { fruits });
        }, 2000);
      },
      { "./fruitBowl": 2 },
    ],
    2: [
      function (require, module, exports) {
        const fruitsBowl = (selection, { fruits }) => {
          const circles = selection
            // .selectAll("circle") is an empty selection
            .selectAll("circle")
            // .data(ARRAY) sets up data section of data join
            .data(fruits);

          circles
            .join(
              (enter) =>
                enter
                  .append("circle")
                  .merge(circles)
                  .attr("fill", (d) => colorScale(d.type))
                  .attr("r", (d) => radiusScale(d.type)),
              (update) => update,
              (exit) => exit.remove()
            )
            .attr("cx", (d, i) => i * 120 + 60)
            .attr("cy", height / 2);
        };

        module.exports = fruitsBowl;
      },
      {},
    ],
  },
  {},
  [1]
);
