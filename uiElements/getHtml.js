function getHTML(fileName, cb, type = 'div') {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", chrome.extension.getURL(`/uiElements/${fileName}`), true);
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) {
      const el  = document.createElement(type);
      el.innerHTML = xmlHttp.responseText;
      cb(el);
    }
  }
  xmlHttp.send(null);
}