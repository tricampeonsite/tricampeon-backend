import axios from "axios";
import { load } from "cheerio";
import getUrl from "./getUrl.js";
import https from 'https'

// @params url = String | recibe la url donde esta el stream
export default async (url) => {
    try {
        const response = await axios.get(`http://localhost:3100/api/tricampeon/proxy/?url=${url}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive"
            },
            withCredentials: true
        });

        const $ = load(response.data.response);

        const scriptsContent = [];

        $('script').each((index, element) => {
            const scriptText = $(element).html();
            if (scriptText.includes('token')) {
                scriptsContent.push(scriptText.trim());
            }
        });
        
        return getUrl(scriptsContent[0]);
    } catch (error) {
        console.error('Error al hacer fetching en getSource_scrapping! Error: ', error);
        return null;
    }
}