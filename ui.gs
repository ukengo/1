function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu('Мое меню')
  .addItem('Мое меню', 'myFunction')
  .addToUi(); 
  
}
