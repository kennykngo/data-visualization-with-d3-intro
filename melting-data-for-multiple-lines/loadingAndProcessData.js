const allCaps = (str) => str === str.toUpperCase();
const isRegion = (name) => allCaps(name) && name !== "WORLD";

const melt = (unData, minYear, maxYear) => {
  // years returns an array of years from and including 2015 to 2100
  const years = d3.range(minYear, maxYear + 1);

  const data = [];

  unData.forEach((d) => {
    const name = d["Region, subregion, country or area *"];
    years.forEach((year) => {
      const population = +d[year].replace(/ /g, "") * 1000;
      const row = {
        year: new Date(year.toString()),
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
    console.log(unDataEstimates);
    // const rowById = unData.reduce((acc, d) => {
    // console.log(d["Country code"]);
    // acc[d["Country code"]] = d;
    // return acc;
    // }, {});

    // const countries = topojson.feature(
    // topoJSONdata,
    // topoJSONdata.objects.countries
    // );

    // countries.features.forEach((d) => {
    // // assigns rowById[d.id] TO d.properties to be called in future
    // // d.properties will contain all of the rows of the table
    // Object.assign(d.properties, rowById[+d.id]);
    // });

    // const featuresWithPopulation = countries.features
    // .filter((d) => d.properties["2018"])
    // .map((d) => {
    // 	d.properties["2018"] = +d.properties["2018"].replace(/\s/g, "") * 1000;
    // 	return d;
    // });
    // return { features: countries.features, featuresWithPopulation };
  });
