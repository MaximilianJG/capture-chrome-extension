let pageHasHiglights = false;
let siteIsDisabled = false;

chrome.storage.sync.get(['disabledSites'], res => {
  siteIsDisabled = res.disabledSites && res.disabledSites.includes(window.location.hostname);
});

chrome.storage.onChanged.addListener(changes => {
  for (const key in changes) {
    if (key === 'disabledSites') {
      const disabledSites = changes[key].newValue;
      siteIsDisabled = disabledSites && disabledSites.includes(window.location.hostname);
    }
  }
});

const captureButton = makeCaptureButton();

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
  if (!window.getSelection || siteIsDisabled) { return; } // return if browser doesn't support selection for some reason
  const selection = rangy.getSelection();
  const range = selection.getRangeAt(0).cloneRange();
  if (isCaptureButton(e.target)) { // highlight button clicked
    e.stopPropagation();
    removeCaptureButtonFromDOM();
    if (pageHasHiglights) {
      postQuote({
        selectionText: selection.toString(),
        pageUrl: window.location.href,
      }, response => {
        const { id } = JSON.parse(response);
        const highlight = makeHighlight(id);
        highlight.appendChild(range.extractContents());
        range.insertNode(highlight);
        makeCommentPopup(id, popup => highlight.appendChild(popup));
      });
    } else {
      postSource({
        selectionText: selection.toString(),
        pageUrl: window.location.href,
        imageSrc: getArticleImage(),
        siteName: getSiteName(),
        title: getArticleTitle(),
      }, response => {
        const { source, quote } = JSON.parse(response);
        pageHasHiglights = true;
        const highlight = makeHighlight(quote.id);
        highlight.appendChild(range.extractContents());
        range.insertNode(highlight);
        makeCommentPopup(quote.id, popup => highlight.appendChild(popup));
        makeTagBox(source.id);
      });
    }
  } else if (selection.toString() && selection.anchorNode.nodeType === 3) { // text highlighted
    range.collapse(false);
    range.insertNode(captureButton);
  } else if (e.target && (e.target.className === 'capture-comment-popup-input' || e.target.className === 'capture-comment-popup-button')) {
    // Do nothing so that comment popup doesn't get ripped from dom
  } else { // any other click on the page
    removeCaptureButtonFromDOM();
    hideCommentPopups();
  }
});
