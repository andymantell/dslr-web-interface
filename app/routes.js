var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
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

module.exports = router;
