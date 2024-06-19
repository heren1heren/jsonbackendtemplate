import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  connect(mongoUri);

  connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      connect(mongoUri);
    }
    console.log(e);
  });

  connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

export default initializeMongoServer;
