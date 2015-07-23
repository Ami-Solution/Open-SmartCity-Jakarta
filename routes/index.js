
/* URLS */
var haltebus = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0SGFsdGVCdXN3YXl+MjAxNTA3MTNTbTRSVEMxdFk=';
var kepolisian = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0UG9zUG9saXNpfjIwMTUwNzEzU200UlRDMXRZ';
var rumahSakit = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0UlNLbGluaWt+MjAxNTA3MTNTbTRSVEMxdFk=';
var sekolah = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0U2Vrb2xhaH4yMDE1MDcxM1NtNFJUQzF0WQ==';
var tempatIbadah = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0SWJhZGFofjIwMTUwNzEzU200UlRDMXRZ';
var lokasiTransportasi = 'http://smartcity.jakarta.go.id/ajax/apps_command.php?Z2V0VHJhbnNwb3J0YXNpfjIwMTUwNzEzU200UlRDMXRZ';

/* --------------- */
var request = require('request');
var storage = require('node-persist');
var moment = require('moment');

storage.initSync();
/**
* GET '/'
* Default home route. Just relays a success message back.
* @param  {Object} req
* @return {Object} json
*/

exports.index = function(req, res) {

  console.log("main route requested");

  var data = {
    status: 'OK',
    message: 'Welcome to Open SmartCity Jakarta API'
  };
  res.json(data);
};

exports.clearData = function(req, res){
  storage.clearSync();

  var data = {
    status: 'OK',
    message: 'Data cleared!'
  };
  res.json(data);
};

exports.haltebus = function(req,res){

  var lastRequestedDate = storage.getItem('halteDate');
  var items = storage.getItem('halte');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(haltebus, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('halte',body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

exports.kepolisian = function(req,res){

  var lastRequestedDate = storage.getItem('kepolisianDate');
  var items = storage.getItem('kepolisian');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(kepolisian, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('kepolisian', body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

exports.rumahSakit = function(req,res){

  var lastRequestedDate = storage.getItem('rumahSakitDate');
  var items = storage.getItem('rumahSakit');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(rumahSakit, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('rumahSakit', body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

exports.sekolah = function(req,res){

  var lastRequestedDate = storage.getItem('sekolahDate');
  var items = storage.getItem('sekolah');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(sekolah, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('sekolah', body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

exports.tempatIbadah = function(req,res){

  var lastRequestedDate = storage.getItem('tempatIbadahDate');
  var items = storage.getItem('tempatIbadah');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(tempatIbadah, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('tempatIbadah', body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

exports.lokasiTransportasi = function(req,res){

  var lastRequestedDate = storage.getItem('lokasiTransportasiDate');
  var items = storage.getItem('lokasiTransportasi');

  if(items && isToday(lastRequestedDate)){
    console.log('return from persistent!');
    res.end(items);
  }else{
    doRequest(lokasiTransportasi, function(error,response, body){
      if (!error && response.statusCode == 200) {
        onRequestSuccess('lokasiTransportasi', body);
        res.end(body);
      }else if(items){
        res.end(items);
      }
    });
  }
};

function onRequestSuccess(key ,body){
  storage.setItem(key, body);
  storage.setItem(key + 'Date', Date());
}

function doRequest(url, callback){
  console.log('Making requst:' + url);
  request(url, function(error, response, body){
    callback(error,response, body);
  });
}

function isToday(lastRequestedDate){
  console.log("Date now: " + Date());
  console.log("Date last requested: " + lastRequestedDate);
  return lastRequestedDate ? moment(lastRequestedDate, 'days').isSame(moment(Date(),'days')) : false;
}
