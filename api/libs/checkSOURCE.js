import https from 'https';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    https.get(url, (res) => {
        callback(res.statusCode === 200);
    }).on('error', (e) => {
        callback(false);
    });
};