'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const https = require('https');
var encoding = require("encoding");

//var sleep = require('sleep');




process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

//const changthongDB = require('./db.json')


app.set('port', (process.env.PORT || 5000)) 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


var token = process.env.TOKEN

var iiddd = "";
var name = "";
var pictureUrl = "";

var headers = {
    'Authorization' : 'Bearer 3ElmV4hWhjHccuz34k3WUfm6MgrU3BmEkfYLIuPsfx/umpaLjWeLBXiXmGDAFgE+d2i0dO3htzvRV676dcTLV2wiaS29rfM26RIdDcvOBAKTDEVc2oavzhgZF5nApE/NGkuc81tGAKdq+ubskwLQS1GUYhWQfeY8sLGRXgo3xvw='
}




app.get('/', (req, res) => {
  res.end("ok")
})







app.post("/webhook", function (req, res) {



var data = req.body;    

   iiddd = req.body.originalDetectIntentRequest.payload.source.userId; 
    //iiddd = req.body.originalRequest.data.source.userId; 
//console.log(JSON.stringify(data));
console.log("uID -------------- : " + JSON.stringify(iiddd))

//ส่ง uid ไปไว้
//request("https://docs.google.com/forms/u/2/d/1TX5G9W93A3r3qX29TDCZ-I5UQ7ek1nKpbRE99_IUUn0/formResponse?ifq&entry.815062337="+iiddd+"&submit=Submit");


var options = {
    url: 'https://api.line.me/v2/bot/profile/'+iiddd,
    method: 'GET',
    headers: headers,

}


    // เช็คโปรไฟล์
 request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        name = info.displayName;
        pictureUrl = info.pictureUrl;

//var Uu = '"'+iiddd+'"'   // แปลง ID
var printdd =  "{ id: "+iiddd+", name: "+name+" }" 
console.log(printdd)



// เช็คว่ามีแต้ม มีข้อมูลไหม
  var check = "https://script.google.com/macros/s/AKfycbyXrseloGIis7XG7B1WLtGVlbQlSJsu81WKviYZpEfSusomKvZq/exec?id="+iiddd;

 request(check, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        
   console.log("values : "+body);
      
        if(body>= 10){
var ppoint  = body;
console.log("ppoint : "+ppoint)

return res.json({
    "fulfillmentMessages": [
  {
    "platform": "line",
    "type": 4,
    "payload" : {
    "line":  {
  "type": "text",
  "text": ppoint
}
        
    }
    }
      ]
  })
            
            
          
          
          
        }else if (body == "Id not found" || body <= 9 ){
        // ไม่มีข่อมูล ส่งข้อมูล user ไปเก็บ /// ตอบกลับ ติดต่อเจ้าหน้าที่
        var sendName = encodeURI(name);       
      request("https://docs.google.com/forms/u/2/d/1iUGX58guFhU3bkt1OglhOGoDuv5i6mPQAs35gy4IOcw/formResponse?ifq&entry.1691916586="+iiddd+"&entry.556749397="+sendName+"&entry.1687867422="+pictureUrl+"&entry.66040433=0&entry.1800492209=data2&entry.53513319=data3&entry.1987831678=data4&submit=Submit");
return res.json({
    "fulfillmentMessages": [
  {
    "platform": "line",
    "type": 4,
    "payload" : {
    "line":  {
  "type": "text",
  "text": "Hello"
}
        
    }
    }
      ]
  })










}
        
        
  }
});
        
        













//console.log(out); 


//var point = changthongDB.find(changthongDB => changthongDB.id === iiddd); 
//console.log(point)

 
 
 
 
 
 
    }
}) 

});
