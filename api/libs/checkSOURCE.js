import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        const req = await axios.get(url)
        const { status } = req;
        callback(status === 200 || status == 302 || status === 304);
    } catch (error) {
        callback(false);
    }
};