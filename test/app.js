const tape = require('tape');
const request = require('request');
const proxyquire = require('proxyquire').noCallThru();
const fs = require('fs');
const path = require('path');
const temp = require('temp').track();

tape('entry point tests', (test) => {
  test.test('valid lat/lon should call lookup and return result', (t) => {

    temp.mkdir('whosonfirst', (err, temp_dir) => {
      t.notOk(err);

      fs.mkdirSync(path.join(temp_dir, 'data'));
      fs.mkdirSync(path.join(temp_dir, 'meta'));

      const app = proxyquire('../app', {
        'pelias-wof-admin-lookup': {
          resolver: (datapath) => {
            t.equals(datapath, temp_dir);
            return {
              lookup: (centroid, layers, callback) => {
                t.deepEquals(centroid, { lat: 12.121212, lon: 21.212121 });
                t.deepEquals(layers, undefined);
                callback(undefined, 'this is the result');
              }
            };
          }
        }
      })(temp_dir);
      const server = app.listen();
      const port = server.address().port;

      request.get(`http://localhost:${port}/21.212121/12.121212`, (err, response, body) => {
        t.notOk(err);
        t.equals(response.statusCode, 200);
        t.equals(body, 'this is the result');
        t.end();
        server.close();
        temp.cleanupSync();

      });

    });

  });

  test.test('request not matching desired path should return 404', (t) => {
    temp.mkdir('whosonfirst', (err, temp_dir) => {
      t.notOk(err);

      fs.mkdirSync(path.join(temp_dir, 'data'));
      fs.mkdirSync(path.join(temp_dir, 'meta'));

      const app = proxyquire('../app', {
        'pelias-wof-admin-lookup': {
          resolver: (datapath) => {
            t.equals(datapath, temp_dir);
            return {
              lookup: () => {
                throw Error('lookup should not have been called');
              }
            };
          }
        }
      })(temp_dir);
      const server = app.listen();
      const port = server.address().port;

      request.get(`http://localhost:${port}/21.212121`, (err, response, body) => {
        t.notOk(err);
        t.equals(response.statusCode, 404);
        t.end();
        server.close();
        temp.cleanupSync();

      });

    });

  });

  ['a', NaN, Infinity, {}, false, null, undefined].forEach((bad_lat_value) => {
    test.test('non-finite lat should return 400', (t) => {
      temp.mkdir('whosonfirst', (err, temp_dir) => {
        t.notOk(err);

        fs.mkdirSync(path.join(temp_dir, 'data'));
        fs.mkdirSync(path.join(temp_dir, 'meta'));

        const app = proxyquire('../app', {
          'pelias-wof-admin-lookup': {
            resolver: (datapath) => {
              t.equals(datapath, temp_dir);
              return {
                lookup: () => {
                  throw Error('lookup should not have been called');
                }
              };
            }
          }
        })(temp_dir);
        const server = app.listen();
        const port = server.address().port;

        request.get(`http://localhost:${port}/21.212121/${bad_lat_value}`, (err, response, body) => {
          t.notOk(err);
          t.equals(response.statusCode, 400);
          t.equals(body, 'Cannot parse input');
          t.end();
          server.close();
          temp.cleanupSync();

        });

      });

    });

  });

  ['a', NaN, Infinity, {}, false, null, undefined].forEach((bad_lon_value) => {
    test.test('non-finite lon should return 400', (t) => {
      temp.mkdir('whosonfirst', (err, temp_dir) => {
        t.notOk(err);

        fs.mkdirSync(path.join(temp_dir, 'data'));
        fs.mkdirSync(path.join(temp_dir, 'meta'));

        const app = proxyquire('../app', {
          'pelias-wof-admin-lookup': {
            resolver: (datapath) => {
              t.equals(datapath, temp_dir);
              return {
                lookup: () => {
                  throw Error('lookup should not have been called');
                }
              };
            }
          }
        })(temp_dir);
        const server = app.listen();
        const port = server.address().port;

        request.get(`http://localhost:${port}/${bad_lon_value}/12.121212`, (err, response, body) => {
          t.notOk(err);
          t.equals(response.statusCode, 400);
          t.equals(body, 'Cannot parse input');
          t.end();
          server.close();
          temp.cleanupSync();

        });

      });

    });

  });

  test.test('non-existent whosonfirst directory should throw error', (t) => {
    t.throws(() => {
      proxyquire('../app', {
        'pelias-wof-admin-lookup': {
          resolver: (datapath) => {
            throw Error('resolver() should not have been called');
          }
        }
      })('directory_that_does_not_exist');

    }, /directory_that_does_not_exist does not contain Who's on First data/);

    t.end();

  });

  test.test('non-existent whosonfirst/data directory should throw error', (t) => {
    temp.mkdir('whosonfirst', (err, temp_dir) => {
      t.throws(() => {
        fs.mkdirSync(path.join(temp_dir, 'meta'));

        const app = proxyquire('../app', {
          'pelias-wof-admin-lookup': {
            resolver: (datapath) => {
              throw Error('resolver() should not have been called');
            }
          }
        })(temp_dir);

      }, new RegExp(`${temp_dir} does not contain Who's on First data`));

      t.end();
      temp.cleanupSync();

    });

  });

  test.test('non-existent whosonfirst/meta directory should throw error', (t) => {
    temp.mkdir('whosonfirst', (err, temp_dir) => {
      t.throws(() => {
        fs.mkdirSync(path.join(temp_dir, 'data'));

        const app = proxyquire('../app', {
          'pelias-wof-admin-lookup': {
            resolver: (datapath) => {
              throw Error('resolver() should not have been called');
            }
          }
        })(temp_dir);

      }, new RegExp(`${temp_dir} does not contain Who's on First data`));

      t.end();
      temp.cleanupSync();

    });

  });

});
