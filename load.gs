const URLREESTR = 'https://docs.google.com/spreadsheets/d/1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ/edit#gid=627167327'
const URLUPRAV = 'https://docs.google.com/spreadsheets/d/1xdJVfecdUCgtF_SHiC_IHbl8FP0Agl3slV_osyj6kxo/edit#gid=0'
const URLBUH = 'https://docs.google.com/spreadsheets/d/1bd-YnMzDO8An3pGAniQXbFAPC1IWq5SSBlHK0pW2hVI/edit#gid=1139650230'
const URLTERMINAL = 'https://docs.google.com/spreadsheets/d/1af9HbQ5cVnX_buV3rKjEvwuAVvSS-PuuDEHWrBqytcw/edit#gid=797242095'
const URLKARANTIN = 'https://docs.google.com/spreadsheets/d/1OWkpbCN9oDoWtUm52ZdcNGTwiXp7qNgMxBYC10PmAsY/edit#gid=797242095'

const SSUPRAV = SpreadsheetApp.openByUrl(URLUPRAV)
const SSREESTR = SpreadsheetApp.openByUrl(URLREESTR)
const SSBUH = SpreadsheetApp.openByUrl(URLBUH)
const SSTERMINAL = SpreadsheetApp.openByUrl(URLTERMINAL)
const SSKARANTIN = SpreadsheetApp.openByUrl(URLKARANTIN)

const dataSheet = SSUPRAV.getSheetByName("База")
const dataSpiski = SSUPRAV.getSheetByName("Списки")
const dataFinance = SSREESTR.getSheetByName("Финансы")
const dataSpiskiReestr = SSREESTR.getSheetByName("Списки")
const dataVrabote = SSREESTR.getSheetByName("В работе")
const dataArriwal = SSREESTR.getSheetByName("Прочие поступления")
const dataWaste = SSREESTR.getSheetByName("Прочие траты")
const dataBase = SSREESTR.getSheetByName("База")
const dataTerminal = SSTERMINAL.getSheetByName("Оплата")
const dataKarantin = SSKARANTIN.getSheetByName("Оплата")

function doGet() {
  return HtmlService.createTemplateFromFile('main-HTML').evaluate()
    //Responsive
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Portal Friedman')
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  
  .getContent();
}
