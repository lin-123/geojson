const Api = require('../../src/Api')
const axios = require('axios')

const requestUrl = 'http://restapi.amap.com/v3/config/district'
describe('api', () => {
  describe('getCityInfo', () => {
    it('normal', async () => {
      const keywords = '山东省'
      sinon.stub(axios, 'get').callsFake((url, {params}) => {
        assert.ok(url === requestUrl)
        assert.ok(params.subdistrict === 1)
        assert.ok(params.extensions === 'base')
        return Promise.resolve({
          data: {
            districts: ['ok']
          }
        })
      })
      const res = await Api.getCityInfo(keywords)
      assert.ok(res === 'ok')
      axios.get.restore()
    })
  })
})