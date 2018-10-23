const fs = require('fs')
const path = require('path')
const Geojson = require('./Geojson')
const Api = require('./Api')

class Sync {
  constructor(outputName, {city, output = './', key}) {
    // console.log('arguments', outputName, city, output, key);
    if(!city) return console.error('invalid city', city)
    if(!key) return console.error('please setup your gaode application key')

    this.outputName = outputName
    this.keyword = city

    this.api = new Api(key);
    this.outputDir = path.join(process.cwd(), output)
    this.init()
  }
  async init() {
    const {name, center, districts, adcode} = await this.api.getCityInfo(this.keyword)
    if(!name) return;
    /** todo
     *  get the district for input keyword
     *
     */
    const childDistricts = await Promise.all(districts.map(d => this.api.getPolyline(d.adcode)))
    const features = childDistricts.map(d => Geojson.getFeature(d))

    const geojson = Geojson.getGeojson({name, center, features})
    this.output(this.outputName || adcode, geojson)
  }
  async output(filename, json) {
    const outputPath = path.join(this.outputDir, `${filename}.json`)
    console.info(`writing geojson to ${outputPath} ....`)
    fs.writeFileSync(outputPath, JSON.stringify(json), 'utf-8')
    console.info('success....')
  }
}

module.exports = Sync
// module.exports = Sync
// new Sync({keyword: process.env.KEYWORD, dir: process.env.OUTPUT_DIR})