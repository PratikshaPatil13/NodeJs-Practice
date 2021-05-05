const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res) {
    res.send("Hello, welcome to Wohlig Transforation Pvt Ltd.");
});

app.get("/about", function(req, res) {
    res.send("Wohlig simply want to halp you leverage through our expertise to make your business efficient, cutting-edge and have a low cost of ownership.");
});

app.get("/contact", function(req, res) {
    res.send("info@wohlig.com");
});

app.get("/calculator", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/calculator", function(req, res){
    console.log(req.body);

    let n1 = Number(req.body.v1);
    let n2 = Number(req.body.v2);

    let sum = n1 + n2;
    res.send("The sum of the Two Number is :"+sum);
});

//app.get("*", function(req, res) {
//    res.send("ooops, You are lost");
//});

let port = 12345;
app.listen(port, function() {
    console.log("server started listening at localhost:" + port);
});
