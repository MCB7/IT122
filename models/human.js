import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../credentials.js";




mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const humanSchema = new Schema({
 name: { type: String, required: true },
 age: Number,
 color: String,
 shape: String
});



export const Human = mongoose.model('Human', humanSchema, "humans")