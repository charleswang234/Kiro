// const express = require("express");
// const app = express();
// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const PORT = 3001;


// require("dotenv").config();

// var knex = require("knex")({
//   client: "pg",
//   connection: {
//     host : "127.0.0.1",
//     user : process.env.DB_USERNAME,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
//   }
// });
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({
//     type: 'application / vnd.api + json'
// }));
// app.use(fileUpload());
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());

// const routes = require('./routes.js')(app);

// app.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// })


const request = require("request");
const https = require('https')


  
function getToken () {

  let options = { method: 'POST',
  url: 'https://lhl.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"","client_secret":"","audience":"https://lhl.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  let fullToken = JSON.parse(body)
  let token = JSON.parse(body).access_token
  let JWTAUTH = `Bearer ${token}`
  console.log(JWTAUTH)

  let options2 = { method: 'GET',
    hostname: "lhl.auth0.com",
    path: '/api/v2/users',
    scope: 'openid profile',
    headers: { authorization: JWTAUTH}
  }
    
  const req = https.request(options2, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
});

}

// getToken ()
  



// working fetch


  var options = { method: 'GET',
  url: 'https://lhl.auth0.com/api/v2/users',
  headers: { authorization: `Bearer `}
  }

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  let bodyArr = JSON.parse(body)
  bodyArr.forEach( e => {
    console.log(e.user_metadata)
    console.log(e.user_ id)
  })
});




