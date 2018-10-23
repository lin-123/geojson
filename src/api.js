const axios = require('axios')
const config = require('../config.json')

const getDistricts = async (keywords, subdistrict, extensions) => {
  try {
    const res = await axios.get('http://restapi.amap.com/v3/config/district', {
      params: {
        key: config.key,
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

module.exports = {
  async getCityInfo(keywords) {
    return getDistricts(keywords, 1, 'base')
  },

  async getPolyline(keywords) {
    return getDistricts(keywords, 0, 'all')
  }
}
