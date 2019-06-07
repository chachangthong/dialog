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

var Gdocs = process.env.Gdocs;
var app_script = process.env.script;
var Token = process.env.TOKEN;
var access_token = 'Bearer {'+Token+'}'


var iiddd = "";
var name = "";
var pictureUrl = "";

var headers = {
       'Authorization' : access_token
}




app.get('/', (req, res) => {
  res.end("ok")
})







app.post("/webhook", function (req, res) {

    var data = req.body; 
    
var UID = req.body.originalDetectIntentRequest.payload.data.source.userId; 
//console.log("userID -------------- : " + UID)
    

var options = {
    url: 'https://api.line.me/v2/bot/profile/'+UID,
    method: 'GET',
    headers: headers,
    }





    // เช็คโปรไฟล์
 request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        name = info.displayName;
        pictureUrl = info.pictureUrl;

var printdd =  "{ id: "+UID+", name: "+name+" }" 
console.log(printdd)














// เช็คว่ามีแต้ม มีข้อมูลไหม
  var check = app_script+"?id="+UID;

 request(check, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        
   console.log("values : "+body);
      
        if(body>= 10){
var ppoint  = body;
//console.log("ppoint : "+ppoint)

            
            
            
            
return res.json({
    "fulfillmentMessages": [
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
            "uri": "line://app/1580284203-nWdwE2zx"
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
            
            
            
          
          
          
         }else if (body == "Id not found"){
        // ไม่มีข่อมูล ส่งข้อมูล user ไปเก็บ /// ตอบกลับ ติดต่อเจ้าหน้าที่
        var sendName = encodeURI(name);   


//console.log("userID -------------- : "+data)  
//console.log('ปริ้นทั้งหมด' + JSON.stringify(data))       

var intent = req.body.queryResult.intent.displayName; 
var TT = req.body.queryResult.queryText; 
var TTName = encodeURI(TT);  
console.log("name--- > "+TT)  

if (intent == 'point - custom'){

    var lookup = '=iferror(VLOOKUP("'+TTName+'",sheet4!A1:B21,2,0),0)'
    //var TTlookup = encodeURI(lookup); 
    
    
 request(Gdocs+"?ifq&entry.1691916586="+UID+"&entry.556749397="+sendName+"&entry.1687867422="+pictureUrl+"&entry.66040433="+lookup+"&entry.1800492209="+TTName+"&entry.53513319=data3&entry.1987831678=data4&submit=Submit"); 
 
    var sendName = encodeURI(name);   
   
   
/////////////////////////////////////////////////////////////////////

return res.json({
    "fulfillmentMessages": [
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
            "label": "ดูเพิ่มเติม.",
            "uri": "line://app/1580284203-nWdwE2zx"
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
 
 
 
 
 
 
 
  
}else{


return res.json({
    "fulfillmentMessages": [
  {
    "platform": "line",
    "type": 4,
    "payload" : {
    "line": 
{
  "type": "text",
  "text": "ขอชื่อ และนามสกุล ที่ใช้ในการสั่งซื้อ เพื่อตรวจสอบแต้มสะสมให้คะ"
}

    
}
}
]
});         
        
}
        
        
/*        
      request(Gdocs+"?ifq&entry.1691916586="+UID+"&entry.556749397="+sendName+"&entry.1687867422="+pictureUrl+"&entry.66040433=0&entry.1800492209=data2&entry.53513319=data3&entry.1987831678=data4&submit=Submit");


/////////////////////////////////////////////////////////////////////

return res.json({
    "fulfillmentMessages": [
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
            "label": "ดูเพิ่มเติม.",
            "uri": "line://app/1580284203-nWdwE2zx"
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




*/////////////////////////////////////////////////////////////////////






}
   
 else if (body == "0"){
   var sendName = encodeURI(name);   
   
   
/////////////////////////////////////////////////////////////////////

return res.json({
    "fulfillmentMessages": [
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
            "label": "ดูเพิ่มเติม.",
            "uri": "line://app/1580284203-nWdwE2zx"
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






   
 }   ///    ปิด esle   =  0
   
   
   
   
   
   
   
   
   
   
   
   
        
        
  }
});
        
        




 
 
    }
}) 

});
