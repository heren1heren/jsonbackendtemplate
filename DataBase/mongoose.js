import mongoose, { Schema } from 'mongoose';
import 'dotenv/config';

const uri = process.env.mongoDB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

//todo: testing if the models are working fine inside database
