const app = require('express')();
const _ = require('lodash');
const Router = require('express').Router;
const adminLookup = require('pelias-wof-admin-lookup');

const validate = (req, res, next) => {
  req.query.centroid = {
    lat: _.toNumber(req.params.lat),
    lon: _.toNumber(req.params.lon)
  };

  if (!_.isFinite(req.query.centroid.lat) || !_.isFinite(req.query.centroid.lon)) {
    res.status(400).send('Cannot parse input');
    next('route'); // skip lookup middleware
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
  res.send(req.query.resolved);
  next();
};

module.exports = (datapath) => {
  const pointInPoly = adminLookup.resolver(datapath);

  const router = new Router();
  router.get('/:lon/:lat', validate, lookup(pointInPoly), output);

  app.use(router);
  return app;

};
