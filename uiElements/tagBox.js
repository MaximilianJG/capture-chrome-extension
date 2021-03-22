function makeTagBox() {
  const tagBox = getHTML('tagBox.html');
  tagBox.getElementsByClassName('capture-logo')[0].src = chrome.runtime.getURL('assets/capture32.png');
  tagBox.getElementsByClassName('capture-tag-box-title')[0].innerText = getArticleTitle();
  // popup.id = `capture-comment-popup-${id}`;
  // popup.className = 'capture-comment-popup';
  // const form = popup.getElementsByTagName('form')[0];
  // const trashButton = popup.getElementsByTagName('button')[0];
  // trashButton.onclick = () => {
  //   console.log('deteting', id);
  //   // deleteSnippet();
  // }

  // form.onsubmit = e => {
  //   e.preventDefault();
  //   const comment = form.getElementsByTagName('input')[0].value;
  //   console.log(comment, id);
  //   // postComment();
  // }
  document.body.appendChild(tagBox);
}