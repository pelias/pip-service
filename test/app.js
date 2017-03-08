const tape = require('tape');
const request = require('request');
const proxyquire = require('proxyquire').noCallThru();

tape('entry point tests', (test) => {
  test.test('valid lat/lon should call lookup and return result', (t) => {
    const app = proxyquire('../app', {
      'pelias-wof-admin-lookup': {
        resolver: (datapath) => {
          t.equals(datapath, 'this is the datapath');
          return {
            lookup: (centroid, layers, callback) => {
              t.deepEquals(centroid, { lat: 12.121212, lon: 21.212121 });
              t.deepEquals(layers, undefined);
              callback(undefined, 'this is the result');
            }
          };
        }
      }
    })('this is the datapath');
    const server = app.listen();
    const port = server.address().port;

    request.get(`http://localhost:${port}/21.212121/12.121212`, (err, response, body) => {
      t.notOk(err);
      t.equals(response.statusCode, 200);
      t.equals(body, 'this is the result');
      t.end();
      server.close();

    });

  });

  test.test('request not matching desired path should return 404', (t) => {
    const app = proxyquire('../app', {
      'pelias-wof-admin-lookup': {
        resolver: (datapath) => {
          t.equals(datapath, 'this is the datapath');
          return {
            lookup: () => {
              throw Error('lookup should not have been called');
            }
          };
        }
      }
    })('this is the datapath');
    const server = app.listen();
    const port = server.address().port;

    request.get(`http://localhost:${port}/21.212121`, (err, response, body) => {
      t.notOk(err);
      t.equals(response.statusCode, 404);
      t.end();
      server.close();

    });

  });

  ['a', NaN, Infinity, {}, false, null, undefined].forEach((bad_lat_value) => {
    test.test('non-finite lat should return 400', (t) => {
      const app = proxyquire('../app', {
        'pelias-wof-admin-lookup': {
          resolver: (datapath) => {
            t.equals(datapath, 'this is the datapath');
            return {
              lookup: () => {
                throw Error('lookup should not have been called');
              }
            };
          }
        }
      })('this is the datapath');
      const server = app.listen();
      const port = server.address().port;

      request.get(`http://localhost:${port}/21.212121/${bad_lat_value}`, (err, response, body) => {
        t.notOk(err);
        t.equals(response.statusCode, 400);
        t.equals(body, 'Cannot parse input');
        t.end();
        server.close();

      });

    });

  });

  ['a', NaN, Infinity, {}, false, null, undefined].forEach((bad_lon_value) => {
    test.test('non-finite lon should return 400', (t) => {
      const app = proxyquire('../app', {
        'pelias-wof-admin-lookup': {
          resolver: (datapath) => {
            t.equals(datapath, 'this is the datapath');
            return {
              lookup: () => {
                throw Error('lookup should not have been called');
              }
            };
          }
        }
      })('this is the datapath');
      const server = app.listen();
      const port = server.address().port;

      request.get(`http://localhost:${port}/${bad_lon_value}/12.121212`, (err, response, body) => {
        t.notOk(err);
        t.equals(response.statusCode, 400);
        t.equals(body, 'Cannot parse input');
        t.end();
        server.close();

      });

    });

  });


});
