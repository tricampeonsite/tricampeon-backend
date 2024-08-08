import { Router, json } from "express";
import pkg from '../../package.json' assert { type: 'json'};

const router = Router();

router.get('/', async ( req,res ) => {
   res.send({
    name:'API Tricampeón',
    author: 'Facundo Ibañez Gambarte',
    description:'En linkDocs, podrás acceder a la documentación de la API.',
    linkDocs: 'https://www.postman.com/altimetry-geoscientist-39614612/workspace/proyectofinalnucba/documentation/25549998-ff240f54-4754-425c-a57e-6e35831083b0',
    dependendencies: pkg.dependencies
   }) 
})

export default router;
