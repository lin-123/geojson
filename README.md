# sync-geojson

## Introduction

> build chinesse geojson by gaode webservice
- [API intrudction](https://lbs.amap.com/api/webservice/guide/api/district)
- [GEOJSON introduction](https://en.wikipedia.org/wiki/GeoJSON)

- example `http://restapi.amap.com/v3/config/district?key=&keywords=&subdistrict=1&extensions=all`
  - `key`: apply to gaode for key
  - `keywords`: district name | citycode | adcode
  - `subdistrict`: 0 | 1 | 2
  - `extensions`: base--no polyline | all--have polyline

## Directories
```
- root
  - src //code place
  - test // unit test
  config.json // config gaode application key
  ...
```

## Usage
- git clone git@github.com:lin-123/geojson.git
- cd geojson
- npm i
- vi config.json
  ```json
  {
    "key": "your gaode application key"
  }
  ```
- npm run build

## Knowledge

- [geojson introduction](./wiki/GEOJSON.md)