import fetch from "node-fetch";

// @param url = ruta de transmision
// @param callback = callback(success)
export default async (url, callback) => {
    try {
        const response = await fetch(url, { timeout: 15000 });

        if (response.ok) {
            callback(true);
        } else {
            console.log('Error:', response.status);
            callback(false);
        }
    } catch (error) {
        callback(false);
    }
};
