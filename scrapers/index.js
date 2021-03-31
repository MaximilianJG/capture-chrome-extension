const hostname = window.location.hostname;

const getArticleImage = selection => {
  if (hostname === 'www.facebook.com') {
    return facebookArticleImage(selection) || genericArticleImage();
  }

  return genericArticleImage();
}

const getSiteName = selection => {
  if (hostname === 'www.facebook.com') {
    return facebookSiteName(selection) || genericSiteName();
  }

  return genericSiteName();
}

const getArticleTitle = selection => {
  if (hostname === 'www.facebook.com') {
    return facebookArticleTitle(selection) || genericArticleTitle();
  }

  return genericArticleTitle();
}

const getPageURl = selection => {
  if (hostname === 'www.facebook.com') {
    return facebookPostUrl(selection) || genericPageUrl();
  }

  return genericPageUrl();
}