const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8")
);

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
