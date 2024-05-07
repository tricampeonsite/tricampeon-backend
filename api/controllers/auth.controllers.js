import fs from 'fs-extra';
import cloudinary from 'cloudinary';
import Jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const createUser = async ( req,res ) => {
  try {
    const { username, email, password } = req.body;
    const findExistUser = await User.findOne({username});
    const findExistEmail = await User.findOne({email});
    const validatePassword = req.validatePassword;

    if(findExistUser || findExistEmail) return res.status(203).json({message: 'El usuario o email ya estan registrados!',status: 203})

    if(validatePassword.validation == false) return res.status(400).json({message: validatePassword.message ,status: 400}) 
    if(username.length <= 4 ) return res.status(400).json({message: 'El usuario debe contener 5 caracteres minimo.', status: 400})

    const newUser = new User({
      username,
      password,
      email
    })

    if(req.file){
      if(req.file.size > 10485760) return res.status(202).json({message:'Se permiten subir archivos hasta 10.4Mb', status: 202});
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
          folder: "tricampeon/users"
        });
        newUser.imgUrl = `${result.secure_url}`
        await fs.unlink(req.file.path)
    } else {
        newUser.imgUrl = ''
    }

    await newUser.save()


    res.status(200).json({ user: username, message: 'Usuario creado con éxito! Inicia sesión para continuar.', status:200 })
  } catch (error) {
    console.log('Ocurrio un error en createUser controller. Error: ',error);
    
    if(req.file) fs.unlink(req.file.path);
    
    res.status(500).json({error, status:500})
  }
}

export const login = async ( req,res ) => {
  try {
    const { username, password } = req.body;

    if(!password || !username) return res.status(404).json({message: 'Debes completar todos los campos.', status:404}); 
    const findExistUser = await User.findOne({username});
    if(!findExistUser) return res.status(404).json({message: 'Usuario inexistente',status:404});

    const foundUser = await User.findOne({username});
    const sendUser = await User.findOne({username},{password:0})

    const matchPassword = await User.comparePassword(password, foundUser.password);

    if(!matchPassword) return res.status(401).json({message: 'Contraseña incorrecta.',status: 401})
  
    const token = Jwt.sign({id: foundUser._id},process.env.SECRET_JWT,{
      expiresIn:3000
    })
    
    res.status(200).json({sendUser,token,isLogged: matchPassword, status: 200})
  } catch (error) {
    console.error('Ocurrio un error en el controlador login. Error: ', error)
    return res.status(400).json({error}) 
  }
}


export const validateSession = async ( req,res ) => {
  try {
      const isLogged = req.isLogged;

      return res.status(isLogged.status).json({ 
          isLogged: isLogged.isLogged, 
          status: isLogged.status,
          sendUser: isLogged.userAuth,
          message: isLogged.message
      });
  } catch (error) {
      console.error('Ocurrio un error en validateSession(). auth.controllers.js. Error: ', error.error);
      return res.status(error.status).json({ error: error.error, status: error.status });
  }
}

export const updateImageUser = async ( req, res ) => {
  try {
    const image = req.file;
    const idUser = req.idUser;
    const isLogged = req.isLogged.isLogged;


    if(!isLogged) return res.status(401).json({message: 'Usuario no autenticado!', status: 401, isLogged});
    const foundUserAuth = await User.findById(idUser)

    if(!req.file) return res.status(404).json({ status: 404, message: 'No se cargo ninguna imagen!' });

    if(image.size > process.env.CLOUDINARY_LIMIT_FILESIZE){
      return res.status(202).json({message:'Se permiten subir imagenes hasta 10.4Mb', status: 202});
    }

    try {
      const result = await cloudinary.v2.uploader.upload(image.path,{
        folder: "tricampeon/users"
      });
      foundUserAuth.imgUrl = `${result.secure_url}`
      await fs.unlink(image.path)
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary. Error: ', error)
      return;
    }


    await foundUserAuth.save();

    return res.status(200).json({message: 'Imagen de perfil actualizada!', sendUser: foundUserAuth, isLogged, status: 200 })
  } catch (error) {
    console.error('Ocurrio un error en updateImageUser(). auth.controllers.js. Error: ', error);
    return res.status(error.status).json({ error: error.error, status: error.status });
  }
}