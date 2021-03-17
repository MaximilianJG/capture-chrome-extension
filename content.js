addEventListener('mouseup', e => {
  if (!window.getSelection) { return; }
  const selection = window.getSelection();
  const selectionText = selection.toString();
  if (selectionText) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const highlignt = document.createElement('span');
    highlignt.style.backgroundColor = 'yellow';
    highlignt.textContent = selectionText;
    range.insertNode(highlignt);
  }
});