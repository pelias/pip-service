const ps = require('ps-node');
const path = require('path');

// helper method that combs thru the process list to determine if the pip-service
// is already running
function alreadyRunning(processes) {
  return processes.some((p) => { return parseInt(p.pid) !== parseInt(process.pid); });
}

const datapath = process.argv[2];

ps.lookup({
  command: 'node',
  arguments: [path.basename(__filename), datapath]
}, (err, processes) => {
  if (err) {
    throw new Error( err );
  }

  if (alreadyRunning(processes)) {
    console.error(`pip-service is already running`);
    process.exit(1);
  }

  const app = require('./app')(datapath);
  const port = ( parseInt(process.env.PORT) || 3102 );

  app.listen(port, () => {
    console.log(`pip-service is now running on port ${port}`);
  });

});
