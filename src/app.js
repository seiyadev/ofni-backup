const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth.route.js");
const fairingRouter = require("./routes/fairing.route.js");
const settingsRouter = require("./routes/settings.route.js");
const closetRouter = require("./routes/closet.route.js");
const profileRouter = require("./routes/profile.route.js");
const isAuthenticated = require("./lib/isAuth.js");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("combined")); // Log requests to console

// Routes
app.use("/auth", authRouter);
app.use("/fairing", fairingRouter);
app.use("/settings", settingsRouter);
app.use("/closet", closetRouter);
app.use("/profile", profileRouter);

app.get("/", isAuthenticated, (req, res) => {
  res.status(204).send();
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(204).send();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
