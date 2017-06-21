const fs = require('fs');

if (!fs.existsSync('env.json')) {
  fs.writeFileSync('env.json', fs.readFileSync('env.json.example'));

  process.stdout.write('Created env.json.\n');
}
