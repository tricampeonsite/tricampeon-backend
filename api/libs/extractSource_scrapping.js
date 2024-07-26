import axios from "axios";
import { load } from "cheerio"
import getUrl from "./getUrl.js";

const url = "https://la10hd.com/vivo/canal.php?stream=dsports";

//@params url = String 
export default async (url) => {
    try {
        const response = await axios.get(url);

        const $ = load(response.data);

        const scriptsContent = [];

        $('script').each((index, element) => {
            const scriptText = $(element).html();
            if (scriptText.includes('token')) {
                scriptsContent.push(scriptText.trim());
            }
        });
        
        return getUrl(scriptsContent[0]);
    } catch (error) {
        console.error('Error al hacer fetching en getSource_scrapping! Error: ', error.code);
        return null;
    }
}

