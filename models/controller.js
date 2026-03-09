import { model, Schema } from 'mongoose'
function capitalizeWords(str) {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

const controllerSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        set: capitalizeWords,
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    salt: {
        type: String,
        trim: true
    }
}, { timestamps: true })


export const controllerModel = new model("controller", controllerSchema)