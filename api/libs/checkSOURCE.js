import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)

export default async (url, callback) => {
    try {
        const req = await axios.get(url, {
            timeout: 15000, // Timeout de 15 segundos
            headers: {
                'Referer': 'http://localhost:3100',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, compress, deflate, br',
                'Connection': 'keep-alive'
            }
        });
        const { status } = req;
        callback(status === 200 || status === 302 || status === 304);
    } catch (error) {
        console.log("ERROR EN CHECKSOURCE: ", error.message);
        console.log("DETAILS: ", error.toJSON());
        callback(false);
    }
};