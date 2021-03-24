let pageHasHiglights = false;

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
  if (!window.getSelection) { return; } // return if browser doesn't support selection for some reason
  const selection = window.getSelection();
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
        range.surroundContents(highlight);
        const parent = getSelectionParentElement();
        parent.style.position = 'relative';
        parent.appendChild(makeCommentPopup(id));
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
        range.surroundContents(highlight);
        const parent = getSelectionParentElement();
        parent.style.position = 'relative';
        parent.appendChild(makeCommentPopup(quote.id));
        makeTagBox(source.id);
      });
    }
  } else if (selection.toString() && selection.anchorNode.nodeType === 3) { // text highlighted 
    range.endContainer.parentNode.insertBefore(captureButton, range.endContainer.nextSibling);
  } else if (e.target && (e.target.className === 'capture-comment-popup-input' || e.target.className === 'capture-comment-popup-button')) {
    // Do nothing so that comment popup doesn't get ripped from dom
  } else { // any other click on the page
    removeCaptureButtonFromDOM();
    hideCommentPopups();
  }
});
