import fetch from 'node-fetch';
import decodeURL from './decodeURL.js';


const STARPLUS_EVENTS = process.env.URL_STARPLUS_EVENTS;

// ESTA FUNCION RETORNA EL "URL" DE EL O LOS EVENTOS DE STAR+
export default async (channelsRecived, homeTeam, awayTeam) => {
    try {
        const requestAPIevents = await fetch(STARPLUS_EVENTS);
        const responseAPIevents = await requestAPIevents.json();

        const filterStarPlus = channelsRecived.filter(channel => channel.name == 'star+')[0];

        const filterAndGetURLevent = responseAPIevents
  .filter(event => {
    const dateEvent = event.title.toLowerCase().trim(); 
    const teamAway = awayTeam.toLowerCase().trim();
    const teamHome = homeTeam.toLowerCase().trim();
    const awayRegex = new RegExp("\\b" + teamAway.split(' ').pop() + "\\b", "i");
    const homeRegex = new RegExp("\\b" + teamHome.split(' ').pop() + "\\b", "i");

    // Excluir eventos que contienen palabras clave específicas en dateEvent
    const excludeKeywords = ["open", "(primera ronda)", "(segunda ronda)", "(tercera ronda)"];
    const excludeRegex = new RegExp(excludeKeywords.join("|"), "i");

    // Aquí es donde se hace el cambio, reemplazando event.title con dateEvent
    return (awayRegex.test(dateEvent) || homeRegex.test(dateEvent)) && !excludeRegex.test(dateEvent) && event.status !== 'FINALIZADO';
  })
  .map(event => decodeURL(event))
  .toString();

        return filterAndGetURLevent;
    } catch (error) {
        console.error('Ocurrio un error en middleware starPlusEvents.js . Error: ', error)
        return {error}
    }
}