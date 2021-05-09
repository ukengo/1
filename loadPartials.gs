function loadPartialHTML_(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
}

function loadArriwalWasteView() {
  return loadPartialHTML_('arriwalWaste');
}


function loadAddPrivateCommissionView() {
  return loadPartialHTML_('privateCommission');
}

function loadNewProektView() {
  return loadPartialHTML_('newProekt');
}

function loadBuhgalterView() {
  return loadPartialHTML_('BUHGALTER');
}

function loadTableUpravlenieView() {
  return loadPartialHTML_('tableUpravlenie');
}

function loadTableFinanceView() {
  return loadPartialHTML_('finance');
}

function loadTableReestrView() {
  return loadPartialHTML_('tableReestr');
}

function loadTableJobView() {
  return loadPartialHTML_('job');
}
