function makeCaptureButton() {
  const captureButton = document.createElement('button');
  captureButton.id = 'captureButton';
  captureButton.innerHTML = `
    <img
      src='${chrome.runtime.getURL('assets/capture16.png')}'
      alt='capture'
      id='captureButtonImage'
    />
  `;
  captureButton.style.position = 'absolute';
  captureButton.style.backgroundColor = '#FFFFFF';
  captureButton.style.border = '0.5px solid #D8D7D5';
  captureButton.style.borderRadius = '100%';
  captureButton.style.boxSizing = 'border-box';
  captureButton.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';

  return captureButton;
}

function removeCaptureButtonFromDOM() {
  const button = document.getElementById('captureButton');
    if (button) {
      button.remove();
    }
}