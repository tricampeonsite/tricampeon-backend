import { server } from "./app.js";
import './database.js'

const PUERTO = process.env.PORT || 3100;

server.listen(PUERTO, () => {
    console.log('Server listenng to port: ', PUERTO);
})