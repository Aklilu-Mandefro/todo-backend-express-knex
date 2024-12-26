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
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserting user's data into the database
  const [id] = await db("users").insert({
    username,
    password: hashedPassword,
    email,
  });

  // Respond with the created user data
  res.status(201).json({
    id,
    username,
    email,
  });

  //Check for unique constraint violation
  if (error.code === 23505) {
    return res.status(409).json({
      error: " Username or email already exist.",
    });
  }
});

module.exports = router;
