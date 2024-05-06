import { config } from "dotenv"
config();

export const options = {
    method: "GET",
    headers: {
        'X-Auth-Token': process.env.API_KEY_FOOTBALLDATA,
    },
}

export const optionsApiArgentina = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.API_KEY_RAPIDAPI,
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

export const isCup = { // estos codigos son para la api football data
	2021: false,
	2152: true,
	2001: true,
	2019: false,
	2015: false,
	2014: false,
	152:  false
  };