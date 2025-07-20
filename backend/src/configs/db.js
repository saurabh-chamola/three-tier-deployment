import mongoose from "mongoose"
async function dbConnection() {
    try {
        await mongoose.connect(process.env.db_URL)
        console.log("connected to db!!")
    }
    catch (e) {
        console.log(e?.message ?? "something went wrong while connecting to mongodb!!")
    }
}

export default dbConnection