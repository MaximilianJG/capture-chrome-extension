function makeCaptureButton() {
  const captureButton = document.createElement('button');
  captureButton.id = 'capture-button';
  captureButton.innerHTML = `
    <img
      src='${chrome.runtime.getURL('assets/capture32.png')}'
      alt='capture'
      id='captureButtonImage'
      width='32'
      height='32'
      style='padding: 6px 3px 5px'
    />
  `;

  return captureButton;
}

function removeCaptureButtonFromDOM() {
  const button = document.getElementById('captureButton');
    if (button) {
      button.remove();
    }
}
