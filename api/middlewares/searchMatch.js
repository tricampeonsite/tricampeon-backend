export default async ( req, res, next ) => {
    try {
        const { idMatch } = req.params;
        const matches = req.matches;
        const findMatch = matches.flatMap(events => events.matches).filter(match => match.id === idMatch);
        
        req.match = findMatch;
        next();
    } catch (error) {
        console.error('Ocurrio un error al obtener el matchByID. Error: ', error);
        next(error)
    }
}