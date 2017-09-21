'use strict';
const http = require('http');
const mysql      = require('mysql');
exports.ai_storeprice = (req, res) => {
  // Get the zone and date from the request
  let zone =  "India";
  //req.body.result.parameters['shipping-zone']; // shipping zone is a required param
 
 let cost = {'Europe':100, 'North America':200, 'South America':300, 'Asia':400, 'Africa':500}
 
 
  // Call the Zone API
  callZoneApi(zone).then((output) => {
    // Return the results of the Zone API to API.AI
    res.status(200).send('ok');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
  }).catch((error) => {
    // If there is an error let the user know
  //  res.setHeader('Content-Type', 'application/json');
 //   res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
};
function callZoneApi (zone) {
    
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the Zone
    try {
      
              var connection = mysql.createConnection({
                  host: "183.82.98.147",
                  user: "talk",
                  password: "talk@123",
                  database: "talk"
              });
      let myquery = 'SELECT ShippingPrice as solution FROM talk.Demo_Zone where zone ="'+ zone + '"';
      console.log(myquery);
              connection.query(myquery, function (error, results, fields) {
                  if (!error) {
                    
                      let response = "The cost of shipping to " + zone + " is " +  results[0].solution + " euros."
                      // "The solution is: " + results[0].solution;
                      response = response.toString();
                      let output = {'speech': response, 'displayText': response};
                      console.log(output);
                      resolve(output);
      
                  } else {
      
                      let output = {'speech': 'Error. Query Failed.', 'displayText': 'Error. Query Failed.'};
                      console.log(error);
                      reject(output);
      
                  }
              });
              connection.end();
      
          } catch (err) {
              let output = {'speech': 'try-cacth block error', 'displayText': 'try-cacth block error'};
              console.log(output);
              reject(output);
      
          }
  });
}
