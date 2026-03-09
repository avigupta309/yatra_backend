import { Schema, model } from "mongoose";

const citySchema = new Schema({
    cityName: {
        type: [String],
        trim: true,
    }
})


export const cityModel = new model("city", citySchema)