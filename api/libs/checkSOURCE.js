import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        if (url.startsWith('https://')) {
            url = url.replace('https://', 'http://');
        }
        const req = await axios.get(url, {
            timeout: 15000 // Timeout de 15 segundos
        });
        const { status } = req;
        callback(status === 200 || status == 302 || status === 304);
    } catch (error) {
        console.log("ERROR EN CHECKSOURCE: ", error.message);
        callback(false);
    }
};