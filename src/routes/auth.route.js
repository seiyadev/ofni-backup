const express = require("express");
const { Router } = require("express");
const dotenv = require("dotenv");
const { auth, db } = require("../config/firebase.config.js");
const isAuthenticated = require("../lib/isAuth.js");

dotenv.config();
const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  res.json(req.message);
});

router.post("/register", async (req, res) => {
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  };
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("username", "==", newUser.username))
    );
    if (querySnapshot.empty) {
      const createUserAuth = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        req.body.password
      );
      await createUserAuth.user;
      await setDoc(doc(db, "users", createUserAuth.user.uid), newUser);
      const token = await createUserAuth.user.getIdToken();
      res.json(token);
    } else {
      const error = {
        code: "auth/username-already-in-use",
      };
      throw new Error(JSON.stringify(error));
    }
  } catch (error) {
    if (typeof error.message === "string" && error.message.includes("{")) {
      error = JSON.parse(error.message);
    }
    if (error.code === "auth/username-already-in-use") {
      res.status(409).json({
        message: "El nombre de usuario ingresado ya se encuentra en uso.",
      });
    }
    if (error.code === "auth/email-already-in-use") {
      res.status(409).json({
        message: "El correo electrónico ingresado ya se encuentra en uso.",
      });
    }
  }
});

module.exports = router;
