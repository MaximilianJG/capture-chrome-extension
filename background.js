const getCookie = (cb = () => ({})) => {
  chrome.cookies.getAll({ domain: 'capture-maximilianjg.herokuapp.com' }, cookies => {
    if (cookies.length) {
      const userIdCookie = cookies.find(c => c.name === 'capture_user_id');
      if (userIdCookie) {
        cb(userIdCookie);
        return
      }
    }
    cb(null);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;
  switch (type) {
    case 'GET_COOKIE':
      getCookie(cookie => {
        if (cookie) {
          sendResponse({ type: 'COOKIE', cookie, })
        } else {
          chrome.notifications.create('UNAUTHED', {
            type: 'basic',
            iconUrl: 'assets/capture.png',
            title: 'Capture is not logged in.',
            message: 'Please go to https://capture-maximilianjg.herokuapp.com to sign in.',
            // requireInteraction: true,
          }, id => {});
        }
      });
      break;

    case 'EXTENSION_OFF': {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/capture.png',
        title: 'Capture is Disabled',
        message: 'Please open the popup menu to enable capturing.',
        // requireInteraction: true,
      }, id => {});
    }
  
    default:
      break;
  }
  return true; // Tells chrome to leave the connection open long enough for the content script to get the response
});

chrome.notifications.onClicked.addListener(type => {
  if (type === 'UNAUTHED') {
    chrome.tabs.create({
      active: true,
      url: 'https://capture-maximilianjg.herokuapp.com',
    });
  }
});