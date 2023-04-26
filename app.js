const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app.html');
});

app.post('/', function(req, res) {
  const apiKey = 'c25d9b190bb4e1f2c742a85f8727f16b';
  const query = req.body.CityName;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=metric';

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      const humidity = weatherData.main.humidity;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.write('<p>The weather is currently ' + weatherDesc + '</p>');
      res.write('<h1>The temperature is ' + temp + '°C</h1>');
      res.write('<p>Minimum temperature: ' + minTemp + '°C</p>');
      res.write('<p>Maximum temperature: ' + maxTemp + '°C</p>');
      res.write('<p>Humidity: ' + humidity + '%</p>');
      res.write('<img src="' + imageUrl + '">');
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000.');
});

  