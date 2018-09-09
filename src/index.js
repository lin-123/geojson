const fs = require('fs')
const path = require('path')
const Geojson = require('./geojson')
const api = require('./api')

class Sync {
  constructor({keyword, dir = './'}) {
    if(!keyword) return console.error('invalid keyword', keyword)
    this.keyword = keyword
    this.outputDir = path.join(process.cwd(), dir)
    this.init()
  }
  async init() {
    const {name, center, districts, adcode} = await api.getCityInfo(this.keyword)
    /** todo
     *  get the district for input keyword
     *
     */
    const childDistricts = await Promise.all(districts.map(d => api.getPolyline(d.adcode)))
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

new Sync({keyword: process.env.KEYWORD, dir: process.env.OUTPUT_DIR})