const fs = require('fs')
const path = require('path')
const Geojson = require('./Geojson')
const Api = require('./Api')

class Sync {
  constructor({keyword, dir = './'}) {
    if(!keyword) return console.error('invalid keyword', keyword)
    this.keyword = keyword
    this.outputDir = path.join(process.cwd(), dir)
    this.init()
  }
  async init() {
    const {name, center, districts, adcode} = await Api.getCityInfo(this.keyword)
    if(!name) return;
    /** todo
     *  get the district for input keyword
     *
     */
    const childDistricts = await Promise.all(districts.map(d => Api.getPolyline(d.adcode)))
    const features = childDistricts.map(d => Geojson.getFeature(d))

    const geojson = Geojson.getGeojson({name, center, features})
    this.output(adcode, geojson)
  }
  async output(filename, json) {
    const outputPath = path.join(this.outputDir, `${filename}.json`)
    console.info(`writing geojson to ${outputPath} ....`)
    fs.writeFileSync(outputPath, JSON.stringify(json), 'utf-8')
    console.info('success....')

  }
}

// module.exports = Sync
new Sync({keyword: process.env.KEYWORD, dir: process.env.OUTPUT_DIR})