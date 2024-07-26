import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import helmet from 'helmet';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
const app = express();
export const server = http.createServer(app);
import { getMembers_Socket, joinEvent_Socket, sendMessage_Socket } from './sockets/sockets.js';

export const io = new SocketServer(server, {
    cors: {
        origin: process.env.URL_HOST,
        credentials: true
    },
    path: process.env.SOCKET_PATH,
});

io.on('connection', (socket) => {
    joinEvent_Socket(socket);
    sendMessage_Socket(socket);
    getMembers_Socket(socket);
});

io.on('disconnect', (socket) => {
    // hacer logica para avisar cuando un usuario se desconecto!
    // se podria lanzar otro evento 'userDisconncted',asi incluir el idEvent y datos del usuario.
    console.log(`El socket "${socket.id}" se ha desconectado`);
})


//   routes
import leaguesRoutes from './routes/leagues.routes.js';
import matchesRoutes from './routes/matches.routes.js';
import scorersRoutes from './routes/scorers.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import usersRoutes from './routes/users.routes.js';
import betsRoutes from './routes/bets.routes.js';
import homeRoutes from './routes/home.routes.js';
import channelRoutes from './routes/channels.routes.js';
import authRoutes from './routes/auth.routes.js';
import proxyRoutes from './routes/proxy.routes.js';
import compression from 'compression';


//   middlewares 
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
// app.use(helmet(helmetConfig))
app.use(express.json())
app.use(express.urlencoded({ extended:false }));


app.use('/api/tricampeon', homeRoutes)
app.use('/api/tricampeon/leagues', helmet(), leaguesRoutes);
app.use('/api/tricampeon/matches', helmet(), matchesRoutes);
app.use('/api/tricampeon/scorers', helmet(), scorersRoutes);
app.use('/api/tricampeon/teams', helmet(), teamsRoutes);
app.use('/api/tricampeon/users', helmet(), usersRoutes);
app.use('/api/tricampeon/bets', helmet(), betsRoutes);
app.use('/api/tricampeon/channels', channelRoutes);
app.use('/api/tricampeon/auth', helmet(), authRoutes);
app.use('/api/tricampeon/proxy', helmet(), proxyRoutes);

export default app;