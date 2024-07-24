import axios from 'axios';
import https from 'https';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        // Configura Axios con un timeout más largo y un agente HTTPS si es necesario
        const agent = new https.Agent({ rejectUnauthorized: false });
        const req = await axios.get(url, { timeout: 15000, httpsAgent: agent }); // Timeout de 15 segundos
        const { status } = req;
        callback(status === 200 || status == 302 || status === 304);
    } catch (error) {
        console.log("ERROR EN CHECKSOURCE: ", error.message);
        callback(false);
    }
};