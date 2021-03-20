const highlignts = {};

const captureButton = makeCaptureButton();
const highlight = makeHighlight();

document.addEventListener('mouseup', e => {
  if (!window.getSelection) { return; } // return if browser doesn't support selection for some reason
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  if (e.target && (e.target.id === 'captureButton' || e.target.id === 'captureButtonImage')) { // highlight button clicked
    e.stopPropagation();
    removeCaptureButtonFromDOM();
    postSelection({
      selectionText: selection.toString(),
      pageUrl: window.location.href,
      imageSrc: getArticleImage(),
      siteName: getSiteName(),
      title: getArticleTitle(),
    });
    range.surroundContents(highlight);
  } else if (selection.toString()) { // text highlighted 
    if (selection.anchorNode.nodeType === 3) { // is a text node
      const contents = range.extractContents();
      range.deleteContents();
      range.insertNode(captureButton);
      range.insertNode(contents);
    } else {
      console.log(selection.anchorNode.nodeType, selection.anchorNode.nodeName);
    }
  } else { // any other click on the page
    removeCaptureButtonFromDOM();
  }
});