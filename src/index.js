const path = require('path');
const { spawn } = require('child_process');

exports.handler = function (event, context, callback) {
  let executable;
  if (typeof event.name === 'undefined') {
    executable = spawn(path.join(__dirname, 'bin', 'executable'));
  } else {
    executable = spawn(path.join(__dirname, 'bin', 'executable'), [event.name]);
  }

  executable.stdout.on('data', (data) => {
    const output = Buffer.from(data, 'base64').toString('utf8');
    console.log(`stdout: ${output}`);
    callback(null, data);
  });

  executable.stderr.on('data', (data) => {
    const output = Buffer.from(data, 'base64').toString('utf8');
    console.log(`stderr: ${output}`);
    callback(data);
  });
};
