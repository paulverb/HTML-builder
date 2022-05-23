const fsp = require('fs/promises');
const path = require('path');


const buildPage = async () => {
  fsp.mkdir(path.join(__dirname, 'project-dist'), {recursive:true});
  const components = await fsp.readdir(path.join(__dirname, 'components'));
  let oldHtml = await fsp.readFile(path.join(__dirname, 'template.html'))+'';
  let newHtml = oldHtml;


  components.forEach(async (component)=>{
    const componentName = component.replace(/\.html$/, '');    
    const componentHtml = await fsp.readFile(path.join(__dirname, 'components', `${component}`))+'';
    newHtml = newHtml.replace(`\{\{${componentName}\}\}`, componentHtml);
    fsp.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newHtml);

  })


}

const readFiles = async () => {
  const stylesFolder = path.join(__dirname, 'styles')
  const files = await fsp.readdir(stylesFolder);
  const cssFiles = files.filter(file=> path.parse(path.join(stylesFolder, file)).ext.slice(1) === 'css');  
  cssFiles.forEach(async file => {
    buffer = await fsp.readFile(path.join(stylesFolder, file));
    fsp.writeFile(path.join(__dirname, 'project-dist', 'style.css'), ''+buffer, {flag:'a'});
})
}




async function copyDir(src,dest) {
  const entries = await fsp.readdir(src, {withFileTypes: true});
  await fsp.mkdir(dest);
  for(let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if(entry.isDirectory()) {
          await copyDir(srcPath, destPath);
      } else {
          await fsp.copyFile(srcPath, destPath);
      }
  }
}

const combineAll = async () =>{
  try {
    await fsp.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true })
    await buildPage();
    await readFiles();
    await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  } catch(err) {}
}

combineAll();
