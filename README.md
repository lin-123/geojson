# geojson

## Introduction

> build geojson by gaode webservice
- [API intrudction](https://lbs.amap.com/api/webservice/guide/api/district)
- [GEOJSON introduction](https://en.wikipedia.org/wiki/GeoJSON)

- example `http://restapi.amap.com/v3/config/district?key=&keywords=&subdistrict=1&extensions=all`
  - `key`: apply to gaode for key
  - `keywords`: district name | citycode | adcode
  - `subdistrict`: 0 | 1 | 2
  - `extensions`: base--no polyline | all--have polyline

## Installation

- npm i geojosn-gaode

## Usage
```
$ geojson -h

Usage: geojson [options] [fileName]

build geojson by gaode api

Options:
  -V, --version         output the version number
  -k --key <key>        gaode application key
  -c --city <city>      city name or city code
  -o --output [output]  output file path for geojson, default is current directory [optional]
  -h, --help            output usage information
```

- sample: `geojson -c 深圳 -o geojson -k xxx shenzhen`

## Directories
```
- root
  - src //code place
  - test // unit test
  config.json // config gaode application key
  ...
```

