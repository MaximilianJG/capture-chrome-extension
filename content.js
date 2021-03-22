let pageHasHiglights = false;

const captureButton = makeCaptureButton();

function getSelectionParentElement() {
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


document.addEventListener('mouseup', e => {
  if (!window.getSelection) { return; } // return if browser doesn't support selection for some reason
  const selection = window.getSelection();
  const range = selection.getRangeAt(0).cloneRange();
  if (e.target && (e.target.id === 'capture-button' || e.target.id === 'capture-button-image')) { // highlight button clicked
    e.stopPropagation();
    removeCaptureButtonFromDOM();
    postSelection({
      selectionText: selection.toString(),
      pageUrl: window.location.href,
      imageSrc: getArticleImage(),
      siteName: getSiteName(),
      title: getArticleTitle(),
    }, response => {
      const { id } = JSON.parse(response);
      pageHasHiglights = true;
      const highlight = makeHighlight(id);
      range.surroundContents(highlight);
      const parent = getSelectionParentElement();
      parent.style.position = 'relative';
      parent.appendChild(makeCommentPopup(id));
      makeTagBox();
    });
  } else if (selection.toString() && selection.anchorNode.nodeType === 3) { // text highlighted 
    range.endContainer.parentNode.insertBefore(captureButton, range.endContainer.nextSibling);
  } else if (e.target && (e.target.className === 'capture-comment-popup-input')) {
    // Do nothing so that comment popup doesn't get ripped from dom
  } else { // any other click on the page
    removeCaptureButtonFromDOM();
    hideCommentPopups();
  }
});
