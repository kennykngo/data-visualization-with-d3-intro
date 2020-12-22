// import { range, select } from "d3"
import { fruitsBowl } from "./fruitBowl.js";

const svg = d3.select("svg");

const makeFruit = (type) => ({ type, id: Math.random() });
let fruits = d3.range(5).map(() => makeFruit("apple"));

let selectedFruit = null;

const onClick = (id) => {
  selectedFruit = id;
  console.log(id);
  render();
};

const render = () => {
  fruitsBowl(svg, { fruits, height: +svg.attr("height"), onClick });
};

render();

setTimeout(() => {
  fruits.pop();

  render();
}, 1000);

// replacing an apple with a lemon
setTimeout(() => {
  fruits[2].type = "lemon";
  render();
}, 2000);

setTimeout(() => {
  fruits = fruits.filter((d, i) => i !== 1);

  render();
}, 3000);
