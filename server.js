// server.js
// where your node app starts
//USED https://www.npmjs.com/package/formidable FOR FILE PARSING
// init project
var express = require('express');
var app = express();
var formidable = require('formidable');
var defFile = function(){
  this.name = "",
  this.type = "",
  this.size = ""
};
var updatedFileDets = new defFile;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use('/fileupload',function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<center>');
      res.write('File uploaded:');
      res.write('<br>');
      updatedFileDets.size = files.filetoupload.size;
      updatedFileDets.name = files.filetoupload.name;
      updatedFileDets.type = files.filetoupload.type
      res.write(JSON.stringify(updatedFileDets));
      res.write('</center>');
      res.end();
      
    });
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
