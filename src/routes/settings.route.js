const express = require("express");
const { Router } = require("express");
const dotenv = require("dotenv");
const { auth, db } = require("../config/firebase.config.js");
const isAuthenticated = require("../lib/isAuth.js");

dotenv.config();
const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
