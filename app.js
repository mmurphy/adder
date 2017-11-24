const express = require('express');
const app = express();

const port = 4001;
var shouldFail = false;

const myHost = process.env.HOSTNAME;

function log(str) {
  const when = (new Date()).toISOString();
  console.log(`${when}: ${myHost}: ${str}`);
}

app.get('/sys/ready', (req, res) => {
  if (shouldFail) {
    log(`returning NOT ready`);
    res.sendStatus(500);
  } else {
    res.json({
      'status': 'ok'
    });
  }
});
app.get('/sys/fail', (req, res) => {
  log('setting readiness FAIL mode');
  shouldFail = true;
  res.json({
    'status': 'ok'
  })
});
app.get('/sys/fix', (req, res) => {
  log('setting readiness FIX mode');
  shouldFail = false;
  res.json({
    'status': 'ok'
  })
});
app.get('/adder', (req, res) => {
  var start = Date.now();
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  var result = doAdd(num1, num2);
  log(`returning: ${num1} + ${num2} == ${result}`);
  res.json({
    result: result,
    duration: Date.now() - start,
    inputs: {
      num1: req.query.num1,
      num2: req.query.num2
    }
  });
});
app.get('/', (req, res) => {
  res.send(`Hello World! from ${myHost}`);
});

function doAdd(n1, n2) {
  var r;
  for (var i = 0; i < 1000000000; i++) {
    r = n1 + n2;
  }
  return r;
}

module.exports = app.listen(port, () => log(`Example app listening on port ${port}!`));