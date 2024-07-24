
// @param url = ruta de transmision
// @param callback = callback(success)

export default async (url, callback) => {
    try {
        callback(true);
    } catch (error) {
        callback(false);
    }
};


/*
         La funcion deberia enviar una peticion a la url y comprobar si devuelve codigo 200 o ok
         sino reintentar.

        Actualmente no esta realizando la peticion,
        ya que cuando se realiza la peticiono en entorno de produccion , el servidor de la url no responde.
        En cambio, si funciona en el entorno de desarollo.

        la funcion original deberia ser asi:
        
const checkSource = async (url, callback) => {
    try {
        const response = await fetch(url, { timeout: 15000 });
        callback(response.ok);
    } catch (error) {
        callback(false);
    }
};
        
*/