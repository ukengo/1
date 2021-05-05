function insertTermKar(data) {

  dataIns = [[data[0], data[5], '', data[1], true]]
  if (data[4] === 'терминал') {
    dataTerminal.insertRowAfter(2);
    dataTerminal.getRange(3, 1, 1, 5).setValues(dataIns)
  }
  if (data[4] === 'карантин') {
    console.log('kkk')
    dataKarantin.insertRowAfter(2);
    dataKarantin.getRange(3, 1, 1, 5).setValues(dataIns)
  }
}


function vReestrTerminalKarantin(data) {
  const sheetReestrTrata = dataWaste
  // получаем строчний массив счетов для поиска
  let valueVhodString = [[data[0], data[5], '', data[1]]]
  //  берем массив из таблицы Реестр оформлений, лист Прочие траты
  let valueReestrTrata = sheetReestrTrata.getDataRange().getValues().slice(1);
  //  берем столбец с назначениями платежей
  let valueReestrTrataNaznechenie = valueReestrTrata.map(x => x[3]);
  //  берем столбец с назначениями платежей из таблицы Списание терминал
  let valueVhodSchet = data[5]

  if (data[4] === 'терминал') {
    if (valueReestrTrataNaznechenie.toString().includes(valueVhodSchet) == false) {
      let res = [Utilities.formatDate(new Date(data[0]), 'Europe/Kiev', 'dd.MM.yyyy'), data[1], 'ооо', 'АВТОМОБІЛЬНІ ІНТЕЛЕКТУАЛЬНІ ТЕХНОЛОГІЇ ' + 'пп' + data[5]]
      sheetReestrTrata.appendRow(res)
    }
  }
  if (data[4] === 'карантин') {
    console.log('dd')
    if (valueReestrTrataNaznechenie.toString().includes(valueVhodSchet) == false) {
      let res = [Utilities.formatDate(new Date(data[0]), 'Europe/Kiev', 'dd.MM.yyyy'), data[1], 'ооо', 'КАРАНТИН ' + 'пп' + data[5]]
      sheetReestrTrata.appendRow(res)

    }
  }
}
