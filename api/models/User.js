import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userModel = new Schema({
    username: {
        require: true,
        type: String
    },
    imgUrl: String,
    password: String,
    email: String,
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