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

    let request = new XMLHttpRequest();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in ${units} is ${response.main.temp}.`);
    };

  });
});
