function makeTag(tagText) {
  const tag = document.createElement('div');
  tag.className = 'capture-tag';
  tag.innerText = tagText;

  return tag;
}

function makeTagBox(sourceId) {
  const tagBox = getHTML('tagBox.html');
  tagBox.getElementsByClassName('capture-tag-box-title')[0].innerText = getArticleTitle();
  const form = tagBox.getElementsByTagName('form')[0];

  const tagList = get('tags');
  const dataList = tagBox.getElementsByTagName('datalist')[0];
  dataList.innerHTML = tagList.map(t => `<option value=${t.name} />`).join('');

  // input.addEventListener('input', e => {
  //   const val = e.target.value;
  //   const potentiallySelectedListItem = tagList.find(t => t.name === val);
  //   console.log(potentiallySelectedListItem);
  //   if (potentiallySelectedListItem) {
  //     postTags({ sourceId, tags: [val]}, res => {
  //       console.log(res);
  //     });
  //   }
  // });

  form.onsubmit = e => {
    e.preventDefault();
    const tag = form.getElementsByTagName('input')[0].value;
    const otherTags = [...document.getElementById('capture-tag-box-tag-list').childNodes].map(t => t.innerText);
    postTags({ sourceId, tags: [...otherTags, tag]}, res => {
      console.log(res);
      const newTag = makeTag(tag);
      document.getElementById('capture-tag-box-tag-list').appendChild(newTag);
      document.getElementById('capture-tag-box-input').value = '';
    });
  }

  document.body.appendChild(tagBox);
}