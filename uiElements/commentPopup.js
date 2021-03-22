function makeCommentPopup(id) {
  const popup = getHTML('commentPopup.html');
  popup.id = `capture-comment-popup-${id}`;
  popup.className = 'capture-comment-popup';
  const form = popup.getElementsByTagName('form')[0];
  const trashButton = popup.getElementsByTagName('button')[0];
  trashButton.onclick = () => {
    console.log('deteting', id);
    // deleteSnippet();
  }

  form.onsubmit = e => {
    e.preventDefault();
    const comment = form.getElementsByTagName('input')[0].value;
    console.log(comment, id);
    // postComment();
  }
  return popup;
}

function hideCommentPopups() {
  const commentPopups = [...document.getElementsByClassName('capture-comment-popup')];
  commentPopups.forEach(popup => {
    popup.style.display = 'none';
  });
}

function showCommentPopup(id) {
  const popup = document.getElementById(`capture-comment-popup-${id}`);
  popup.style.display = 'block';
}