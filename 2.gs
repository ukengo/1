/*function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var r1 = ss.getRange(1, 1, 36,2);
  var r3 = ss.getRange(1, 3, 36);
  var v1 = r1.getValues();
  for (i=1; i<=36 ;i++){
    var v11 = ss.getRange(i, 1).getValue();
    var v22 = ss.getRange(i, 2).getValue();
    var res = v11*v22;
    ss.getRange(i, 5).setValue(res);
  }
  var data = v1.map(function (row){
    return [row[0]*row[1]];
  })
  r3.setValues(data);
}

function myFunction1() {

  var arr = [1,2,3];
var arr1 = [arr]
Logger.log(arr1);

}*/