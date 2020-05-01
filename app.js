//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require ("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true}));


app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

const fName= req.body.fName;
const lName = req.body.lName;
const email = req.body.email;
// this is javascript
const data = {
   members:[
     {
       email_address:email,
       status:"subscribed",
      merge_fields:{
         FNAME:fName,
         LNAME:lName
       }
     }
   ]
};
//turn it into json
const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/527b07d6ff"
// options are going to be javascript object
const options ={
  method : "POST",
  auth :"Zainab4:9480d4bcf9387179d1c9d285e8ceb428-us8"
}

const request = https.request(url, options , function(response) {
// TO check if it was a success or a failure
if( response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
} else {
res.sendFile(__dirname + "/failure.html");}

  response.on( "data", function(data){
    console.log (JSON.parse(data));
});
});
request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

//to deploy your site to heroku
app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running on port 3000");
});


// API Key
// 6a18a7ce8ed2adaf893a6fedf05a66e3-us8

//List id
//527b07d6ff
