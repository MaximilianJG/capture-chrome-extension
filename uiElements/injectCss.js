const appendSheetToHead = responseText => {
  const style = document.createElement('style');
  if (style.styleSheet) {
      style.styleSheet.cssText = responseText;
  } else {
      style.appendChild(document.createTextNode(responseText));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}

const cssRequest = new XMLHttpRequest();
cssRequest.open("GET", chrome.extension.getURL(`/uiElements/style.css`), true);
cssRequest.onreadystatechange = () => {
  if (cssRequest.readyState === 4) {
    appendSheetToHead(cssRequest.responseText);
  }
}
cssRequest.send(null);

const jqueryCssRequest = new XMLHttpRequest();
jqueryCssRequest.open("GET", chrome.extension.getURL(`/thirdParty/jquery-ui.min.css`), true);
jqueryCssRequest.onreadystatechange = () => {
  if (jqueryCssRequest.readyState === 4) {
    appendSheetToHead(jqueryCssRequest.responseText);
  }
}
jqueryCssRequest.send(null);
