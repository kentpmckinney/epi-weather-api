import $ from 'jquery';
import './style.css';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    let city = $('#location').val();
    $('#location').val("");

    (async () => {
      try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=129d36f95d0264a22fce62f61459dad0`);
        let jsonifiedResponse;
        if (response.ok && response.status === 200) {
          jsonifiedResponse = await response.json();
        } else {
          jsonifiedResponse = false;
        }
        getElements(jsonifiedResponse);
      } catch (e) {
        getElements(false);
      }
    })();

    const getElements = function (response) {
      if (response) {
        $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      } else {
        $('.showHumidity').text(`There was an error handling your request.`);
        $('.showTemp').text(`Please check your inputs and try again!`);
      }
    };
  });
});

/*

	$('#weather-button').click(function() {
		const city = $('#weather-input').val();
		(async () => {
			try {
				let response = await fetch(
					`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`
				);
				let jsonifiedResponse;
				if (response.ok && response.status === 200) {
					jsonifiedResponse = await response.json();
				} else {
					jsonifiedResponse = false;
				}
				$('#results').append(jsonifiedResponse.weather[0].description);
			} catch (e) {
				alert(e.message);
			}
		})();
	});

*/
