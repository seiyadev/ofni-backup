const { auth, db } = require("../config/firebase.config");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    if (req.user) {
      return res.status(401).json({ message: "Acceso no autorizado" });
    }
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userRef = await db.collection("users").doc(userId);
    const userWithoutId = (await userRef.get()).data();
    const user = {
      id: userId,
      ...userWithoutId,
    };
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Acceso no autorizado" });
  }
};

module.exports = isAuthenticated;
