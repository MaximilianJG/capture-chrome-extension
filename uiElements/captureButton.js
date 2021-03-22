function makeCaptureButton() {
  const captureButton = document.createElement('button');
  captureButton.id = 'capture-button';
  captureButton.innerHTML = `
    <img
      src='${chrome.runtime.getURL('assets/capture32.png')}'
      alt='capture'
      id='capture-button-image'
    />
  `;

  return captureButton;
}

function removeCaptureButtonFromDOM() {
  const button = document.getElementById('capture-button');
    if (button) {
      button.remove();
    }
}
