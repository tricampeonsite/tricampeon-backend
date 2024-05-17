import getKeys from "../data/getKeys.js";
import getNumber from "../data/getNumber.js";

export default (urlVideo) => {
    var imgDefault = 'https://res.cloudinary.com/dngggponu/image/upload/v1715783803/tricampeon-animated_ndf5f1.gif'
    urlVideo = urlVideo.replace(/k1=/, 'keyId=').replace(/k2=/, 'key=');

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\[").replace(/[\]]/, "\]");
        var regex = new RegExp("[\?&]" + name + "=([^&#]*)"),
            results = regex.exec(urlVideo);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // parametros
    var isStarPlusEvent = urlVideo.includes('star.alkadea.com');
    var containMpdOrM3u8File = urlVideo.includes('.mpd') || urlVideo.includes('.m3u8');
    var getParameter_get = getParameterByName('get');
    var getParameter_url = getParameterByName('url');
    var getParameter_live = getParameterByName('live');
    var getLang = getParameterByName('lang');
    var getIMG = getParameterByName('img') ? getParameterByName('img') : imgDefault;
    var getKey = getParameterByName('key');
    var getKey2 = getParameterByName('key2');
    var getKeyId = getParameterByName('keyId');
    var getTitle = getParameterByName('title') ? getParameterByName('title') : 'Ver evento en vivo!';
    var keyId = setKeyId();
    var key = setKey();
    var number = getNumber(getParameter_get);

    function setKeyId() {
        if (isStarPlusEvent) {
            return getKey;
        } else if (getKeyId) {
            return Buffer.from(getKeyId,'base64').toString('binary')
        } else if (getParameter_get) {
            return getKeys(getParameter_get).keyId;
        } else if (getParameter_live) {
            return Buffer.from(encodeURIComponent(getParameter_live)).toString('base64')
        } else {
            return ''
        }
    }

    function setKey() {
        if (isStarPlusEvent) {
            return getKey2;
        } else if (getKey) {
            return Buffer.from(getKey, 'base64').toString('binary');
        } else if (getParameter_get) {
            return getKeys(getParameter_get).key;
        } else if (getParameter_url) {
            return Buffer.from(encodeURIComponent(urlVideo)).toString('base64')
        } else {
            return ''
        }
    }

    return {
        isStarPlusEvent,
        getIMG,
        getKey,
        getKey2,
        getKeyId,
        getLang,
        getParameterByName,
        getParameter_get,
        containMpdOrM3u8File,
        getParameter_url,
        getTitle,
        key,
        keyId,
        number
    }
}