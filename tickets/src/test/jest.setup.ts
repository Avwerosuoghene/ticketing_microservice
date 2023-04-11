import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
};

jest.mock('../nats-wrapper');


let mongo: any;

// This is a hook that runs before all our test runs/startup
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// This is a hook that runs before each of our tests. It reaches to mongodb db and resets all data inside
beforeAll(async () => {
  // This ensures the mock function is cleared after each test runs.
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// A hook that runs after tests a re complete
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin =  () => {
  // Build a JWT payload. {id, email}
  // This ensures we get a new user whenever we call global signin
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build the session object {jwt: MY_JWT}
  const session = {jwt: token}

  // Turn the session into JSON
  const sessionJson = JSON.stringify(session);

  // Turn JSON to base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
