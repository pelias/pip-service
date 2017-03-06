> This repository is part of the [Pelias](https://github.com/pelias/pelias) project. Pelias is an open-source, open-data geocoder built by [Mapzen](https://www.mapzen.com/) that also powers [Mapzen Search](https://mapzen.com/projects/search). Our official user documentation is [here](https://mapzen.com/documentation/search/).

# Pelias Point-in-Polygon Service

![Travis CI Status](https://travis-ci.org/pelias/pip-service.svg)
[![Gitter Chat](https://badges.gitter.im/pelias/pelias.svg)](https://gitter.im/pelias/pelias?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Overview

This service provides Who's on First-based point-in-polygon lookup functionality.  

## Installation

```bash
$ npm install pelias-pip-service
```

[![NPM](https://nodei.co/npm/pelias-pip-service.png?downloads=true&stars=true)](https://nodei.co/npm/pelias-pip-service)

## NPM Module

The `pelias-pip-service` npm module can be found here:

[https://npmjs.org/package/pelias-pip-service](https://npmjs.org/package/pelias-pip-service)

#### Usage

To start the PiP service, type: `npm start`.  By default, the service starts on port 3102.  

Requests are made to the endpoint in the format:  `http://localhost:3102/<lon>/<lat>`.

For example: `http://localhost:3102/-106.937/34.060`

#### Configuration

The only available configuration option is the port on which the service runs.  To run on a different port, start with:

`PORT=3103 npm start`
