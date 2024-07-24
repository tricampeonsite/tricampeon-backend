import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        const req = await axios.get(url);
        const { status } = req;
        callback(status === 200 || status == 302 || status === 304);
    } catch (error) {
        if (error.response) {
            // La solicitud fue realizada y el servidor respondió con un estado de error
            console.log("ERROR EN CHECKSOURCE: ", error.response.status);
        } else if (error.request) {
            // La solicitud fue realizada pero no se recibió respuesta
            console.log("ERROR EN CHECKSOURCE: No se recibió respuesta", error.request);
        } else {
            // Algo ocurrió al configurar la solicitud
            console.log("ERROR EN CHECKSOURCE: ", error.message);
        }
        callback(false);
    }
};