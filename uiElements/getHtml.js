function getHTML(fileName, type = 'div') {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", chrome.extension.getURL(`/uiElements/${fileName}`), false);
  xmlHttp.send(null);

  const el  = document.createElement(type);
  el.innerHTML = xmlHttp.responseText;
  return el;
  // document.body.insertBefore (sidebar, document.body.firstChild);
}