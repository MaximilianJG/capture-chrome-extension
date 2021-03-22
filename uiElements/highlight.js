function makeHighlight(id) {
  const highlight = document.createElement('span');
  highlight.id = `capture-highlight-${id}`;
  highlight.className = `capture-highlight`;
  highlight.setAttribute('data-commentId', id);
  highlight.onclick = () => showCommentPopup(id);
  return highlight;
}