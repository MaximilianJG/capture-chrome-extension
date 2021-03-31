const genericArticleImage = () => {
  // use the open graph image if available, else grab the first image;
  const metaTags = [...document.getElementsByTagName('meta')];
  for (const i in metaTags) {
    const tag = metaTags[i];
    const property = tag.getAttribute('property');
    if (property === 'og:image') {
      return tag.getAttribute('content');
    }
  }

  const imgNodes = document.getElementsByTagName('img');
  if (imgNodes.length) {
    const firstImg = imgNodes[0];
    return firstImg.src;
  }

  return; // do you want a default value if no images are found? Null, empty string, undefined?
}

const genericSiteName = () => {
  //NOTE: this doesn't seem to be standard anywhere, so I am going to try to use facebooks openGraph meta tags
  // as a catch all I will just use the hostname.
  const metaTags = [...document.getElementsByTagName('meta')];
  for (const i in metaTags) {
    const tag = metaTags[i];
    const property = tag.getAttribute('property');
    if (property === 'og:site_name') {
      return tag.getAttribute('content');
    }
  }

  return window.location.hostname;
}

const genericArticleTitle = () => {
  // grab the title tag, if not present try open graph
  const pageHead = document.getElementsByTagName('head')[0];
  const titles = pageHead.getElementsByTagName('title');
  if (titles.length) {
    return titles[0].text;
  }

  const metaTags = [...document.getElementsByTagName('meta')];
  for (const i in metaTags) {
    const tag = metaTags[i];
    const property = tag.getAttribute('property');
    if (property === 'og:title') {
      return tag.getAttribute('content');
    }
  }

  return; // What would you like for a default here?
}

const genericPageUrl = () => {
  return window.location.href;
}