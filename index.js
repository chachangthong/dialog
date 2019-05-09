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




app.get('/user', (req, res) => {
  res.end("ok")
})







app.post("/webhook", function (req, res) {



var data = req.body;    
iiddd = req.body.originalRequest.data.source.userId; 

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
        // Print out the response body
        //console.log(name)
        //console.log(info)
        
        //console.log(res.userId)
      
var Uu = '"'+iiddd+'"'   // แปลง ID
var printdd =  "{ id: "+iiddd+", name: "+name+" }" 
console.log(printdd)


 // ส่ง  uuid ไปเช็ค
 

    var sendID ="https://docs.google.com/forms/u/2/d/1TX5G9W93A3r3qX29TDCZ-I5UQ7ek1nKpbRE99_IUUn0/formResponse?ifq&entry.815062337="+iiddd+"&submit=Submit";
request(sendID, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        console.log("sendID -------------- : " + iiddd)




  }

});








setTimeout(function() {
        
// รับค่ากลับมา ว่ามีข้อมูลหรือไม่        
    var check = "https://sheets.googleapis.com/v4/spreadsheets/1GYiGERPI21EU7BHGI2ihbrKrCTk18TUWXNgH9yK3wAU/values/M1?dateTimeRenderOption=SERIAL_NUMBER&majorDimension=DIMENSION_UNSPECIFIED&valueRenderOption=FORMATTED_VALUE&key=AIzaSyDaP4-U6DEs9SMBWntPc3vTVleCezswhHQ";
 request(check, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        
        console.log("values : "+info.values[0][0])

        //console.log("values : "+info.values)
        
        if(info.values >= 10){
var ppoint  = info.values[0][0];
console.log("ppoint : "+ppoint)
return res.json({
    "messages": [
  {
    "platform": "line",
    "type": 4,
    "payload" : {
    "line":  
    ////////////////////////////////////////////////////////////////////////////////////////
    {
  "type": "flex",
  "altText": "คะแนนสะสม",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "flex": 2,
          "contents": [
            {
              "type": "image",
              "url": pictureUrl,
              "align": "start",
              "gravity": "top",
              "size": "sm",
              "aspectRatio": "1:1"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "flex": 4,
          "spacing": "none",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "  สวัสดีค่ะ",
                  "flex": 0,
                  "size": "md",
                  "align": "start",
                  "color": "#000000"
                },
                {
                  "type": "text",
                  "text": name,
                  "flex": 0,
                  "size": "md",
                  "weight": "bold",
                  "color": "#0E09BF"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "คุณมียอดคะแนนสะสม",
                  "flex": 0,
                  "size": "md",
                  "align": "center",
                  "gravity": "center",
                  "color": "#000000"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": ppoint,//////////////////////////////
                  "flex": 0,
                  "size": "xl",
                  "align": "center",
                  "weight": "bold",
                  "color": "#FF0000"
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "none",
      "margin": "none",
      "contents": [
        {
          "type": "image",
          "url": "https://www.igetweb.com/uploads/269/filemanager/a6e6cbcc70f574bd9683dc2d998e08e4_full.jpg",
          "margin": "xl",
          "align": "center",
          "gravity": "center",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "ดูเพิ่มเติม",
            "uri": "line://app/1566203051-GMalZd6Q"
          },
          "margin": "md",
          "height": "sm",
          "style": "primary",
          "gravity": "bottom"
        }
      ]
    }
  }
}        
 ////////////////////////////////////////////////////// ////////////////////////////////        
        
    
}
}
]
});          
          
          
          
        }else{
        // ส่งข้อมูล user ไปเก็บ ///
        var out = encodeURI(name);       
      request("https://docs.google.com/forms/u/2/d/1iUGX58guFhU3bkt1OglhOGoDuv5i6mPQAs35gy4IOcw/formResponse?ifq&entry.1691916586="+Uu+"&entry.556749397="+out+"&entry.1687867422="+pictureUrl+"&entry.66040433=00&entry.1800492209=data2&entry.53513319=data3&entry.1987831678=data4&submit=Submit");

//changthongDB.push(todo);
return res.json({
    "messages": [
  {
    "platform": "line",
    "type": 4,
    "payload" : {
    "line":  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
  "type": "flex",
  "altText": "คะแนนสะสม",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "flex": 2,
          "contents": [
            {
              "type": "image",
              "url": pictureUrl,
              "align": "start",
              "gravity": "top",
              "size": "sm",
              "aspectRatio": "1:1"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "flex": 4,
          "spacing": "none",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "  สวัสดีค่ะ",
                  "flex": 0,
                  "size": "md",
                  "align": "start",
                  "color": "#000000"
                },
                {
                  "type": "text",
                  "text": name,
                  "flex": 0,
                  "size": "md",
                  "weight": "bold",
                  "color": "#0E09BF"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "คุณมียอดคะแนนสะสม",
                  "flex": 0,
                  "size": "md",
                  "align": "center",
                  "gravity": "center",
                  "color": "#000000"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "ติดต่อเจ้าหน้าที่",
                  "flex": 0,
                  "size": "xs",
                  "align": "center",
                  "weight": "bold",
                  "color": "#FF0000"
                },
                {
                  "type": "text",
                  "text": "เพื่อขออัพเดทคะแนนสะสม",
                  "flex": 0,
                  "size": "xs",
                  "align": "center",
                  "weight": "bold",
                  "color": "#FF0000"
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "none",
      "margin": "none",
      "contents": [
        {
          "type": "image",
          "url": "https://www.igetweb.com/uploads/269/filemanager/a6e6cbcc70f574bd9683dc2d998e08e4_full.jpg",
          "margin": "xl",
          "align": "center",
          "gravity": "center",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "+ดูเพิ่มเติม",
            "uri": "line://app/1566203051-GMalZd6Q"
          },
          "margin": "md",
          "height": "sm",
          "style": "primary",
          "gravity": "bottom"
        }
      ]
    }
  }
}
 ////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////////////////////        
        
    
}
}
]
});










}
        
        
  }
});
        
        

        
}, 1500);//////////////// หน่วงเวลา












//console.log(out); 


//var point = changthongDB.find(changthongDB => changthongDB.id === iiddd); 
//console.log(point)

 
 
 
 
 
 
    }
}) 

});