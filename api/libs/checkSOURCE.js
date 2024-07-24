import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)

export default async (url, callback) => {
    try {
        const req = await axios.get(url, {
            timeout: 15000, // Aumentar el timeout a 30 segundos
            responseType: 'text', // Obtener la respuesta como texto
            headers: {
                'Referer': 'https://your-origin-domain.com', // Cambia esto a tu dominio de origen
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, compress, deflate, br',
                'Connection': 'keep-alive'
            }
        });
        const { status, data } = req;
        console.log(data); // Imprimir la respuesta completa para depurar
        callback(status === 200 || status === 302 || status === 304);
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log("ERROR EN CHECKSOURCE: Timeout de la solicitud excedido.");
        } else {
            console.log("ERROR EN CHECKSOURCE: ", error.message);
        }
        callback(false);
    }
};