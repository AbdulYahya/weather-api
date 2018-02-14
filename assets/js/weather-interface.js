import apiKey from '../.env';

$(function() {
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

    $.ajax({
      url : `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in ${units} is ${response.main.temp}.`);
      },
      error: function() {
        $('#errors').text('There was an error processing your request. Please try again.');
      }
    });
  });
});
