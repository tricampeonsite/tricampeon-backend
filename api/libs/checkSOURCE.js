import axios from 'axios';

// @param url = ruta de transmision
// @param callback = callback(success)

export default async (url, callback) => {
    try {

        callback(true);
    } catch (error) {

        callback(false);
    }
};