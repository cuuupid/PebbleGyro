//COPYRIGHT PRIANSH SHAH

var UI = require('ui');
var Accel = require('ui/accel');
Accel.init();
var ajax = require('ajax');
var x; var y; var z;

var main = new UI.Card({
  title: 'UniPebble',
  backgroundColor: 'lavender',
  subtitle: '(c) Cyprus Game Studios',
  body: 'Sending accel data in realtime!'
});

main.show();
Accel.peek(function(e) {
  console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
  x = e.accel.x; y = e.accel.y; z = e.accel.z;
});

Accel.on('data', function(e) {
  console.log('Just received ' + e.samples + ' from the accelerometer.');
  var myurl = "http://192.168.1.13:3000/logdata?x="+(e.accel.x-x)+"&y="+(e.accel.y-y)+"&z="+(e.accel.z-z);
  ajax(
  {
    url: myurl,
    type: 'json'
  },
  function(data, status, request) {
    console.log("Yeah.");
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);
});