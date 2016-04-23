var takeShot = document.getElementById('take-shot');
var shot = document.createElement('img');

takeShot.addEventListener('click', function(e) {
  takeShot.disabled = true;

  fetch('/take-shot')
    .then(function(response) {
      response.json().then(function(json) {
        console.log(json);

        takeShot.disabled = false;

        if(shot.parentNode) {
          shot.parentNode.removeChild(shot);
        }

        if(!json.error) {
          shot.src = '/shot?' + Date.now();

          takeShot.parentNode.appendChild(shot);
        }
      })
    })
});
