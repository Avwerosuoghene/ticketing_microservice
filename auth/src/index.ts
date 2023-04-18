import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {

    console.log('starting up...!!')
    console.log(process.env.JWT_KEY)
    // Checks for jwt key
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URL) {
        throw new Error('MONGO_URL must be defined');
    }

    try {
    // auth-mongo-srv is the name of our mongodb service
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to mongodb');
    } catch (err){
        console.log(err)
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!');
    });

}

start();

