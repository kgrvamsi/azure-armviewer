const express = require('express');
const router = express.Router();

// Index and root
router
.get('/', function (req, res, next) {
  res.render('index', 
  { 
    showTools: false
  });
})

module.exports = router;
