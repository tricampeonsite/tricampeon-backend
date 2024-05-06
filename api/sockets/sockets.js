import verifyToken_Socket from "../middlewares/verifyToken_Socket.js";

const rooms = new Map();

const checkUserInRoom = (rooms, userRecived) => {
    for (const [roomId, users] of rooms.entries()) {
        rooms.set(roomId, users.filter(user => user.user !== userRecived));
    }
}

export const joinEvent_Socket = async (socket) => {
    socket.on('joinEvent', async (data) => {
            verifyToken_Socket(socket, () => {
            
            // Configurar la sala
            const roomId = data.idEvent;
            const user = data.user;

            // estructura de la sala { idEvent, { id: socket.id, user: nombre de usuario }}
            if (!rooms.has(roomId)) {
                rooms.set(roomId, []);
            }

            // si existe el usuario en la sala, eliminarlo y evitar duplicado.
            checkUserInRoom(rooms, user);

            // Unirse a la sala
            socket.leaveAll();
            socket.join(roomId);
            

            /*
               El valor por defecto del usuario agregado a la sala es el id del socket
               Lo reemplace para poder manipular mejor los datos mas adelante
            */
            // Agregar usuario a la sala
            rooms.get(roomId).push({ id: socket.id, user });
            
            socket.to(roomId).emit('userConnected', {
                id: socket.id,
                type: 'joinChat',
                message: `${user} ingresó al chat!`
            });
            
            }, (error) => {
                console.error(error)
            });        
    }); 
};


export const sendMessage_Socket = (socket) => {
    try {
        socket.on('sendMessage', (data) => {
            socket.to(data.idEvent).emit('recivedMessage',{
                id: socket.id,
                message: data.message,
                type: 'message',
                user: data.user // Usa socket.user en lugar de socket.id
            });
        });
    } catch (error) {
        console.error('Ocurrio un error al enviar el mensaje de chat. sendMessage_Socket. Error: ', error);
    }
};

export const getMembers_Socket = (socket) => {
    try {
        socket.on('listMembers', (data) => {
            const room = rooms.get(data.idEvent);
            socket.to(data.idEvent).emit('listMembers', room)
        });
    } catch (error) {
        console.error('Ocurrio un error al obtener los miembros del evento. Error: ', error);
    }
};