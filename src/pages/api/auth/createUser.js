import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { SignJWT } from "jose";

export default async function handler(req, res) {
  try {
    const newUser = {
      username: req.body.username,
      two_factor: false,
      cover_photo: null,
      description: null,
      rating: null,
      suscription: {
        status: "free",
        start_date: null,
        end_date: null,
      },
      closet: {
        garments: [],
        tags: [],
        laundry: [],
        outfits: [],
      },
      favorites: [],
    };
    await setDoc(doc(db, "users", req.body.currentUser.uid), newUser);
    const tokenData = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 12 * 5,
      user_id: req.body.currentUser.uid,
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
    return res
      .status(500)
      .json({ success: false, message: "Ocurrió un error inesperado" });
  }
}
