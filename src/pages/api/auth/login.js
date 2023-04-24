import { auth } from "../../../lib/firebase";
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handle(req, res) {
  try {
    const tokenData = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 12 * 5,
      user_id: req.body.uid,
    };
    const token = sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET);
    const serialized = serialize("ssn", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365 * 5,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Ocurrió un error inesperado." });
  }
  // try {
  //   /*     const token = await userLogin.user.getIdToken({
  //     expiresIn: 60 * 60 * 24 * 7, // 1 week
  //   });
  //   const serializedToken = serialize(
  //     process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME,
  //     token,
  //     {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV !== "development",
  //       sameSite: "strict",
  //       maxAge: 60 * 60 * 24 * 7, // 1 week
  //       path: "/",
  //     }
  //   );
  //   res.setHeader("Set-Cookie", serializedToken); */
  //   return res.status(200).json({ success: true });
  // } catch (e) {}
}
