const allCaps = (str) => str === str.toUpperCase();
const isRegion = (name) => allCaps(name) && name !== "WORLD";

const parseYear = d3.timeParse("%Y");

const melt = (unData, minYear, maxYear) => {
  // years returns an array of years from and including 2015 to 2100
  const years = d3.range(minYear, maxYear + 1);

  const data = [];

  unData.forEach((d) => {
    const name = d["Region, subregion, country or area *"].replace(
      "AND THE",
      "&"
    );
    years.forEach((year) => {
      const population = +d[year].replace(/ /g, "") * 1000;
      const row = {
        year: parseYear(year),
        name,
        population,
      };
      data.push(row);
    });
  });

  return data.filter((d) => isRegion(d.name));
};

export const loadAndProcessData = () =>
  // Waits for ALL of the promises to resolve (an array) then destructures the promise
  Promise.all([
    d3.csv(
      "https://vizhub.com/curran/datasets/un-population-estimates-2017-medium-variant.csv"
    ),
    d3.csv(
      "https://vizhub.com/curran/datasets/un-population-estimates-2017.csv"
    ),
  ]).then(([unDataMediumVariant, unDataEstimates]) => {
    return melt(unDataEstimates, 1950, 2014).concat(
      melt(unDataMediumVariant, 2015, 2100)
    );
  });
