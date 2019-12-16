const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { watch } = require('chokidar');

const directoryPath = path.resolve(__dirname, 'dir');
const linkedDirectoryPath = path.resolve(__dirname, 'dir-linked');
const subDirectoryPath = path.resolve(linkedDirectoryPath, 'sub');
const filePath = path.resolve(subDirectoryPath, 'file');

const chokidarOptions = { ignoreInitial: false, usePolling: true, depth: 2 };

init();
const watcher = watch(linkedDirectoryPath, chokidarOptions);
watcher.on('all', (eventName, itemPath) => {
  console.log(`${eventName}: ${itemPath}`);
});

(async() => {
  try {
    await delay();
    add();
    await delay();
    remove();
    await delay();
    add();
  }
  catch (e) {
    console.error(e);
  }
})();

async function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
  if (fs.existsSync(linkedDirectoryPath)) {
    rimraf.sync(linkedDirectoryPath);
  }
  if (fs.existsSync(directoryPath)) {
    rimraf.sync(directoryPath);
  }
  fs.mkdirSync(directoryPath);
  fs.symlinkSync(directoryPath, linkedDirectoryPath);
}

function add() {
  fs.mkdirSync(subDirectoryPath);
  fs.writeFileSync(filePath, 'hello world');
}

function remove() {
  rimraf.sync(subDirectoryPath);
}
