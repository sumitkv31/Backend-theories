// //function to handle incoming request and response to the request with nodeJS only
// function handleRequest(request, response) {
//   //url is a property of request which stores the path
//   if (request.url === "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + new Date().toISOString() + "</h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200; //a success status code
//     response.end("<h1>Hello World!</h1>"); //response of server after success
//   }
// }

// //creating our own server
// const http = require("express");
// const server = http.createServer(handleRequest);
// server.listen(3000);

// Creating server and handling request using express

const { response } = require("express");
const express = require("express");
const { json } = require("express/lib/response");
// it will be produce a function express() which when executed result in object
const app = express();

const fs = require("fs"); //now we require file-system package
const path = require("path"); //path package helps to develop complete path of file in all Type of OS in minimal effort

//middleware request
app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (request, response) {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
});

// app.get("/", function (req, res) {
//   res.send("<h2>Hello man!</h2>");
// });

//handling form submission using express
app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="post"><label>Your Name </label> <input type="text" name="username"><button>Submit</button></form>'
  );
});
app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  const filePath = path.join(__dirname, "data", "users.json"); //join multiple fragment to construct path which is absolute path
  const fileData = fs.readFileSync(filePath); //it will read the raw data from the filePath here in JSON format
  const existingUsers = JSON.parse(fileData); //it will translate json format to javascript object or array
  existingUsers.push(userName); //push will append new element to the array
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //it will update the filePath
  res.send("<h1>Username stored!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json"); //join multiple fragment to construct path which is absolute path
  const fileData = fs.readFileSync(filePath); //raw json data
  const existingUsers = JSON.parse(fileData); //json data in form of javascript object or object

  let responseData = "<ul>";
  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";
  // res.send(existingUsers);
  res.send(responseData);
});

app.listen(3000);
