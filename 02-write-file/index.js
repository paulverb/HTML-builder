const fs = require('fs');

const path = require('path');
const readline = require('readline');
const fsp = require('fs/promises');
const file = path.join(__dirname, 'input.txt');


const appendToFile = (line) => {
  fs.appendFile(file, `${line}\n`, err => {
    if (err) {console.log(err);}
  });
};


const rl = readline.createInterface(process.stdin, process.stdout);
console.log('write your input or write "exit" to quit');
fs.open(file, 'a', ()=>{});
rl.on('close', ()=> console.log('goodbye'));
rl.on('line', (line)=>{
  if(line === 'exit'){    
    rl.close();
  }
  else {appendToFile(line);}  
});
