export default async (error, req,res,next) => {
    let newError = {
        error: error.error || 'Ocurrio un error en el servidor',
        status: error.status || 500,
    };
    
    try {
          const promesaRechazada = Promise.reject(newError);
          
          await promesaRechazada;
          next();
    } catch (error) {
        console.error('Ocurrio un error en el bloque trycatch de handleErrors.js', error);
        return res.status(newError.status).json({error:newError.error, status: newError.status });
    }
}