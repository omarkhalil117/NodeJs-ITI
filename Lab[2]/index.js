const http = require("http");
const fs = require("fs");
const path = require('path');
const {mainRoute, astronomyRoute , addStyle} = require('./helperFunctions');

http.createServer((req, res) => {

  // add css file
  addStyle(res)

  // handle main route
  if (req.url === '/') 
  {
    return mainRoute(res)
  }

  // handle astronomy route
  if (req.url === "/astronomy")
  {
    return astronomyRoute(res)
  }

  if(req.url === "/download")
  {
    res.write("download page")
    return res.end() 
  }
  // error page
  res.write("<h1> Error 404 page not found </h1>")

 
}).listen(3000, (req, res) => {
  console.log("Listining on port 3000")
});
