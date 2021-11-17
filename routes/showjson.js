var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET Json data. */
router.get('/', function(req, res, next) {
 
  //read json file

  let terms = JSON.parse(fs.readFileSync('public/git.json'));

  res.json(terms);
});

module.exports = router;