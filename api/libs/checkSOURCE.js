import https from 'https';

// @param url = ruta de transmision
// @param callback = callback(success)
export default (url, callback) => {
    https.get(url, (res) => {
        const { statusCode } = res;
        callback(statusCode === 200 || statusCode == 302);
    }).on('error', () => {
        console.log('URL de transmision no disponible!.');
        callback(false); // Si hay un error en la solicitud, se llama al callback con false
    });
};