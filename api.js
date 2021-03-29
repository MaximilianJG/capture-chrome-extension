const baseUrl = 'https://capture-maximilianjg.herokuapp.com/api/v1/';
// const baseUrl = 'https://92926f878562.ngrok.io/api/v1/';
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
  http.setRequestHeader('Content-Type', 'application/json');

  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      cb(http.response);
    }
  }
  http.send(JSON.stringify(body));
}

function patch(endpoint, body, cb = () => ({})) {
  const http = new XMLHttpRequest();
  const url = `${baseUrl}${endpoint}`;
  http.open('PATCH', url, true);
  http.setRequestHeader("Accept", "application/json");
  http.setRequestHeader('Content-Type', 'application/json');

  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      cb(http.response);
    }
  }
  http.send(JSON.stringify(body));
}

function get(endpoint, cb) {
  const http = new XMLHttpRequest();
  const url = `${baseUrl}${endpoint}`;
  http.open("GET", url, true);
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      cb(JSON.parse(http.responseText));
    }
  }
  http.send(null);
}

function del(endpoint, cb = () => ({})) {
  const http = new XMLHttpRequest();
  const url = `${baseUrl}${endpoint}`;
  http.open("DELETE", url, false);

  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      cb(http.response);
    }
  }

  http.send(null);
}

function postSource({
  selectionText, pageUrl, imageSrc, siteName, title,
}, cb) {
  post('sources', {
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

function postQuote({ selectionText, pageUrl }, cb) {
  post('quotes', {
    snippet_post_request: {
      user_id: userId,
      quote_content: selectionText,
      url_of_quote: pageUrl,
    }
  }, cb);
}

function postComment({ quoteId, comment }, cb) {
  post('comments', {
    comment_post_request: {
      user_id: userId,
      quote_id: quoteId,
      comment,
    }
  }, cb);
}

function postTags({ sourceId, tags }, cb) {
  patch(`sources/${sourceId}`, {
    tags,
  }, cb);
}

function deleteQuote(postId, cb) {
  del(`quotes/${postId}`, cb);
}