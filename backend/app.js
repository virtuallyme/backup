import express from "express";
import sls from "serverless-http";
import cors from "cors";
import {
  createConn,
  saveEmailToWaitlistInMongo,
  getWaitlistSignUps,
  getProfile,
} from "./Mongo.js";

const app = express();
//we use cors because otherwise requests from the frontend will be blocked during dev
//WE NEED TO REMOVE THIS WHEN WE GO TO PRODUCTION
//this allows network requests from all origins
app.use(cors());

// add someone to the waitlist
app.post("/waitlist", async (req, res) => {
  const body = JSON.parse(req.apiGateway.event.body);
  const userEmail = body.email;
  const name = body.name;
  const featureRequest = body.featureRequest;

  // prepare connection
  try {
    await createConn();
    res.json(await saveEmailToWaitlistInMongo(userEmail, name, featureRequest));
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

// returns everyone who signed up for the waitlist
app.post("/get_waitlist_sign_ups", async (req, res) => {
  try {
    await createConn();
    res.json(await getWaitlistSignUps());
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

// returns a user's profile
app.post("/get_profile", async (req, res) => {
  const body = JSON.parse(req.apiGateway.event.body);
  const userId = body.userId;
  try {
    await createConn();
    res.json(await getProfile(userId));
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

export const server = sls(app);
