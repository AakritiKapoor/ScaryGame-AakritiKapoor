const express = require('express');
const bodyParser = require("body-parser");
const Game = require("./Elevator");

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

let oGame={};
app.post("/sms", (req, res)=>{
    res.setHeader('content-type', 'text/xml');
    let sFrom = req.body.From || req.body.from;
    if(!(sFrom in oGame)){
        oGame[sFrom]=new Game();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aResponse= oGame[sFrom].takeATurn(sMessage);
    let sResponse="<Response>";
    for(let n=0;n<aResponse.length;n++){
        sResponse +="<Message>"+aResponse[n]+"</Message>";
    }
    sResponse +="<Message>" + oGame[sFrom].prompt()+"</Message>";
    res.end(sResponse+"</Response>");
    if(oGame[sFrom].isDone()){
        delete oGame[sFrom];
    }
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));