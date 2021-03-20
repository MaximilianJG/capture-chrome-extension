const getCookie = (cb = () => ({})) => {
  chrome.cookies.getAll({ domain: 'capture-maximilianjg.herokuapp.com' }, cookies => {
    if (cookies.length) {
      cb(cookies[0]);
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;
  switch (type) {
    case 'GET_COOKIE':
      getCookie(cookie => sendResponse({ type: 'COOKIE', cookie, }));
      break;
  
    default:
      break;
  }
  return true; // Tells chrome to leave the connection open long enough for the content script to get the response
});