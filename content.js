const buttonDelay = 250; // milliseconds
const onCapture = window.location.hostname === 'capture-maximilianjg.herokuapp.com';
const unsupportedSites = ['www.facebook.com', 'twitter.com'];
const onUnspportedSite = unsupportedSites.includes(window.location.hostname);
let pageHasHiglights = false;
let siteIsDisabled = false;
let globalDisabled = false;

chrome.storage.sync.get(['disabledSites', 'globalDisabled'], res => {
  siteIsDisabled = res.disabledSites && res.disabledSites.includes(window.location.hostname);
  globalDisabled = res.globalDisabled;
  if (siteIsDisabled) {
    chrome.runtime.sendMessage({ type: "EXTENSION_OFF", payload: window.location.hostname });
  }
});

chrome.storage.onChanged.addListener(changes => {
  for (const key in changes) {
    if (key === 'disabledSites') {
      const disabledSites = changes[key].newValue;
      siteIsDisabled = disabledSites && disabledSites.includes(window.location.hostname);
      if (siteIsDisabled) {
        removeCaptureButtonFromDOM();
      }
    } else if (key === 'globalDisabled') {
      globalDisabled = changes[key].newValue;
      if (globalDisabled) {
        removeCaptureButtonFromDOM();
      }
    }
  }
});

const captureButton = makeCaptureButton();

const insertButton = () => {
  const selection = rangy.getSelection();
  selection.trim();
  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  range.insertNode(captureButton);
}

const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const debouncedInsertButton = debounce(insertButton, buttonDelay);

const insertHiglight = (range, id) => {
  const highlight = makeHighlight(id);
  const contents = range.extractContents();
  highlight.appendChild(contents);
  range.insertNode(highlight);
  makeCommentPopup(id, popup => highlight.appendChild(popup));
}

const getSelectionParentElement = () => {
  let parentEl = null, sel;
  if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
          parentEl = sel.getRangeAt(0).commonAncestorContainer;
          if (parentEl.nodeType != 1) {
              parentEl = parentEl.parentNode;
          }
      }
  } else if ( (sel = document.selection) && sel.type != "Control") {
      parentEl = sel.createRange().parentElement();
  }
  return parentEl;
}

const isCaptureButton = clickTarget => {
  return clickTarget && (
    clickTarget.id === 'capture-button'
    || clickTarget.id === 'capture-button-image'
    || clickTarget.id === 'capture-button-image-path1'
    || clickTarget.id === 'capture-button-image-path2'
  );
}

const makeHighlightRed = () => {
  const highlightStyle = document.getElementById('capture-extension-highligt-error');
  if (highlightStyle) { return; }
  const style = document.createElement('style');
  style.type = 'text/css';
  style.id = 'capture-extension-highligt-error';
  style.innerHTML = `
    *::selection {
      background-color: #FFCCCB;
    }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
}

const removeRedHighlight = () => {
  const highlightStyle = document.getElementById('capture-extension-highligt-error');
  if (highlightStyle) {
    highlightStyle.remove();
  }
}

document.addEventListener('mousedown', e => {
  removeRedHighlight();
});

document.addEventListener('mouseup', e => {
  if (onUnspportedSite) {
    chrome.runtime.sendMessage({ type: "UNSUPPORTED_SITE", site: window.location.hostname });
    return;
  }
  if (!window.getSelection || siteIsDisabled || globalDisabled|| onCapture) { return; } // return if browser doesn't support selection for some reason
  const selection = rangy.getSelection();
  const selectionText = selection.toString();
  if (selectionText && selectionText.length > 300) {
    makeHighlightRed();
    chrome.runtime.sendMessage({ type: "OVER_SELECT", });
    return;
   } else {
     removeRedHighlight();
   }
  const range = selection.getRangeAt(0).cloneRange();
  if (isCaptureButton(e.target)) { // highlight button clicked
    e.stopPropagation();
    removeCaptureButtonFromDOM();
    if (pageHasHiglights) {
      postQuote({
        selectionText,
        pageUrl: getPageURl(selection),
      }, response => {
        const { id } = JSON.parse(response);
        insertHiglight(range, id);
        selection.removeAllRanges();
      });
    } else {
      postSource({
        selectionText,
        pageUrl: getPageURl(selection),
        imageSrc: getArticleImage(selection),
        siteName: getSiteName(selection),
        title: getArticleTitle(selection),
      }, response => {
        const { source, quote } = JSON.parse(response);
        pageHasHiglights = true;
        insertHiglight(range, quote.id);
        makeTagBox(source.id);
        selection.removeAllRanges();
      });
    }
  } else if (selectionText && selection.anchorNode.nodeType === 3) { // text highlighted
    debouncedInsertButton();
  } else if (e.target && (e.target.className === 'capture-comment-popup-input' || e.target.className === 'capture-comment-popup-button')) {
    // Do nothing so that comment popup doesn't get ripped from dom
  } else { // any other click on the page
    removeCaptureButtonFromDOM();
    hideCommentPopups();
  }
});
