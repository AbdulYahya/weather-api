import apiKey from '../.env';

console.warn(`The apiKey is: ${apiKey}`);

$(document).ready(function() {
  $('#weatherLocation').submit(function(event) {
    event.preventDefault();
    let city = $('#inline-location').val();
    let unit = $('#inline-units').val();
    let units = '';

    switch (unit) {
      case '':
        units = "Kelvin";
        break;
      case 'imperial':
        units = "Fahrenheit";
        break;
      case 'metric':
        units = "Celcius";
        break;
    }

    $('#inline-location').val('');
    $('#inline-units').val('');
    $('#errors').text('');

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);

      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in ${units} is ${body.main.temp}.`);
    }, function(error) {
      $('#errors').text(`There was an error processing your request: ${error.message}. Please try again`);
    });
  });
});
