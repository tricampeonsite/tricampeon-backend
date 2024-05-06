import { Schema,model } from "mongoose";

const betSchema = new Schema({
    user: [Object],
    match: [Object],
    status: String,
    winner: String,
    checked: Boolean,
    betHit:Boolean
},
{
    timestamps:true,
    versionKey:false
})

export default model('Bets', betSchema);