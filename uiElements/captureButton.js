function makeCaptureButton() {
  const captureButton = document.createElement('button');
  captureButton.id = 'captureButton';
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
