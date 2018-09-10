const Api = require('../../src/Api')
const axios = require('axios')

const requestUrl = 'http://restapi.amap.com/v3/config/district'
describe('api', () => {
  describe('getCityInfo', () => {
    it('normal', async () => {
      const keywords = '山东省'
      sinon.stub(axios, 'get').callsFake((url, {params}) => {
        assert(url === requestUrl)
        assert(params.subdistrict === 1)
        assert(params.extensions === 'base')
        return Promise.resolve({
          data: {
            districts: ['ok']
          }
        })
      })
      const res = await Api.getCityInfo(keywords)
      assert(res === 'ok')
      axios.get.restore()
    })
  })
})