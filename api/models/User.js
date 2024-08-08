import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userModel = new Schema({
    username: {
        unique: true,
        require: true,
        type: String,
        trim: true,
        minLength: 5,
        validate: 
        {
          validator: function(v) {
            return /^[a-zA-Z0-9]+$/.test(v); // Expresión regular para permitir solo letras y números
          },
          message: props => `${props.value} no es un nombre de usuario válido. El nombre de usuario solo puede contener letras y números.`
        }
    },
    imgUrl: String,
    password: {
      require: true,
      type: String,
      trim: true,
      minLength: 8,
      validate: [
        {
          validator: function(v) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$-_!%*?&])[A-Za-z\d@$!%-_*?&]{8,}$/.test(v); // mayuscula, minuscula, 8 caracteres, caracter especial
          },
          message: props => `La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.`
        }
      ]
    },
    email: {
      type: String,
      unique: true,
      validate: [
        {
          validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // email valido
          },
          message: props => `${props.value} no es un email válido.`
        }
      ]
    },
    points: Number,
},{
    timestamps: true,
    versionKey:false
})

userModel.statics.comparePassword = async (password, recivedPassword) => {
   return await bcrypt.compare(password, recivedPassword);
}

userModel.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  })

export default model('User', userModel);