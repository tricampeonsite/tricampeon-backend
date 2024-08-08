import { Schema, model } from 'mongoose';

const channelSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    altName: {
        type: String
    },
    urlChannel: {
        type: [String],
        require: true
    },
    imgChannel: {
        type: String
    },
    idOleChannel: {
        type: String,
        require: true
    },
    eventsProgramming:{
        type: [Object]
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model('Channel', channelSchema);