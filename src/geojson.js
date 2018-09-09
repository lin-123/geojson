
class Geojson {
  static getFeature({name, polyline, center}) {
    if(!name || !polyline) return;

    const polygon = this.formatPolyline(polyline)
    return {
      properties: {
        name,
        cp: center
      },
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: polygon
      }
    }
  }

  static getGeojson({name, center, features}) {
    return {
      type: 'FeatureCollection',
      properties: {
        name,
        cp: center
      },
      features
    }
  }

  /**
   * @param {string} polyline x,y;x2,y2|x3,y3;x4,y4
   * @return {array} polygon
   *  [
   *    [
   *      [x,y],
   *      [x,y]
   *    ]
   *  ]
   */
  static formatPolyline(polyline) {
    if(!polyline) return;

    return polyline.split('|')
      .map(poly => poly.split(';').map(pointstr => pointstr.split(',')))
  }
}

module.exports = Geojson
