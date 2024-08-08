import checkSOURCE from "./checkSOURCE.js";
import parameters from "./parameters.js";
import streamingServers from "./streamingServers.js";

const trySOURCE = (urlVideo, sources, listServers, index, onValid, onInvalid) => {
    const { isStarPlusEvent, getParameter_get, getParameter_url, number, containMpdOrM3u8File } = parameters(urlVideo);
    var random = Math.floor(Math.random() * streamingServers(urlVideo, sources).length);

    if (!streamingServers(urlVideo, sources).length) {
        onInvalid();
        return;
    }
    
    // enlaces de transmision mpd o m3u8
    var sources_1 = "https:" + listServers[index] + Buffer.from(getParameter_url,'base64').toString('binary');
    var sources_2 = isStarPlusEvent ? '' : "https://" + streamingServers(urlVideo, sources)[random] + ".cvattv.com.ar/live/c" + number + "eds/" + Buffer.from(getParameter_get, 'base64').toString('binary') + "/SA_Live_dash_enc/" + Buffer.from(getParameter_get, 'base64').toString('binary') + ".mpd";
    var sources_3 = getParameter_get;
    var sources_4 = urlVideo;

    const setSources = () => {
        if (isStarPlusEvent) {
            return sources_3;
        } else if (getParameter_get) {
            return sources_2;
        } else if (getParameter_url) {
            return sources_1;
        } else if(containMpdOrM3u8File) {
            return sources_4;
        } else {
            return sources_4
        }
    }

    sources = setSources();

    checkSOURCE(sources, function (isValid) {
        if (isValid) {
            onValid(sources)
            console.log(`SERVIDOR ENCONTRADO: ${sources}`);
        } else {
            console.log(sources);
            console.error('Buscando servidor ...')
            trySOURCE(urlVideo, sources, listServers, index + 1, onValid, onInvalid);
        }
    })
}

export default trySOURCE;