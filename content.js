const buttonDelay = 250; // milliseconds
const onCapture = window.location.hostname === 'capture-maximilianjg.herokuapp.com';
let pageHasHiglights = false;
let siteIsDisabled = false;

chrome.storage.sync.get(['disabledSites'], res => {
  siteIsDisabled = res.disabledSites && res.disabledSites.includes(window.location.hostname);
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

document.addEventListener('mouseup', e => {
  if (!window.getSelection || siteIsDisabled || onCapture) { return; } // return if browser doesn't support selection for some reason
  const selection = rangy.getSelection();
  const selectionText = selection.toString();
  const range = selection.getRangeAt(0).cloneRange()
  if (isCaptureButton(e.target)) { // highlight button clicked
    e.stopPropagation();
    removeCaptureButtonFromDOM();
    if (pageHasHiglights) {
      postQuote({
        selectionText,
        pageUrl: window.location.href,
      }, response => {
        const { id } = JSON.parse(response);
        insertHiglight(range, id);
        selection.removeAllRanges();
      });
    } else {
      postSource({
        selectionText,
        pageUrl: window.location.href,
        imageSrc: getArticleImage(),
        siteName: getSiteName(),
        title: getArticleTitle(),
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
