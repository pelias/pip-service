> This repository is part of the [Pelias](https://github.com/pelias/pelias) project. Pelias is an open-source, open-data geocoder built by [Mapzen](https://www.mapzen.com/) that also powers [Mapzen Search](https://mapzen.com/projects/search). Our official user documentation is [here](https://mapzen.com/documentation/search/).

# Pelias Point-in-Polygon Service

![Travis CI Status](https://travis-ci.org/pelias/pip-service.svg)
[![Gitter Chat](https://badges.gitter.im/pelias/pelias.svg)](https://gitter.im/pelias/pelias?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Overview

This service provides Who's on First-based point-in-polygon lookup functionality.  

## Installation

```bash
$ git clone git@github.com:pelias/pip-service.git
$ cd pip-service
$ npm install
```

The Who's on First data required to run an instance of the PIP service
needs to be downloaded manually before starting up the service.
We recommend using the [pelias/whosonfirst](https://github.com/pelias/whosonfirst)
download script to accomplish this. Be sure to consult the README in that
repository for configuration details, such as filtering the data by a specific area.

```bash
$ npm i pelias-whosonfirst
$ cd node_modules/pelias-whosonfirst
$ npm run download
```

## Installation with Docker

The docker container is setup to perform the data download during the build.
The only customization required is to the `docker/pelias.json` file.
It should be updated to reflect the desired coverage area and placetypes.
There is an api key placeholder in there as well, that should be replaced with
the user's [Mapzen Developer](mapzen.com/developers) api key.

```bash
$ git clone git@github.com:pelias/pip-service.git
$ cd pip-service
docker build -t pelias/pip .
docker run -d -p 3102:3102 --name pip1 pelias/pip
```

[![NPM](https://nodei.co/npm/pelias-pip-service.png?downloads=true&stars=true)](https://nodei.co/npm/pelias-pip-service)

## NPM Module

The `pelias-pip-service` npm module can be found here:

[https://npmjs.org/package/pelias-pip-service](https://npmjs.org/package/pelias-pip-service)

#### Usage

To start the PiP service, type: `npm start <path to Who's on First data>`.  By default, the service starts on port 3102.  

Requests are made to the endpoint in the format:  `http://localhost:3102/<lon>/<lat>`.

For example: `http://localhost:3102/-106.937/34.060`

##### Privacy Concerns

The service supports the `DNT`[https://en.wikipedia.org/wiki/Do_Not_Track] header by looking for one of the following headers:

- `DNT`
- `dnt`
- `do_not_track`

When any of these headers are supplied in the request (with any value), the request log will output `/[removed]/[removed]` instead of the longitude/latitude values.  

#### Configuration

The only available configuration option is the port on which the service runs.  To run on a different port, start with:

`PORT=3103 npm start <path to Who's on First data>`
