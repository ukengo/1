function addNewRowMinusThreee(rowData) {

  SSREESTR.getSheetByName('Прочие траты').appendRow(rowData)
  return true
}

function addNewRowWaste(rowData) {
  const vasteDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(vasteDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  SSREESTR.getSheetByName('Прочие траты').appendRow(rowData)
  return true
}

function addNewRowArrival(rowData) {
  const arrivalDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(arrivalDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  SSREESTR.getSheetByName('Прочие поступления').appendRow(rowData)
  return true
}

function addNewRowMinusThreee(rowData) {
  const privDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(privDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  SSREESTR.getSheetByName('Прочие траты').appendRow(rowData)
  return true
}


function getDropDownFirma() {
  const ws = SSREESTR.getSheetByName('Списки')
  return ws.getRange(2, 15, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownStatya() {
  const ws = SSREESTR.getSheetByName('Списки')
  const rashod = ws.getRange(2, 12, ws.getLastRow() - 1, 1).getValues()
  const dohod = ws.getRange(2, 13, ws.getLastRow() - 1, 1).getValues()
  return rashod.concat(dohod).filter(r => r != '')
}

////////////////////////////////////////////////////////////////////////////////

function addpRoekt() {
  const ss = SpreadsheetApp.openByUrl(URLUPRAV)
  const sheet = ss.getSheetByName('База')
  var dataValues = sheet.getRange("F1:F").getValues(); //получаем массив проектов
  var dataLength = dataValues.length;

  for (var i = dataLength - 1; i >= 0; i--) {
    if (dataValues[i][0] !== "") {
      var lastRowInData = i + 1;
      break;
    }
  }
  var NumProekt = sheet.getRange(lastRowInData, 6).getValue();
  return NumProekt + 1
}

function addNewRow(rowData) {
  // таблица Управление
  const ss = SpreadsheetApp.openByUrl(URLUPRAV)
  const sheet = ss.getSheetByName('База')
  const spl0 = String(rowData.splice(0, 1))
  const spl1 = String(rowData.splice(0, 1))
  const dat1 = Utilities.formatDate(new Date(spl1), 'Europe/Kiev', 'dd.MM.yyyy')
  if (!spl0) {
    rowData.splice(0, 0, '', dat1)
  } else {
    const dat0 = Utilities.formatDate(new Date(spl0), 'Europe/Kiev', 'dd.MM.yyyy')
    rowData.splice(0, 0, dat0, dat1)
  }
  sheet.appendRow(rowData)
  return true
}

function getDropDownArray() {
  const ws = SSREESTR.getSheetByName('Списки')
  return ws.getRange(2, 5, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArraySotr() {

  const ws = SSREESTR.getSheetByName('Списки')

  return ws.getRange(2, 3, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayCodeRabota() {

  const ws = SSREESTR.getSheetByName('Списки')

  return ws.getRange(2, 1, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayRabota() {

  const ws = SSREESTR.getSheetByName('Списки')
  return ws.getRange(2, 6, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayPrim() {

  const ws = SSREESTR.getSheetByName('Списки')
  return ws.getRange(2, 14, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayProekt() {

  const ws = SSREESTR.getSheetByName('База')

  return ws.getRange(2, 6, ws.getLastRow() - 1, 1).getValues().filter(r => r != '')
}


//автовставка даты в форму
function addDate() {
  return Utilities.formatDate(new Date(), 'Europe/Kiev', 'dd.MM.yyyy')
}

////////////////////////////////////////////////
// Создание папки с проектом в Аф

function createNewFolder(proekt, firma, prim) {
  const afFolderId = '13N9QgYZDA81L6zuZhq5fzqTR1s9XSZ_d'
  const listFile = listFiles(afFolderId)
  if (!listFile.map(r => r[0]).includes(firma)) {
    const parentFolder = DriveApp.getFolderById(afFolderId);
    const newFolder = parentFolder.createFolder(firma)
    newFolder.createFolder(`#${proekt} ${prim}`)
  } else {
    const listFileUrlArr = listFile.filter(r => r[0] == firma).map(r => r[1])
    const id = listFileUrlArr[0].match(/[-\w]{25,}/)
    DriveApp.getFolderById(id[0]).createFolder(`#${proekt} ${prim}`)
  }
}

//функция создания папки, где внутри есть От органа
function createNewFolderOtOrgana(proekt, firma, prim) {
  const afFolderId = '13N9QgYZDA81L6zuZhq5fzqTR1s9XSZ_d'
  const listFile = listFiles(afFolderId)
  if (!listFile.map(r => r[0]).includes(firma)) {
    const parentFolder = DriveApp.getFolderById(afFolderId);
    const newFolder = parentFolder.createFolder(firma)
    var newFolderProekt = newFolder.createFolder(`#${proekt} ${prim}`)
  } else {
    const listFileUrlArr = listFile.filter(r => r[0] == firma).map(r => r[1])
    const id = listFileUrlArr[0].match(/[-\w]{25,}/)
    var newFolderProekt = DriveApp.getFolderById(id[0]).createFolder(`#${proekt} ${prim}`)
  }
  newFolderProekt.createFolder(`От клиента`)
  const newFolderOtOrgana = newFolderProekt.createFolder(`От органа`)
  newFolderOtOrgana.createFolder(`Финансы`)
  const newFolderOtBelochki = newFolderOtOrgana.createFolder(`Белочки`)
  newFolderOtBelochki.createFolder('Клиенту')
  newFolderOtBelochki.createFolder('От клиента')
}

// получение списка папок в определенной директории
function listFiles(folderId) {
  var arr = [['', folderId, '']]

  for (var x = 0; x < arr.length; x++) {

    if (x && arr[x][2] != 'application/vnd.google-apps.folder') continue;
    var query = createQuery(arr[x][1]);
    var files;
    var pageToken;

    do {
      files = Drive.Files.list({
        q: query,
        maxResults: 100,
        pageToken: pageToken
      });
      if (files.items && files.items.length > 0) {
        for (var i = 0; i < files.items.length; i++) {
          var folder = files.items[i];
          arr.push(
            [folder.title,
            folder.alternateLink]);
        }
      }
      pageToken = files.nextPageToken;
    } while (pageToken);
  }

  arr = arr.slice(1)
  arr.map(h => h.splice(2, 1));
  return arr
  // sh.getRange(4, 1, arr.length, arr[0].length).setValues(arr);
}

function createQuery(f) {
  return `${f == 'root' ? '"root"' : '"' + getIdFromUrl(f) + '"'} in parents and trashed = false`
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }
// Конец Создание папки с проектом в Аф


////////////////////////////////////////////////

// ArriwalWaste
/*GET LAST 10 RECORDS */
function getLastTenRows(sheet) {
  const lr = sheet.getDataRange().getValues().length

  const data = sheet.getRange(lr - 15, 1, 16, 5).getDisplayValues()
  return data;
}

function getLastTenRowsWaste() {
  return getLastTenRows(dataWaste)
}

function getLastTenRowsArriwal() {
  return getLastTenRows(dataArriwal)
}



////////////////////////////////////////////////

// Таблица управление tableUpravlenie

function UpdateRecordUprav(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav) {
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 9).getValues();

  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][5] == proektUprav) {
      dataSheet.getRange(i + 2, 1).setValue(dateendUprav);
      dataSheet.getRange(i + 2, 2).setValue(datestartUprav);
      dataSheet.getRange(i + 2, 3).setValue(firmaUprav);
      dataSheet.getRange(i + 2, 4).setValue(rabotaUprav);
      dataSheet.getRange(i + 2, 5).setValue(coderabotaUprav);
      dataSheet.getRange(i + 2, 6).setValue(proektUprav);
      dataSheet.getRange(i + 2, 7).setValue(ispolUprav);
      dataSheet.getRange(i + 2, 8).setValue(schUprav);
      dataSheet.getRange(i + 2, 9).setValue(primUprav);
    }

  }
  return 'SUCCESS';
}

function DeleteRecordUprav(proektUprav) {
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 9).getValues();
  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][5] == proektUprav) {
      var rowNumber = i + 2;

      dataSheet.deleteRow(rowNumber)

    }
  }
  return 'SUCCESS';
}

function AddRecordUprav(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav) {
  let arr = [dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav]
  const spl0 = String(arr.splice(0, 1))
  const spl1 = String(arr.splice(0, 1))
  const dateendUprav1 = Utilities.formatDate(new Date(spl0), 'Europe/Kiev', 'dd.MM.yyyy')
  const datestartUprav1 = Utilities.formatDate(new Date(spl1), 'Europe/Kiev', 'dd.MM.yyyy')
  const tData = Utilities.formatDate(new Date(), 'Europe/Kiev', 'dd.MM.yyyy')

  if (!spl0) {
    arr.splice(0, 0, '')
  } else {
    arr.splice(0, 0, dateendUprav1)
  }
  if (!spl1) {
    arr.splice(1, 0, tData)
  } else {
    arr.splice(1, 0, datestartUprav1)
  }
  dataSheet.appendRow(arr);
  return 'SUCCESS';
}

function searchRecordsUprav(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav) {

  var returnRows = [];
  var allRecords = getRecordsUprav();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (dateendUprav != '') {
      if (value[0] == Utilities.formatDate(new Date(dateendUprav), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (datestartUprav != '') {
      if (value[1] == Utilities.formatDate(new Date(datestartUprav), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (firmaUprav != '') {
      if (value[2].toUpperCase() == firmaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (rabotaUprav != '') {
      if (value[3].toUpperCase() == rabotaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (coderabotaUprav != '') {
      if (value[4].toUpperCase() == coderabotaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (proektUprav != '') {
      if (value[5] == proektUprav) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (ispolUprav != '') {
      if (value[6].toUpperCase() == ispolUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (schUprav != '') {
      if (value[7].toUpperCase() == schUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (primUprav != '') {
      if (value[8].toUpperCase() == primUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (evalRows.indexOf("false") == -1) {
      returnRows.push(value);
    }
  
  });

  return returnRows;
}

function getRecordsUprav() {
  const data = dataSheet.getDataRange().getValues().slice(1)
  const dataFilterMap = data.filter(x => x[5] != '')
    .map(x => [getDateUprav(x[0]), getDateUprav(x[1]), x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9]])
 
  return dataFilterMap;
}

function getDateUprav(date) {
  if (date) {
    return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'yyyy-MM-dd')
  } else {
    return ''
  }
}


//////////////////////////////////

function getDropDownArrayUprav() {
  return dataSpiski.getRange(2, 1, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayIspolUprav() {
  return dataSpiski.getRange(2, 4, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayCodeRabotaUprav() {
  return dataSpiski.getRange(2, 3, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayRabotaUprav() {
  return dataSpiski.getRange(2, 2, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayPrimUprav() {
  return dataSpiski.getRange(2, 5, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayProektUprav() {

  return dataSheet.getRange(2, 6, dataSheet.getLastRow() - 1, 1).getValues().filter(r => r != '')
}



////////////////////////////////////////////////

// finance

function getDropDownArrayProektFin() {
  return dataSpiskiReestr.getRange(2, 19, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArraySfFin() {
  return dataSpiskiReestr.getRange(2, 16, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayPrimFin() {
  return dataSpiskiReestr.getRange(2, 17, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayFirmaFin() {
  return dataSpiskiReestr.getRange(2, 5, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function searchRecordsFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin) {

  var returnRows = [];
  var allRecords = getRecordsFin();
  const range = dataBase.getRange(1, 1, dataBase.getLastRow() + 1, dataBase.getLastColumn() + 1);
  const values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var ii = 0; ii <= values[i].length; ii++) {
      if (values[i][ii] == proektFin) {
        var row = i + 1
        var col = ii + 1
      }
    }
  }
  
  let ispol = [dataBase.getRange(row, col + 11).getValue(), dataBase.getRange(row, col + 12).getValue()]

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (proektFin != '') {
      if (value[0] == proektFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (summaFin != '') {
      if (value[1] == summaFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (priznakFin != '') {
      if (value[2] == priznakFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (dateoplFin != '') {
      if (value[3] == Utilities.formatDate(new Date(dateoplFin), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (sfFin != '') {
      if (value[4] == sfFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (primFin != '') {
      if (value[5] == primFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (idFin != '') {
      if (value[6] == idFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (firmaFin != '') {
      if (value[7] == firmaFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (evalRows.indexOf("false") == -1) {
      if (ispol) {
        value.splice(8, 0, ...ispol)
      }
      returnRows.push(value);

    }

  });

  return returnRows;
}

function getRecordsFin() {
  const data = dataFinance.getRange('A99:O').getValues().slice(1)
  const dataFilterMap = data.map(x => [x[0], x[1], x[2], getDateFin(x[3]), x[4], x[5], x[6], x[14]])
  return dataFilterMap;
}

function getDateFin(date) {
  if (date) {
    return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'yyyy-MM-dd')
  } else {
    return ''
  }
}

function UpdateRecordFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin, sumIspolFin,oplataIspolFin) {

  var getLastRow = dataFinance.getDataRange().getValues().length;
  var table_values = dataFinance.getRange(100, 1, getLastRow, 15).getValues();
  const range = dataBase.getRange(1, 1, dataBase.getLastRow() + 1, dataBase.getLastColumn() + 1);
  const values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var ii = 0; ii <= values[i].length; ii++) {
      if (values[i][ii] == proektFin) {
        var row = i + 1
        var col = ii + 1
      }
    }
  }
  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][6] == idFin) {
      dataFinance.getRange(i + 100, 1).setValue(proektFin);
      dataFinance.getRange(i + 100, 2).setValue(summaFin * 1);
      dataFinance.getRange(i + 100, 3).setValue(priznakFin);
      dataFinance.getRange(i + 100, 4).setValue(dateoplFin);
      dataFinance.getRange(i + 100, 5).setValue(sfFin);
      dataFinance.getRange(i + 100, 6).setValue(primFin);
      dataFinance.getRange(i + 100, 7).setValue(idFin);
      dataBase.getRange(row, col + 11).setValue(sumIspolFin)
      dataBase.getRange(row, col + 12).setValue(oplataIspolFin)
    }

 
  }
  return 'SUCCESS';
}

function AddRecordFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin, sumispolfin, ) {
  dataFinance.insertRowAfter(99);
  //формируем id
  const idFinId = new Date().getTime();
  const data = [[proektFin, summaFin * 1, priznakFin, dateoplFin, sfFin, primFin, idFinId]]

  dataFinance.getRange('A100:G100').setValues(data);
}


///////////////////////////////////////////
//NEVISTAVLENO - NEOPLACHENO

//https://www.bpwebs.com/


/* DEFINE GLOBAL VARIABLES, CHANGE THESE VARIABLES TO MATCH WITH YOUR SHEET */
/* function globalVariablesNevistavleno() {
  var varArray = {
    spreadsheetId: '1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ',
    dataRage: 'В работе!P10:V',

  };
  return varArray;
}
function globalVariablesNeoplacheno() {
  var varArray = {
    spreadsheetId: '1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ',
    dataRage: 'В работе!X10:AA',

  };
  return varArray;
} */

/* READ DATA */
/* function readData(spreadsheetId, range) {
  var result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
  return result.values;
} */





function startDataNevistvleno() {
  const data = dataVrabote.getRange('P10:V').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataNeoplacheno() {
  const data = dataVrabote.getRange('X10:AA').getDisplayValues()
  const lenthg = (data.filter(x => x[0] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataVraboteR() {
  const data = dataVrabote.getRange('I10:N').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataVraboteT() {
  const data = dataVrabote.getRange('AE10:AJ').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataSotrGs() {
  const dataLazorenko = dataVrabote.getRange('AS10:AX').getDisplayValues()
  const dataDilanjan = dataVrabote.getRange('AL10:AQ').getDisplayValues()
  const dataKinzerskiy = dataVrabote.getRange('AZ10:BE').getDisplayValues()
  const dataZinonkina = dataVrabote.getRange('BG10:BL').getDisplayValues()
  
  const lenthgLazorenko = (dataLazorenko.filter(x => x[4] != '')).length + 2
  const lenthgDilanjan = (dataDilanjan.filter(x => x[4] != '')).length + 2
  const lenthgKinzerskiy = (dataKinzerskiy.filter(x => x[4] != '')).length + 2
  const lenthgZinonkina = (dataZinonkina.filter(x => x[4] != '')).length + 2
  
  const resLazorenko = dataLazorenko.splice(0, lenthgLazorenko)
  const resDilanjan = dataDilanjan.splice(0, lenthgDilanjan)
  const resKinzerskiy = dataKinzerskiy.splice(0, lenthgKinzerskiy)
  const resZinonkina = dataZinonkina.splice(0, lenthgZinonkina)
  
  const res = 
  {
          nameLazorenko: 'Лазоренко', resLazorenko: resLazorenko, countLazorenko: lenthgLazorenko-3,
          nameDilanjan: 'Диланян', resDilanjan: resDilanjan, countDilanjan: lenthgDilanjan-3,
          nameKinzerskiy: 'Кинзерский', resKinzerskiy: resKinzerskiy, countKinzerskiy: lenthgKinzerskiy-3,
          nameZinonkina: 'Зиновкина', resZinonkina: resZinonkina, countZinonkina: lenthgZinonkina-3
          
        }
  Logger.log(res)
  return res
}




////////////////////////////////////////////////
//ТАБЛИЦА РЕЕСТР ОФОРМЛЕНИЙ

function getDropDownArrayReestr() {
  return dataSpiskiReestr.getRange(2, 5, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayRabotaReestr() {
  return dataSpiski.getRange(2, 2, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayCodeRabotaReestr() {
  return dataSpiski.getRange(2, 3, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayProektReestr() {
  return dataSheet.getRange(2, 6, dataSheet.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArraySotrReestr() {
  return dataSpiski.getRange(2, 4, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayIspolReestr() {
  return dataSpiskiReestr.getRange(2, 4, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayPrimReestr() {
  return dataSpiski.getRange(2, 5, dataSpiski.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function getDropDownArrayPrimMoyoReestr() {
  return dataSpiskiReestr.getRange(2, 7, dataSpiskiReestr.getLastRow() - 1, 1).getValues().filter(r => r != '')
}

function searchRecordsReestrGs(dateendReestr,datestartReestr, firmaReestr, rabotaReestr, coderabotaReestr, proektReestr, sotrReestr, ispolReestr, sumispolReestr, sumoplataReestr, primReestr, primMoyoReestr, issuepartReestr, withoutaccountReestr, stoppedReestr)
{

  var returnRows = [];
  var allRecords = getRecordsReestr();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (dateendReestr != '') {
      if (Utilities.formatDate(new Date(value[0]), 'Europe/Kiev', 'dd.MM.yyyy') == Utilities.formatDate(new Date(dateendReestr), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (datestartReestr != '') {
      if (Utilities.formatDate(new Date(value[1]), 'Europe/Kiev', 'dd.MM.yyyy') == Utilities.formatDate(new Date(datestartReestr), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (firmaReestr != '') {
      if (value[2].toUpperCase() == firmaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (rabotaReestr != '') {
      if (value[3].toUpperCase() == rabotaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (coderabotaReestr != '') {
      if (value[4].toUpperCase() == coderabotaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (proektReestr != '') {
      if (value[5] == proektReestr*1) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sotrReestr != '') {
      if (value[6].toUpperCase() == sotrReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (ispolReestr != '') {
      if (value[7].toUpperCase() == ispolReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sumispolReestr != '') {
      if (value[8] == sumispolReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sumoplataReestr != '') {
      if (value[9] == sumoplataReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }    

    if (primReestr != '') {
      if (value[10].toUpperCase() == primReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (primMoyoReestr != '') {
      if (value[11].toUpperCase() == primMoyoReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }
    
    if (issuepartReestr != '') {
      if (value[12] == issuepartReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }
    
    if (withoutaccountReestr != '') {
      if (value[13] == withoutaccountReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (stoppedReestr != '') {
      if (value[14] == stoppedReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (evalRows.indexOf("no") == -1) {
      returnRows.push(value);
    }
  
  });
console.log(returnRows)
  return returnRows;
}


function getRecordsReestr() {
  const dateRee = dataBase.getDataRange().getValues().slice(1)
  const dataFilterMapRee = dateRee.filter(x => x[5] != '')
    .map(x => [getDateUprav(x[0]), getDateUprav(x[1]), x[2], x[3], x[4], x[5], x[6], x[15], x[16], x[17], x[21], x[20], x[23], x[22], x[18]])
 
  return dataFilterMapRee;
}


function UpdateRecordReestrGs(dateendReestr,datestartReestr, firmaReestr, rabotaReestr, coderabotaReestr, proektReestr, sotrReestr, ispolReestr, sumispolReestr, sumoplataReestr, primReestr, primMoyoReestr, issuepartReestr, withoutaccountReestr, stoppedReestr) {
  
  var getLastRowUpr = dataSheet.getLastRow();
  var table_values_upr = dataSheet.getRange(2, 1, getLastRowUpr - 1, 9).getValues();

  for (i = 0; i < table_values_upr.length; i++) {
    if (table_values_upr[i][5] == proektReestr) {
      dataSheet.getRange(i + 2, 1).setValue(dateendReestr);
      dataSheet.getRange(i + 2, 2).setValue(datestartReestr);
      dataSheet.getRange(i + 2, 3).setValue(firmaReestr);
      dataSheet.getRange(i + 2, 4).setValue(rabotaReestr);
      dataSheet.getRange(i + 2, 5).setValue(coderabotaReestr);
      dataSheet.getRange(i + 2, 6).setValue(proektReestr);
      dataSheet.getRange(i + 2, 7).setValue(sotrReestr);
      dataSheet.getRange(i + 2, 9).setValue(primReestr);
    }
 }
  var getLastRowRee = dataBase.getLastRow();
  var table_values_ree = dataBase.getRange(2, 1, getLastRowRee, 25).getValues();
  for (i = 0; i < table_values_ree.length; i++) {
    if (table_values_ree[i][5] == proektReestr) {

      console.log(primMoyoReestr)
      dataBase.getRange(i + 2, 16).setValue(ispolReestr);
      dataBase.getRange(i + 2, 17).setValue(sumispolReestr);
      dataBase.getRange(i + 2, 18).setValue(sumoplataReestr);
      dataBase.getRange(i + 2, 21).setValue(primMoyoReestr);
      dataBase.getRange(i + 2, 24).setValue(issuepartReestr);
      dataBase.getRange(i + 2, 23).setValue(withoutaccountReestr);
      dataBase.getRange(i + 2, 19).setValue(stoppedReestr);
    }
  } 
  return 'SUCCESS';
}





















