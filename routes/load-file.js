const express = require('express');
const router = express.Router();
const request = require('request');
const ARMParser = require('../lib/arm-parser');

router
.post('/view', function (req, res, next) {

  // No file :(
  if(!req.files.template) {
    res.render('error', {
      err: "No file specified or uploaded, please supply a file",
      showTools: false
    });
    return; 
  }
  
  // JSON is in file, we hope!
  let templateJSON = req.files.template.data.toString();
  
  // Parse the template JSON
  var parser = new ARMParser(templateJSON);    

  if(parser.getError()) {
    res.render('error', {
      err: parser.getError(),
      showTools: false
    });
    return; 
  }

  // Pass result of parsing to the view
  res.render('viewer', {
    dataJSON: JSON.stringify(parser.getResult()),
    showTools: true,
    template: escape(templateJSON)
  });
})

module.exports = router;