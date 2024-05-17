export default (event) => {
    const { title, url, img, league } = event;
    const urlBase = "https://star.alkadea.com/?get=";

    if (url && url !== "#") {
        var encodedPart = url.split("\/embed\/eventos\/?r=")[1];
        var decodedPart = Buffer.from(encodedPart, 'base64').toString('binary');        
        var newUrl = urlBase + decodedPart + "&title=" + encodeURIComponent(title);
        // var encodedNewUrl = Buffer.from(newUrl).toString('base64');
        return newUrl;
    } else {
      return "#"
    }   
}

        // Esta url debe estar en cada card del frontend, y debe ser enviada al backend
        // url;
    
        // aca se le quita /embed/eventos/?
        // encodedPart; 
    
        // aca de decodifica la URL
        // decodedPart;
    
        // esta es la url que debe ser enviada al frontend para reproducir el video
        // newUrl;