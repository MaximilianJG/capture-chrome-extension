function hideCommentPopups() {
  const commentPopups = [...document.getElementsByClassName('capture-comment-popup')];
  commentPopups.forEach(popup => {
    popup.style.display = 'none';
  });
}

function makeCommentPopup(id, cb) {
  getHTML('commentPopup.html', popup => {
    popup.id = `capture-comment-popup-${id}`;
    popup.className = 'capture-comment-popup';
    const form = popup.getElementsByTagName('form')[0];
    const trashButton = popup.getElementsByTagName('button')[0];
  
    trashButton.onclick = e => {
      e.stopPropagation();
      deleteQuote(id, res => {
        document.getElementById(`capture-highlight-${id}`).classList.add('deleted');
      });
    }
  
    form.onsubmit = e => {
      e.preventDefault();
      const comment = form.getElementsByTagName('input')[0].value;
      postComment({
        quoteId: id,
        comment
      }, res => {
        form.getElementsByTagName('input')[0].value = '';
        hideCommentPopups();
      });
    }
    cb(popup);
  });
}

function showCommentPopup(id) {
  const popup = document.getElementById(`capture-comment-popup-${id}`);
  popup.style.display = 'block';
}