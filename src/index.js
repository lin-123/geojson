#!/usr/bin/env node

const program = require('commander');
const Handler = require('./handler')
const {version, name} = require('../package.json')

program.arguments('<fileName>')
  .name(name)
  .description('build geojson by gaode api')
  .version(version)
  // todo config gaode application
  // .option('--config', 'config gaode application key')
  .option('-k --key <key>', 'gaode application key')
  .option('-c --city <city>', 'city name or city code')
  .option('-o --output [output]', 'output file path for geojson [optional]')
  // .option('-q --quiet', 'will not print anything', true)
  .action(function(fileName) {
    new Handler(fileName, program)
  })

program.parse(process.argv)
