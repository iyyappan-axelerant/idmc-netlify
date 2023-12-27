export const getURL = (socialMedia) => {
  const url = {
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  }[socialMedia];

  return url;
};
