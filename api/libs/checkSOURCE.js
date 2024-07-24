import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        const req = await axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Puedes ajustar esto según el origen permitido
                'Access-Control-Allow-Headers': 'content-type, date, x-flow-origin, range',
                'Access-Control-Allow-Methods': 'GET',
            },
            timeout: 15000 // Timeout de 15 segundos
        });
        const { status } = req;
        callback(status === 200 || status == 302 || status === 304);
    } catch (error) {
        console.log("ERROR EN CHECKSOURCE: ", error.message);
        callback(false);
    }
};