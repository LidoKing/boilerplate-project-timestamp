// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get('/api/:date?', (req, res) => {
  let date = req.params.date;

  if (!date) {
    let current_unix = Date.now();
    let current_utc = new Date().toUTCString();
    res.json({ unix: current_unix, utc: current_utc });
  }

  if (new Date(date) == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    let unix = new Date(date).getTime();
    let utc = new Date(date).toUTCString();
    res.json({ unix: unix, utc: utc });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
