import { Router } from "express";
import multer from "multer";
import cloudinary from 'cloudinary';
import path,{ dirname } from 'path'
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import validatePassword from '../middlewares/validatePassword.js'
import { createUser, login, updateImageUser, validateSession } from "../controllers/auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
  })


//  config Multer
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, file= path.join(__dirname)) // guardar las imagenes en este directorio.
  },
    filename:(req,file,cb) => {
        cb(null,file.originalname); //Agregar extension de archivo de imagen. 
  }
});
  
const upload = multer({storage: storage,
      fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpeg|gif|tif||tiff|heif|eps|ai|pdf|psd|webp|png|bmp|svg|jpg|avif)$/)) { // extensiones de archivos soportadas
      return cb(new Error('Error en el tipo de archivo.'));
      }
      cb(null, true);
      }
    });

const router = Router();

router.post('/createUser', upload.single('imgUser'), [ validatePassword ], createUser)
router.post('/login', login)
router.put('/updateImageUser', [ verifyToken ], upload.single('imgUser'), updateImageUser );
router.post('/validateSession', [ verifyToken ], validateSession)

export default router;

