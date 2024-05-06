import moment from "moment";

export default (matchDateText, localTime, matchStatus) => {
    // Obtener la fecha y hora actual
    const ahora = moment();
    
    // Obtener la fecha y hora del partido
    const horaPartido = moment(matchDateText);

    // Obtener solo la hora del partido
    const horaPartidoSolo = moment(localTime, 'HH:mm');

    if(matchStatus == 1) return "FINISHED";
    
    // Si la fecha del partido es después de la fecha actual, está programado para jugar
    if (horaPartido.isAfter(ahora)) return 'SCHEDULED';

    // Si la fecha del partido es igual a la fecha actual o la hora del partido es después de la hora actual
    if (horaPartido.isSameOrBefore(ahora, 'day') && horaPartidoSolo.isAfter(ahora)) return 'SCHEDULED';


    // Calcular el tiempo transcurrido desde el inicio del partido en minutos
    const tiempoTranscurrido = ahora.diff(horaPartido, 'minutes');

    // Definir la duración de un partido y el tiempo del entretiempo
    const duracionPartido = 95; // Duración del partido en minutos
    const entretiempo = 15;      // Duración del entretiempo en minutos

    // Calcular el tiempo total de juego (incluyendo el entretiempo)
    const tiempoTotalJuego = duracionPartido + entretiempo;

    if (tiempoTranscurrido < 0) {
        // Si la hora actual es anterior al horario del partido, está programado para jugar
        return 'SCHEDULED';
    } else if (tiempoTranscurrido < tiempoTotalJuego) {
        // Si el tiempo transcurrido es menor al tiempo total de juego, está en juego
        return 'PLAYING';
    } else {
        // Si ha pasado el tiempo total de juego, el partido ha terminado
        return 'FINISHED';
    }
}