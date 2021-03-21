function makeHighlight(id) {
  const highlight = document.createElement('span');
  highlight.style.backgroundColor = '#FEFF05';
  highlight.style.position = 'relative';
  highlight.id = `capture_highlight`;
  highlight.setAttribute('data-commentId', id);
  return highlight;
}