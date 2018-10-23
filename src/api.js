const axios = require('axios')
// const config = require('../config.json')

class Api {
  constructor(key) {
    this.key = key;
  }

  async getDistricts(keywords, subdistrict, extensions) {
    try {
      const res = await axios.get('http://restapi.amap.com/v3/config/district', {
        params: {
          key: this.key,
          subdistrict,
          keywords,
          extensions
        }
      })
      return res.data.districts[0]
    } catch (e) {
      console.error(e);
      return {}
    }
  }

  async getCityInfo(keywords) {
    return this.getDistricts(keywords, 1, 'base')
  }

  async getPolyline(keywords) {
    return this.getDistricts(keywords, 0, 'all')
  }

}

module.exports = Api
