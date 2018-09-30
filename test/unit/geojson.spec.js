const Geojson = require('../../src/Geojson')

describe('geojson', () => {
  describe('formatPolyline', () => {
    it('normal', async () => {
      const polyline = '120.9,38.3;120.9,38.2;120.8,38.3|120.8,38.3'
      const poly = Geojson.formatPolyline(polyline)
      assert.ok(poly.length === 2)
      assert.deepEqual(poly, [
        [
          [120.9, 38.3],
          [120.9, 38.2],
          [120.8, 38.3],
        ],
        [
          [120.8,38.3]
        ]
      ])
    })

    it('error: no polyline', () => {
      const poly = Geojson.formatPolyline()
      assert.fail(poly)
    })
  })
})