import mongoose, { Schema } from 'mongoose';
import 'dotenv/config';
//in order to interact with models -> need to import it here
const uri = process.env.mongoDB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
