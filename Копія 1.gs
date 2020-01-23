/*
привет, обращаться к таблицам мы будем через Advanced Sheets API, 
для начала, перед использованием его нужно активировать: https://developers.google.com/apps-script/guides/services/advanced#enabling_advanced_services
*/

function go2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetPaste = ss.getSheetByName("результат");
  var arr = []
  
  var linklist =
      [["https://docs.google.com/spreadsheets/d/1UKBV0vYYRQLCJyDZj_eqUdOlfbL84X7U685gWbpTWd0/edit#gid=922208859", "20!A:D"],
       ["https://docs.google.com/spreadsheets/d/1UKBV0vYYRQLCJyDZj_eqUdOlfbL84X7U685gWbpTWd0/edit#gid=922208859", "20!A:D"],
       ["https://docs.google.com/spreadsheets/d/1UKBV0vYYRQLCJyDZj_eqUdOlfbL84X7U685gWbpTWd0/edit#gid=922208859", "20!A:D"]]
    
  
  for(var t = 0; t < linklist.length; t++){  
    try {
      //загружаем таблицу фильтруем от пустых строк по первому столбцу
      var import = readRange(linklist[t][0], linklist[t][1]).filter(function(row){return row[0] != ''});
      //результат объединяем добавляем к массиву arr 
      arr = arr.concat(import);      
    } catch (e) {
      Logger.log(['Url is invalid', spreadsheet_link]);
      continue;
    } 
  }
  arr = shapingmachine(arr);
  
  //вставляем полученный массив на лист с первой строки
  sheetPaste.getRange(1, 1, arr.length, arr[0].length).setValues(arr);
}

//сниппет копирования данных из таблиц
function readRange(spreadsheet_link, sheet_name_range) {
  var spreadsheet_id = getIdFromUrl(spreadsheet_link);
  var response = Sheets.Spreadsheets.Values.get(spreadsheet_id, sheet_name_range).values;
  return response;
}

function getIdFromUrl(url) {return url.match(/[-\w]{25,}/); }

//сниппет достраивает массив до правильной структуры
function shapingmachine(arr){
  Logger.log('А ты танцуй');
  var width = Math.max.apply(null, arr.map(function(row){return row.length}));
  for (var i in arr) {
    var l = arr[i].length
    if (l != width) {
      for (var j = l; j < width; j++) {
        arr[i][j] = '';
      }
    }
  }
  Logger.log('Девочка танцуй');  
  return arr
}