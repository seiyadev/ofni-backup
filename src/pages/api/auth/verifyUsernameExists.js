import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import {
  getDocs,
  collection,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";

export default async function handle(req, res) {
  const newUser = {
    name: req.body.name,
    username: req.body.username_ofni,
    email: req.body.email,
  };
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("username", "==", newUser.username))
    );
    if (querySnapshot.empty) {
      /*       const createUserAuth = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        req.body.password
      );
      await createUserAuth.user;
      await setDoc(doc(db, "users", createUserAuth.user.uid), newUser); */
      return res.status(200).json({ success: true });
    } else {
      const error = {
        code: "auth/username-already-in-use",
      };
      throw new Error(JSON.stringify(error));
    }
  } catch (error) {
    console.error(error);
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
    res.status(500).json({
      message: "Ocurrió un error inesperado, intentálo de nuevo más tarde.",
    });
  }
}
