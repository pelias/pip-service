<p align="center">
  <img height="100" src="https://raw.githubusercontent.com/pelias/design/master/logo/pelias_github/Github_markdown_hero.png">
</p>
<h3 align="center">A modular, open-source search engine for our world.</h3>
<p align="center">Pelias is a geocoder powered completely by open data, available freely to everyone.</p>
<p align="center">
<a href="https://github.com/pelias/pip-service/actions"><img src="https://github.com/pelias/pip-service/workflows/Continuous%20Integration/badge.svg" /></a>
<a href="https://en.wikipedia.org/wiki/MIT_License"><img src="https://img.shields.io/github/license/pelias/pip-service?style=flat&color=orange" /></a>
<a href="https://hub.docker.com/u/pelias"><img src="https://img.shields.io/docker/pulls/pelias/pip-service?style=flat&color=informational" /></a>
<a href="https://gitter.im/pelias/pelias"><img src="https://img.shields.io/gitter/room/pelias/pelias?style=flat&color=yellow" /></a>
</p>
<p align="center">
	<a href="https://github.com/pelias/docker">Local Installation</a> ·
        <a href="https://geocode.earth">Cloud Webservice</a> ·
	<a href="https://github.com/pelias/documentation">Documentation</a> ·
	<a href="https://gitter.im/pelias/pelias">Community Chat</a>
</p>
<details open>
<summary>What is Pelias?</summary>
<br />
Pelias is a search engine for places worldwide, powered by open data. It turns addresses and place names into geographic coordinates, and turns geographic coordinates into places and addresses. With Pelias, you're able to turn your users' place searches into actionable geodata and transform your geodata into real places.
<br /><br />
We think open data, open source, and open strategy win over proprietary solutions at any part of the stack and we want to ensure the services we offer are in line with that vision. We believe that an open geocoder improves over the long-term only if the community can incorporate truly representative local knowledge.
</details>

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
