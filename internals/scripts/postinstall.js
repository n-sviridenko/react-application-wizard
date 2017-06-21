const fs = require('fs');

['env.json', 'db.json'].forEach((fileName) => {
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, fs.readFileSync(`${fileName}.example`));

    process.stdout.write(`Created ${fileName}.\n`);
  }
});
