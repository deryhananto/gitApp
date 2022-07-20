const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html")
  // res.send("Server is up and running");
})

app.post ("/", function(req, res){


  const city = req.body.cityName;
  const apiKey = "f1ad6f8ed541802e1a8f4490acf28a57"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      // console.log(desc);
      // console.log(temp);
      res.write("<p>The weather is currently " + desc + "<p>")
      res.write("<h1>The temperatur in  "+ city + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imgurl + ">");
      res.send();

    });

  });

})




app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
