const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if(req.url == "/") {
        res.end("Hello from the Home Page...");
    } else if(req.url == "/about") {
        res.end("Hollo from th AboutUs Page...");
    } else if (req.url == "/contact") {
        res.end("Hello from the ContactUs Page...");
    } else if(req.url == "/api") {
      fs.readFile('${__dirname}/userapi.json', "utf-8", (err, data) => {
        console.log(data);
        const objData = JSON.parse(data);
        res.end(objData[0].id);
        res.writeHead(200, {"Content-type": "application/json"});
        

      });
    
    } else {
        res.writeHead(400, {"Content-type": "text/html"});
        res.end("<h1> 404 Error Pages. Page doesn't exist </h1>");
    }
});

server.listen(8080, "127.0.0.1", () => {
    console.log("listening to the port no 8080");

});



