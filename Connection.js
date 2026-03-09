import mongoose from "mongoose"

export const ConnectMongoDb = async (url) => {
   await mongoose.connect(url).then(() => {
        console.log(`MongoDb Connected Sucessfully`)
    }).catch((error) => {
        console.log(`MongoDb Cannot Connected :${error.message}`)
    })
}
