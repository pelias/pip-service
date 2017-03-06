const app = require('express')();
const _ = require('lodash');
const Router = require('express').Router;
const pointInPoly = require('pelias-wof-admin-lookup').resolver();

const validate = (req, res, next) => {
  req.query.centroid = {
    lat: _.toNumber(req.params.lat),
    lon: _.toNumber(req.params.lon)
  };

  if (!_.isFinite(req.query.centroid.lat) || !_.isFinite(req.query.centroid.lon)) {
    res.status(400).send('Cannot parse input');
    // skip lookup middleware
    next('route');
  } else {
    next();
  }

};

const lookup = (req, res, next) => {
  pointInPoly.lookup(req.query.centroid, undefined, (err, result) => {
    req.query.resolved = result;
    next();
  });
}

const output = (req, res, next) => {
  res.send(req.query.resolved);
  next();
}

var router = Router();
router.get('/:lon/:lat', validate, lookup, output);

app.use(router);

module.exports = app;
