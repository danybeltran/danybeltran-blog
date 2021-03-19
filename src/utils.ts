import { connect, ConnectionOptions } from "mongoose";

import { SHA256 } from "crypto-js";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
export { default as app } from "next-api-validation";

import validate from "next-api-validation";
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb://localhost:27017/next_test",
} = process.env;

console.log(MONGO_URI);

const options: ConnectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

export const connectToDatabase = () => connect(MONGO_URI, options);

export const encrypt = (text: string) => {
  return SHA256(text).toString();
};

/** Returns the user data if the token is valid */
export function verifyToken(req: NextApiRequest, secret: string) {
  var userData: object | undefined;
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, secret, (_, user: object) => {
      userData = user;
    });
  }
  return userData;
}

export function signToken(payload: object, secret: string) {
  console.log(payload);
  return jwt.sign({ ...payload }, secret);
}
