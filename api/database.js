import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

mongoose.connect(process.env.DB_URI)
.then(db => console.log('Database is connected'))
.catch(err => console.error('Connection DB failed.', err))
