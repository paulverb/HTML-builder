const fsp = require('fs/promises')
const path = require('path');


async function copyDir(){
  try {    
    const oldFolder = path.join(__dirname, 'files-copy');
    await fsp.rmdir(oldFolder, {recursive:true});
  } catch(err) {}
    
  const folderPath = path.join(__dirname, 'files-copy');
  fsp.mkdir(folderPath, {recursive:true});
  const files = await fsp.readdir(path.join(__dirname, 'files'));
  files.forEach(file=> fsp.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file)))
}


copyDir()

