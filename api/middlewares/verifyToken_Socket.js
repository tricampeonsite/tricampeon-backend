import Jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (socket, successCallback, errorCallback) => {
    const { token } = socket.handshake.auth;

    if(!token || token == null) {
        socket.handshake.auth = { message:'No token provided', token: null,isLogged: false };
        return errorCallback({ message:'No token provided', token: null,isLogged: false });
    }

    let resultVerifyToken;

    try {
        resultVerifyToken = Jwt.verify(token, process.env.SECRET_JWT);
        let userID = resultVerifyToken.id;
        const user = await User.findById(userID,{password:0});
        
        if(!user){
            socket.handshake.auth = { message:'Not user found.', token: null, isLogged: false};
            return errorCallback({ message:'Not user found.', token: null, isLogged: false});
        } 

        socket.handshake.auth = { message: "User logged!", token, isLogged: true, socketId: socket.id };

        successCallback();
    } catch (error) {
        console.error('Ocurrio un error en la validacion del token! Error: ', error)
        return errorCallback({ message: 'Invalid token', token: null, isLogged: false});
    }
}