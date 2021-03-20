const baseUrl = 'https://capture-maximilianjg.herokuapp.com/api/v1/quotes';
let userId;

chrome.runtime.sendMessage({ type: "GET_COOKIE" }, response => {
  if (response && response.type === 'COOKIE' && response.cookie) {
    userId = response.cookie.value; // this value is encryped and is causing issues
  }
});

function post(endpoint, body, cb = () => ({})) {
  const http = new XMLHttpRequest();
  const url = `${baseUrl}${endpoint}`;
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = () => {
    cb(http.response);
  }
  http.send(JSON.stringify(body));
}

function postSelection({
  selectionText, pageUrl, imageSrc, siteName, title,
}, cb) {
  post('', {
    general_post_request: {
      user_id: userId,
      quote_content: selectionText,
      url_of_quote: pageUrl,
      source_title: title,
      website: siteName,
      url_of_website: pageUrl,
      source_photo_url: imageSrc,
    }
  }, cb);
}

function postSnippet({ selectionText, pageUrl }, cb) {
  post('', {
    snippet_post_request: {
      user_id: userId,
      quote_content: selectionText,
      url_of_quote: pageUrl,
    }
  }, cb);
}

function postComment({ selectionText, pageUrl, comment }, cb) {
  post('', {
    comment_post_request: {
      user_id: userId,
      quote_content: selectionText,
      url_of_quote: pageUrl,
      comment,
    }
  }, cb);
}

function postTags({ pageUrl, tags }, cb) {
  post('', {
    tag_post_request: {
      user_id: userId,
      url_of_quote: pageUrl,
      tags,
    }
  }, cb);
}

function deleteSnippet({ selectionText, pageUrl }, cb) {
  post('', {
    snippet_delete_post_request: {
      user_id: userId,
      quote_content: selectionText,
      url_of_quote: pageUrl,
    }
  }, cb);
}