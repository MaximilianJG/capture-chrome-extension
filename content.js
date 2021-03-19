const highlignts = {};

const captureButton = makeCaptureButton();

document.addEventListener('mouseup', e => {
  if (!window.getSelection) { return; } // return if browser doesn't support selection for some reason
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  if (e.target && (e.target.id === 'captureButton' || e.target.id === 'captureButtonImage')) { // highlight button clicked
    e.stopPropagation();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.getElementById('captureButton').remove();
    const highlignt = document.createElement('span');
    highlignt.style.backgroundColor = 'yellow';
    highlignt.style.position = 'relative';
    range.surroundContents(highlignt);
  } else if (selection) { // text highlighted 
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