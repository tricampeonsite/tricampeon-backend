export default (event) => {
    const { title, url, img, league } = event;
    const urlBase = "https://star.alkadea.com/?get=";

    if (url && url !== "#") {
        var encodedPart = url.split("\/embed\/eventos\/?r=")[1];
        var decodedPart = Buffer.from(encodedPart, 'base64').toString('binary');

        const startImgURL = decodedPart.indexOf('img');
        const endImgURL = decodedPart.indexOf('/scale')
        var newUrl = urlBase + decodedPart + "&title=" + encodeURIComponent(title);

        return {
            img: decodedPart.slice(startImgURL, endImgURL).replace('img=', ''),
            url: newUrl
        };
    } else {
      return {
        img: "#",
        url: "#"
      }
    }   
}