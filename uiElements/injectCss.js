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