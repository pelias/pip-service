const app = require('./app')();

try {
  const port = ( parseInt(process.env.PORT) || 3102 );

  app.listen(port, () => {
    console.log(`pip-service is now running on port ${port}`);
  });

} catch (err) {
  console.error(err);

  // use exitCode to exit safely: https://nodejs.org/api/process.html#process_process_exit_code
  process.exitCode = 1;
  app.close();
}
