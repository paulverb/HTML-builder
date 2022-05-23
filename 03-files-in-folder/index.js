const path = require('path');
const fsp = require('fs/promises');


const folder = path.join(__dirname, 'secret-folder')
const files = [];


async function read () {
  const files = await fsp.readdir(folder, {withFileTypes: true});
  const trueFiles = files.filter((file)=> file.isFile());
  const trueFilesNames = trueFiles.map(file=>file.name);


  trueFilesNames.forEach(async file => {
    let stats = await fsp.stat(path.join(__dirname, 'secret-folder', file));
    console.log(path.parse(file).name + ' - ' + path.parse(file).ext.slice(1) + ' - ' + stats.size + 'b');
  })

}

read()
