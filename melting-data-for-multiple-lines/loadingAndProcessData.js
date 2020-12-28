export const loadAndProcessData = () =>
  // Waits for ALL of the promises to resolve (an array) then destructures the promise
  Promise.all([
    d3.csv(
      "https://vizhub.com/curran/datasets/un-population-estimates-2017-medium-variant.csv"
    ),
    d3.json("https://unpkg.com/visionscarto-world-atlas@0.0.4/world/50m.json"),
  ]).then(([unData, topoJSONdata]) => {
    const minYear = 2015;
    const maxYear = 2100;

    // years returns an array of years from and including 2015 to 2100
    const years = d3.range(minYear, maxYear + 1);

    const data = [];

    unData.forEach((d) => {
      years.forEach((year) => {
        const country = d["Region, subregion, country or area *"];
        const population = +d[year].replace(/ /g, "") * 1000;
        const row = {
          year: new Date(year.toString()),
          country,
          population,
        };
        data.push(row);
      });
    });

    return data;

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
