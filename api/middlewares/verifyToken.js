import Jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token || token == 'null'){
            req.isLogged = { 
                isLogged: false, 
                status: 404, 
                message: "Not provided token!",
                userAuth: []
            };
            next();
        } 

        let verifyTokenProvided;
        try {
            verifyTokenProvided = Jwt.verify(token, process.env.SECRET_JWT);
        } catch (error) {
            req.isLogged = { 
                isLogged: false, 
                status: 401,
                message: 'Invalid token!',
                userAuth: []
            };
            next();
        }

        if (!verifyTokenProvided){
            req.isLogged = { 
                isLogged: false, 
                status: 401,
                message: 'Invalid token!',
                userAuth: []
            };            
            next();
        }

        req.idUser = verifyTokenProvided.id;

        const foundUser = await User.findOne({ _id: req.idUser }, { password: 0 });

        if (!foundUser){
            req.isLogged = { 
                isLogged: false, 
                status: 404, 
                message: "User not found.",
                userAuth: []
            };
            next();
        }
    
        req.isLogged = { 
            isLogged: true, 
            status: 200,
            message: "Success session!",
            userAuth: foundUser  
        };
        next();
    } catch (error) {
        next(error);
        console.error('Ocurrio un error en middleware verifyToken.js().Error: ', error);
    }
}