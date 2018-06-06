const { handler } = require('../src/index');

const argv = require('yargs').argv;

handler({ name: argv.name }, {}, (err, data) => {
  if (err) {
    console.log(`ERROR: ${err}`);
    return;
  }

  console.log(`DATA: ${data}`);
});
