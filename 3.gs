function d2s(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

/*function myFunction1() {
var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //var lr = ss.getLastRow();
  var r = ss.getRange(1,1,3,1);
  var v = r.getValues();
  var v1 = d2s(v);
  Logger.log (v1);
  
 } 
 */ 
function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = ss.getLastRow();
  var r = ss.getRange(1,1,3,1);
  var v = r.getValue();
  
 /* 
  var data = v.map(function(row){
  return d2s(row[1]);
  });
  
  */
  //var usl1 = d2s(ss.getRange('G1').getValue());
  //var usl2 = d2s(ss.getRange('G2').getValue());
  
// var eer = new Date (2019, 10, 01);
 var eer1 = d2s(new Date (2020, 01, 01));
Logger.log (eer1);
  
  var data = d2s(v).filter(function(row){
  return row[0] == eer1;
  });
  

 // 
 // Logger.log (eer);
 // Logger.log (eer1);
  Logger.log (data);
  
  
 }
