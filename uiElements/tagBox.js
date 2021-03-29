function makeTag(sourceId, tagText) {
  const tag = document.createElement('div');
  tag.className = `capture-tag capture-tag-${tagText}`;
  tag.innerText = tagText;
  
  const tagCancel = document.createElement('span');
  tagCancel.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  `;
  tagCancel.className = 'capture-tag-cancel';
  tagCancel.onclick = () => {
    const allTags = [...document.getElementById('capture-tag-box-tag-list').childNodes].map(t => t.innerText.trim());
    const filteredTags = allTags.filter(t => t !== tagText);
    postTags({ sourceId, tags: filteredTags}, res => {
      const badTags = document.getElementsByClassName(`capture-tag-${tagText}`);
      [...badTags].forEach(bt => bt.remove());
    });
  }

  tag.appendChild(tagCancel);

  return tag;
}

function makeTagBox(sourceId) {
  getHTML('tagBox.html', tagBox => {
    tagBox.getElementsByClassName('capture-tag-box-title')[0].innerText = getArticleTitle();
    const form = tagBox.getElementsByTagName('form')[0];
  
    get('tags', tagList => {
      const uniqueTags = tagList.map(t => t.name).filter((value, index, self) => self.indexOf(value) === index);
      $(form).find('#capture-tag-box-input').autocomplete({
        source: uniqueTags,
        select: (e, ui) => {
          if (ui.item && ui.item.value) {
            const tag = ui.item.value;
            const otherTags = [...document.getElementById('capture-tag-box-tag-list').childNodes].map(t => t.innerText.trim());
            postTags({ sourceId, tags: [...otherTags, tag]}, res => {
              const newTag = makeTag(sourceId, tag);
              document.getElementById('capture-tag-box-tag-list').appendChild(newTag);
              document.getElementById('capture-tag-box-input').value = '';
            });
          }
        }
      });

      form.onsubmit = e => {
        e.preventDefault();
        const tag = form.getElementsByTagName('input')[0].value;
        const otherTags = [...document.getElementById('capture-tag-box-tag-list').childNodes].map(t => t.innerText.trim());
        postTags({ sourceId, tags: [...otherTags, tag]}, res => {
          const newTag = makeTag(sourceId, tag);
          document.getElementById('capture-tag-box-tag-list').appendChild(newTag);
          document.getElementById('capture-tag-box-input').value = '';
        });
      }
    
      document.body.appendChild(tagBox);
    });
  });
}