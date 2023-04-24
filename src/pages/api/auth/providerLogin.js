import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { generateUsername } from "unique-username-generator";

export default async function handler(req, res) {
  try {
    const docRef = doc(db, "users", req.body.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
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
    } else {
      let flag = true;
      while (flag) {
        const username = generateUsername("", 2, 18);
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("username", "==", username))
        );
        if (querySnapshot.empty) {
          const newUser = {
            username: username,
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
          await setDoc(doc(db, "users", req.body.uid), newUser);
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
          flag = false;
        }
      }
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Ocurrió un error inesperado." });
  }
}
