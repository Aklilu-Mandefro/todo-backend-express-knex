const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("./database/connection.js");

//Create a new post route that handles the incoming user
// registration requests

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  // Validate user input

  if (!username || !password || !email) {
    return res.status(400).json({
      error: "Username, password, and email are required.",
    });
  }

  // Inserting user's data into the database
  const [id] = db("users").insert({
    username,
    password,
    email,
  });

  // Respond with the created user data
  res.status(201).json({
    id,
    username,
    email,
  });
});

module.exports = router;
