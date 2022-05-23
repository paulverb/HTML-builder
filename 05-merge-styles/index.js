const fsp = require('fs/promises');
const fs = require('fs')
const path = require('path');



const readFiles = async () => {
  const stylesFolder = path.join(__dirname, 'styles')
  const files = await fsp.readdir(stylesFolder);
  const cssFiles = files.filter(file=> path.parse(path.join(stylesFolder, file)).ext.slice(1) === 'css');
  cssFiles.forEach(async file => {
    buffer = await fsp.readFile(path.join(stylesFolder, file));
    fsp.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), ''+buffer, {flag:'a'});
})
}


readFiles();
