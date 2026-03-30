const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get("/login", async (req, res) => {
  const uid = "player_" + Math.floor(Math.random() * 999999);
  const token = await admin.auth().createCustomToken(uid);
  res.json({ token });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
