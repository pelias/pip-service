const app = require('express')();
const _ = require('lodash');
const Router = require('express').Router;
const adminLookup = require('pelias-wof-admin-lookup');
const fs = require('fs');
const path = require('path');

const morgan = require( 'morgan' );
const logger = require('pelias-logger').get('pip');
const through = require( 'through2' );

// rewrite originalUrl if the request shouldn't be tracked (the field morgan logs)
const doNotTrack = (req, res, next) => {
  if (req.headers.do_not_track === 'true') {
    req.originalUrl = '/';
  }
  next();
};

const validate = (req, res, next) => {
  req.query.centroid = {
    lat: _.toNumber(req.params.lat),
    lon: _.toNumber(req.params.lon)
  };

  if (!_.isFinite(req.query.centroid.lat) || !_.isFinite(req.query.centroid.lon)) {
    res.status(400).send('Cannot parse input');
    next('route'); // skip lookup middleware and output, still logs
  } else {
    next();
  }

};

function lookup(pointInPoly) {
  return (req, res, next) => {
    pointInPoly.lookup(req.query.centroid, undefined, (err, result) => {
      req.query.resolved = result;
      next();
    });
  };
}

const output = (req, res, next) => {
  res.status(200).send(req.query.resolved);
  next();
};

function log() {
  return morgan('combined', {
    stream: through( function write( ln, _, next ){
      logger.info( ln.toString().trim() );
      next();
    })
  });
}

module.exports = (datapath) => {
  // verify the WOF data structure first (must contain data and meta directories)
  if (!['meta', 'data'].every((sub) => { return fs.existsSync(path.join(datapath, sub)); })) {
    throw Error(`${datapath} does not contain Who's on First data`);
  }

  const pointInPoly = adminLookup.resolver(datapath);

  const router = new Router();
  router.get('/:lon/:lat', doNotTrack, validate, lookup(pointInPoly), output);

  app.use(log(), router);
  return app;

};
