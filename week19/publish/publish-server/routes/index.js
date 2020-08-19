var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  // let body = [];
  // req.on('data', (chunk) => {
  //   body.push(chunk)
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  // })
  console.log(req.body)
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content);
  res.end();
});

module.exports = router;
