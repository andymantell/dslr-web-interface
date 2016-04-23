var fs = require('fs');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var sharp = require('sharp');
var path = require('path');

var timelapse;

mkdirp.sync('images');
mkdirp.sync('thumbs');

function takeShot() {
  var filename = 'images/' + Date.now() + '.jpg';

  child = exec('gphoto2 --capture-image-and-download --force-overwrite --filename=' + filename, function(error, stdout, stderr) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error !== null) {
      console.log(`exec error: ${error}`);
    } else {
      console.log('shot taken');
    }

    // console.log(path.join(__dirname, '..', filename));

    filePath =  path.join(__dirname, '..', filename);
    outPath =  path.join(__dirname, '../thumbs', path.basename(filename));

    console.log(filePath, outPath);

    if(fs.existsSync(filePath)) {
      sharp(filename)
        .resize(300)
        .toFile(outPath, function(err) {
          if(err) {
            throw err;
          }

          console.log(filename + ' resized');
        })
    }
  });
}

function start() {
  takeShot();
  timelapse = setInterval(takeShot, 10000);
}

function stop() {
  clearInterval(timelapse);
}

function isRunning() {
  return timelapse === null;
}

module.exports = {
  start: start,
  stop: stop,
  isRunning: isRunning
};
