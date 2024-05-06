export default (resApi) => {
     return resApi[0].matches.map(item => {
       // Convertir la fecha UTC a la zona horaria de Argentina (UTC-3)
       const utcDate = new Date(item.utcDate);
       const argentinaDate = new Date(utcDate.getTime() - (3 * 60 * 60 * 1000));
       
       // Extraer la fecha y hora local ajustadas
       const formattedDate = argentinaDate.toISOString().slice(0, 10);
       const formattedHour = argentinaDate.toISOString().slice(11, 16);
   
       // Devolver el objeto del partido con la fecha y la hora local ajustadas
       return { ...item, date: formattedDate, hour: formattedHour };
});
}
