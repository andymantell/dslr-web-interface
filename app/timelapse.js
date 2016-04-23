var fs = require('fs');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');

mkdirp.sync('images');

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
  });
}

takeShot();
setInterval(takeShot, 5000);
