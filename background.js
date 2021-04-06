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
    
    case 'OVER_SELECT': {
      chrome.notifications.create('OVER_SELECT', {
        type: 'basic',
        iconUrl: 'assets/capture.png',
        title: 'Captured Too Much Text',
        message: 'Capture limits selections to 300 characters.',
        // requireInteraction: true,
      }, id => {});
    }

    case 'UNSUPPORTED_SITE': {
      chrome.notifications.create(`NON_FULLY_SUPPORTED_SITE_${request.site}`, {
        type: 'basic',
        iconUrl: 'assets/capture.png',
        title: `Capture does not fully Support ${request.site}`,
        message: 'Feel free to make captures, but please visit https://capture-maximilianjg.herokuapp.com to comment and add tags.',
      }, id => {});
    }
  
    default:
      break;
  }
  return true; // Tells chrome to leave the connection open long enough for the content script to get the response
});

chrome.notifications.onClicked.addListener(type => {
  if (type === 'UNAUTHED' || type === 'UNSUPPORTED_SITE') {
    chrome.tabs.create({
      active: true,
      url: 'https://capture-maximilianjg.herokuapp.com',
    });
  }
});