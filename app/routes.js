var express = require('express');
var router = express.Router();
var glob = require('glob');
var path = require('path');

var timelapse = require('./timelapse');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/timelapse', function (req, res) {
  res.render('timelapse');
});

router.use('/shot', express.static('./capt0000.jpg'));

router.get('/take-shot', function(req, res) {
  var fs = require('fs');
  var exec = require('child_process').exec;

  // child = exec('gphoto2 --capture-image-and-download',
  child = exec('gphoto2 --capture-image-and-download --force-overwrite', function(error, stdout, stderr) {
  // child = exec('gphoto2 --show-preview', function(error, stdout, stderr) {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      if (error !== null) {
        console.log(`exec error: ${error}`);
        res.json({'error': true});
      } else {
        res.json({'status': 'shot taken'});
      }

  });

});







router.get('/start-timelapse', function(req, res) {
  if(!timelapse.isRunning()) {
    timelapse.start();
    res.json({'status': 'timelapse started'});
  }
});

router.get('/stop-timelapse', function(req, res) {
  timelapse.stop();
  res.json({'status': 'timelapse stopped'});
});

router.get('/list-timelapse', function(req, res) {
  glob('thumbs/**/*.jpg', function(err, files) {
    if(err) {
      throw err;
    }

    files.forEach(function(filename, index) {
      files[index] = path.relative('.', filename);
    });

    res.json(files);
  })
});

module.exports = router;
