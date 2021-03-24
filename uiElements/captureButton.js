function makeCaptureButton() {
  const captureButton = document.createElement('button');
  captureButton.id = 'capture-button';
  // captureButton.innerHTML = `
  //   <img
  //     src='${chrome.runtime.getURL('assets/capture32.png')}'
  //     alt='capture'
  //     id='capture-button-image'
  //   />
  // `;
  captureButton.innerHTML = `
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 406 373"
      class="cature-icon-svg"
      id="capture-button-image"
      xml:space="preserve"
    >
      <g>
      <path d="M75.2,110.2h50.2H299c21.7,0,39.3-17.6,39.3-39.3c0-21.7-17.6-39.3-39.3-39.3H175.1C166.3,12.9,147.3,0,125.4,0H55.1
        c-3.3,0-6.5,0.3-9.6,0.8C43,0.3,40.3,0,37.6,0h0C16.8,0,0,16.8,0,37.6v145.2c0,20.8,16.8,37.6,37.6,37.6h0
        c20.8,0,37.6-16.8,37.6-37.6V110.2z"/>
      <path d="M368.4,152.7L368.4,152.7c-20.8,0-37.6,16.8-37.6,37.6v72.6h-50.2H104c-21.7,0-39.3,17.6-39.3,39.3
        c0,21.7,17.6,39.3,39.3,39.3h126.9c8.8,18.6,27.8,31.5,49.8,31.5h70.3c3.3,0,6.5-0.3,9.6-0.8c2.6,0.5,5.2,0.8,7.9,0.8h0
        c20.8,0,37.6-16.8,37.6-37.6V190.3C406,169.5,389.2,152.7,368.4,152.7z"/>
      </g>
    </svg>
  `;

  return captureButton;
}

function removeCaptureButtonFromDOM() {
  const button = document.getElementById('capture-button');
    if (button) {
      button.remove();
    }
}
