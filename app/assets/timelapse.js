var startTimelapse = document.getElementById('start-timelapse');
var stopTimelapse = document.getElementById('stop-timelapse');
var images = document.getElementById('images');

var listing;

function listTimelapse() {
  fetch('/list-timelapse')
    .then(function(response) {
      response.json().then(function(json) {
        json.forEach(function(filename) {
          if(!document.querySelector('img[src="' + filename + '"]')) {
            var img = document.createElement('img');
            img.src = filename;

            images.appendChild(img);
          }
        });
      })
    })
}

listTimelapse();
listing = setInterval(listTimelapse, 5000);

if(startTimelapse && stopTimelapse) {

  startTimelapse.addEventListener('click', function(e) {
    startTimelapse.disabled = true;
    stopTimelapse.disabled = false;

    fetch('/start-timelapse')
      .then(function(response) {
        response.json().then(function(json) {
          console.log(json);
        })
      });
  });

  stopTimelapse.addEventListener('click', function(e) {
    clearInterval(listing);
    startTimelapse.disabled = false;
    stopTimelapse.disabled = true;

    fetch('/stop-timelapse')
      .then(function(response) {
        response.json().then(function(json) {
          console.log(json);
        })
      });
  })
}
