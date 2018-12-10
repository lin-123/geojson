// geojson 瘦身

const fs = require('fs');
const json = require('/Users/houlinjiang/Downloads/world.json');
const getType = (target) => Object.prototype.toString.call(target).slice(8, -1).toLowerCase();

const config = {
  input: '/Users/houlinjiang/Downloads/world.json',
  output: '/Users/houlinjiang/workspace/npmlinks/geojson/geojson/world.min.json'
}

function main() {
  json.features.forEach((feature, idx) => {
    const { NAME, NAME_LONG } = feature.properties;
    console.log(`build country ${idx}: ${NAME} ${NAME_LONG}`);
    feature.properties = { name: NAME_LONG };
    const { coordinates } = feature.geometry || {};
    if (!coordinates) return;
    feature.geometry.coordinates = shortenDecimal(coordinates)
  });

  fs.writeFile(config.output, JSON.stringify(json), 'utf8', (...args) => {
    console.log('done...', ...args)
  })
}

function shortenDecimal(arr) {
  if (getType(arr) === 'array') {
    return arr.map(shortenDecimal)
  }
  return parseFloat(arr.toFixed(5));
}

main();
