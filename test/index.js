const tape = require('tape');
const proxyquire = require('proxyquire').noCallThru();

// THIS TEST MUST RUN FIRST SINCE THE SECOND TEST MODIFIES THE PROCESS ENVIRONMENT
tape('default port', (test) => {
  test.test('port not specified in environment should listen on port 3102', (t) => {
    proxyquire('../index', {
      './app': () => {
        return {
          listen: (port) => {
            t.equals(port, 3102);
            t.end();
          }
        };
      }
    });

  });

});

// THIS TEST MUST RUN SECOND SINCE IT MODIFIES THE PROCESS ENVIRONMENT
tape('environment-specified port', (test) => {
  test.test('port specified in environment should listen on that port', (t) => {
    process.env.PORT = 8080;

    proxyquire('../index', {
      './app': () => {
        return {
          listen: (port) => {
            t.equals(port, 8080);
            t.end();
          }
        };
      }
    });

  });

});
