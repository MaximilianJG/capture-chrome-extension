const cssRequest = new XMLHttpRequest();
cssRequest.open("GET", chrome.extension.getURL(`/uiElements/style.css`), false);
cssRequest.send(null);
const style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = cssRequest.responseText;
} else {
    style.appendChild(document.createTextNode(cssRequest.responseText));
}

document.getElementsByTagName('head')[0].appendChild(style);

const jqueryCssRequest = new XMLHttpRequest();
jqueryCssRequest.open("GET", chrome.extension.getURL(`/thirdParty/jquery-ui.min.css`), false);
jqueryCssRequest.send(null);
const jqueryStyle = document.createElement('style');

if (jqueryStyle.styleSheet) {
  jqueryStyle.styleSheet.cssText = jqueryCssRequest.responseText;
} else {
  jqueryStyle.appendChild(document.createTextNode(jqueryCssRequest.responseText));
}

document.getElementsByTagName('head')[0].appendChild(jqueryStyle);