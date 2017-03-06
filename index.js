const app = require('./app');
const port = ( parseInt(process.env.PORT) || 3102 );

app.listen(port, () => {
  console.log(`pip-service is now running on port ${port}`);
});
