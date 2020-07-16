const util = require('util');
const app = require('./app')();

try {
  const port = ( parseInt(process.env.PORT) || 3102 );
  const host = process.env.HOST || undefined;

  app.listen(port, host, () => {
    console.log(util.format( 'pip-service is now running on %s:%s', host || '0.0.0.0', port ));
  });

} catch (err) {
  console.error(err);

  // use exitCode to exit safely: https://nodejs.org/api/process.html#process_process_exit_code
  process.exitCode = 1;
  app.close();
}
