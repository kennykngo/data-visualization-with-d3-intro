export const loadAndProcessData = () =>
  // Waits for ALL of the promises to resolve (an array) then destructures the promise
  Promise.all([
    d3.tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
    d3.json("https://unpkg.com/world-atlas@1.1.4/world/50m.json"),
  ]).then(([tsvData, topoJSONdata]) => {
    const rowById = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = d;
      return acc;
    }, {});

    const countries = topojson.feature(
      topoJSONdata,
      topoJSONdata.objects.countries
    );

    countries.features.forEach((d) => {
      // assigns rowById[d.id] TO d.properties to be called in future
      // d.properties will contain all of the rows of the table
      Object.assign(d.properties, rowById[d.id]);
    });
    return countries;
  });
