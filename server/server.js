var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const geolib = require('geolib');
var app = express();
app.use(cors());
app.use(bodyParser.json());
var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;
var kml = new DOMParser().parseFromString(fs.readFileSync('geo.kml', 'utf8'));
var converted = tj.kml(kml);

var server = app.listen(2000, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

app.get("/", function(req, res) {
    res.send('api are working');
});

app.get("/coordinates", (async(req, res)=>{
    let params = req.query;
    try{
        let restaurant = await findPoint(params.lat, params.long, jsonData.features);
        if(restaurant.length > 0){
            if(restaurant[0].dist > 1500){
                res.json({
                    message : "Not found"
                });
            }
            else{
                res.json({
                    data : restaurant[0]
                })
            }
        }
        else{
            res.json({
                message : "Not found"
            });
        }
    }
    catch(err){
        res.json({
            message : err
        });
    }
}))

let jsonData = JSON.parse(fs.readFileSync('geo.json', 'utf8'));
// console.log(jsonData.features)

const findPoint = ((lat, long, geoData)=>{
    return new Promise((resolve, reject)=>{
        let closesetDis = [];
        for(let i = 0; i < geoData.length; i++){
            if(geoData[i].geometry.type == "Polygon"){
                let coordinates = geoData[i].geometry.coordinates[0];
                let coordinatesLen = geoData[i].geometry.coordinates[0].length;
                for(let m = 0; m < coordinatesLen; m++){
                    let current = {
                        latitude : lat,
                        longitude : long
                    }
                    let kml = {
                        latitude : coordinates[m][1],
                        longitude : coordinates[m][0]
                    }
                    let dist = geolib.getDistance(current, kml);
                    let obj = {
                        name : geoData[i].properties.name,
                        dist : dist
                    }
                    closesetDis.push(obj);
                }
            }
        }
        let sorted = closesetDis.sort((a,b)=> {
            return a.dist - b.dist;
        })
        resolve(sorted);
    })   
})