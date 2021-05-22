
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post("/", (req, res) => {

    // const body = JSON.parse(JSON.stringify(req.body));
    
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=YCZ9WOOOQ2UGU5TJ`;
    
    console.log(API_Call)
    fetch(API_Call)
    .then(
      function(response) {
        return response.json();
      }
    )  
    const data = await request.json();
    console.log(data);
    
    
});
let port = process.env.PORT;

if(port == null || port == "") {
 port = 5000;
}
app.listen(port, function() {
 console.log("Server started successfully https//localhost:${}",port);
});