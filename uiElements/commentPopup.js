function makeCommentPopup(id) {
  const popup = document.createElement('div');
  popup.id = `capture-comment-form-${id}`;
  popup.style.position = 'absolute';
  popup.style.left = 'calc(50% - 100px)';
  popup.style.top = '-45px';
  // popup.style.width = '144px';
  // popup.style.height = '30px';
  popup.style.background = '#FFFFFF';
  popup.style.border = '1px solid #D8D7D5';
  popup.style.boxSizing = 'border-box';
  popup.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
  popup.style.borderRadius = '2px';
  popup.style.padding = '0.5rem';

  popup.innerHTML = `
    <input
      type='text'
      id='capture-comment-input-${id}'
      style='background: #F6F8FA; border: 0.5px solid #D8D7D5; box-sizing: border-box; border-radius: 2px;'
    />
    <button>Trash</button>
  `;
  return popup;
}

function removeCommentPopupFromDOM() {
}