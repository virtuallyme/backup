import { MongoClient } from "mongodb";

const mongoConnStr = process.env.MONGO_URI;
const client = new MongoClient(mongoConnStr, {
  useNewUrlParser: true,
});
let db;

//connect to MongoDB database
export const createConn = async () => {
  if (db) {
    return;
  }
  await client.connect();
  db = client.db("PenPal");
};

//adds email to waitlist collection in mongo
export const saveEmailToWaitlistInMongo = async (
  userEmail,
  name,
  featureRequest
) => {
  const users = db.collection("Waitlist");

  const user = {
    email: userEmail,
    name: name,
    featureRequest: featureRequest,
    date: new Date(),
  };

  return {
    insertedUser: user,
    mongoResult: await users.insertOne(user),
  };
};

export const getWaitlistSignUps = async () => {
  const users = db.collection("Waitlist");
  return await users.find({}).toArray();
};

export const getProfile = async (userId) => {
  const users = db.collection("Users");
  try {
    return await users.findOne({ _id: userId });
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
