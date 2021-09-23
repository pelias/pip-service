>This repository is part of the [Pelias](https://github.com/pelias/pelias)
>project. Pelias is an open-source, open-data geocoder originally sponsored by
>[Mapzen](https://www.mapzen.com/). Our official user documentation is
>[here](https://github.com/pelias/documentation).

# Pelias Point-in-Polygon Service

## Overview

This service provides Who's on First-based point-in-polygon lookup functionality.

## Requirements

Node.js is required.

See [Pelias software requirements](https://github.com/pelias/documentation/blob/master/requirements.md) for required and recommended versions.

## Installation

```bash
$ git clone git@github.com:pelias/pip-service.git
$ cd pip-service
$ npm install
```

[![NPM](https://nodei.co/npm/pelias-pip-service.png?downloads=true&stars=true)](https://nodei.co/npm/pelias-pip-service)

## NPM Module

The `pelias-pip-service` npm module can be found here:

[https://npmjs.org/package/pelias-pip-service](https://npmjs.org/package/pelias-pip-service)

#### Usage

To start the PiP service, use the start script `./bin/start`, or use `npm start`.

It will look for Who's on First data in the place configured in `pelias.json`.

Requests are made to the endpoint in the format:  `http://localhost:3102/<lon>/<lat>`.

For example: `http://localhost:3102/-106.937/34.060`

#### Downloading data

Because [pelias/whosonfirst](https://github.com/pelias/whosonfirst) is a dependency of this package, its downloader can be used:

`npm run download`

This will download Who's on First data using the same [configuration options](https://github.com/pelias/whosonfirst#downloading-the-data) from `pelias.json` as the whosonfirst downloader.
That means it will automatically put the data in the place the service will expect to load it from.

##### Privacy Concerns

The service supports the [DNT](https://en.wikipedia.org/wiki/Do_Not_Track) header by looking for one of the following headers:

- `DNT`
- `dnt`
- `do_not_track`

When any of these headers are supplied in the request (with any value), the request log will output `/[removed]/[removed]` instead of the longitude/latitude values.

#### Configuration via Environment Variables

The service supports additional environment variables that affect its operation:

| Environment Variable | Default | Description |
| -------------------- | ------- | ----------- |
| `HOST` | `undefined` | The network address that the PiP service will bind to. Defaults to whatever the current Node.js default is, which is currently to listen on `0.0.0.0` (all interfaces). See the [Node.js Net documentation](https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback) for more information. |
| `PORT` | `3102` | The TCP port that the PiP service will use for incoming network connections |
