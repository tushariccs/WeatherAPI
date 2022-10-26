const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");
const port = 3000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//for taking value from html elements with name attribute
app.post("/", (req, res) => {
  const query = req.body.CityName;

  const appid = "706a659514f1c8e26247274e21412ad1";
  const units = "metric";
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      appid +
      "&units=" +
      units,
    (response) => {
      console.log(response.statusCode);
      // if we have any typing mistake in endpoints it will return 404 .
      // if we have any typing mistake in appid parameters will return 401 i.e unauthorized user accessed  .
      response.on("data", (data) => {
        const weatherData = JSON.parse(data); //converts the data in format of JSON object
        // A common use of JSON is to exchange data to / from a web server.

        // When receiving data from a web server, the data is always a string.

        // Parse the data with JSON.parse(), and the data becomes a JavaScript object.

        //console.log(weatherData);
        const temp1 = JSON.stringify(weatherData); //JSON Java Object is converted into String.
        //console.log(temp1);
        const temp = weatherData.main.temp;
        //console.log(temp);
        const feelTemperature = weatherData.main.feels_like;
        //console.log(feelTemperature);
        const WeatherDescription = weatherData.weather[0].description;
        //console.log(WeatherDescription);
        const name = weatherData.name;
        const icon = weatherData.weather[0].icon;
        const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // res.write("<p1>" + temp1 + "</p1>");
        res.write(
          "<h1>" +
            "The temperature at " +
            name +
            " is " +
            temp +
            " Degree Celcius " +
            " and feels like " +
            feelTemperature +
            " Degree Celcius " +
            " weather is like " +
            WeatherDescription +
            "</h1>"
        );
        res.write("<img src=" + url + ">");
        res.send();
      });
    }
  );
});

app.listen(port, (req, res) => {
  console.log("Server is running at port " + port);
});

// const query = "Amaravati";
// const appid = "706a659514f1c8e26247274e21412ad1";
// const units = "metric";
// https.get(
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//     query +
//     "&appid=" +
//     appid +
//     "&units=" +
//     units,
//   (response) => {
//     console.log(response.statusCode);
// if we have any typing mistake in endpoints it will return 404 .
//if we have any typing mistake in appid parameters will return 401 i.e unauthorized user accessed  .
//     response.on("data", (data) => {
//       const weatherData = JSON.parse(data); //converts the data in format of JSON object
//A common use of JSON is to exchange data to / from a web server.

// When receiving data from a web server, the data is always a string.

// Parse the data with JSON.parse(), and the data becomes a JavaScript object.

//       console.log(weatherData);
//       const temp1 = JSON.stringify(weatherData); //JSON Java Object is converted into String.
// console.log(temp1);
//       const temp = weatherData.main.temp;
// console.log(temp);
//       const feelTemperature = weatherData.main.feels_like;
// console.log(feelTemperature);
//       const WeatherDescription = weatherData.weather[0].description;
// console.log(WeatherDescription);
//       const name = weatherData.name;
//       const icon = weatherData.weather[0].icon;
//       const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//       // res.write("<p1>" + temp1 + "</p1>");
//       res.write(
//         "<h1>" +
//           "The temperature at " +
//           name +
//           " is " +
//           temp +
//           " Degree Celcius " +
//           " and feels like " +
//           feelTemperature +
//           " Degree Celcius " +
//           " weather is like " +
//           WeatherDescription +
//           "</h1>"
//       );
//       res.write("<img src=" + url + ">");
//       res.send();
//     });
//   }
// );

// app.use();
