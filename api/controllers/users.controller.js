import User from '../models/User.js';

export const getUsers = async ( req,res ) => {
  try {
    const foundUsers = await User.find({},{password:0});
    res.status(200).json(foundUsers);
  } catch (error) {
    res.status(400).json(error);
  }
}