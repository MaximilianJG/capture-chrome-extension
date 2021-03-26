let siteIsDisabled = false;
let currentSite;

chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
  currentSite = new URL(tabs[0].url).hostname;
  chrome.storage.sync.get(['disabledSites'], res => {
    siteIsDisabled = res.disabledSites && res.disabledSites.includes(currentSite);
    if (siteIsDisabled) {
      document.getElementById('capture-title-status').innerText = 'Disabled';
      document.getElementById('capture-toggle').checked = false;
    }
  });
});

document.getElementById('capture-toggle').onchange = e => {
  if (e.target.checked) {
    document.getElementById('capture-title-status').innerText = 'Enabled';
    chrome.storage.sync.get(['disabledSites'], res => {
      if (res.disabledSites) {
        const newDisabledSites = res.disabledSites.filter(s => s !== currentSite);
        console.log(newDisabledSites);
        chrome.storage.sync.set({ disabledSites: newDisabledSites });
      }
    });
  } else {
    document.getElementById('capture-title-status').innerText = 'Disabled';
    chrome.storage.sync.get(['disabledSites'], res => {
      const newDisabledSites = res.disabledSites ? [...res.disabledSites, currentSite] : [currentSite];
      console.log(newDisabledSites);
      chrome.storage.sync.set({ disabledSites: newDisabledSites });
    });
  }
}