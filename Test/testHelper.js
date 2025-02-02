const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

module.exports = {
  startDB: async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect('mongodb+srv://ankush1408:ankush14@database01.9zk3m.mongodb.net/faq-test');
  },
  stopDB: async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  },
  clearDB: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  }
};