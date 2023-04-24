import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getUserHandler(req, res) {
  const uid = req.body.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const dbUser = {
      username: docSnap.data().username,
      cover_photo: docSnap.data().cover_photo,
      description: docSnap.data().description,
      rating: docSnap.data().rating,
    };
    res.status(200).json({ dbUser: dbUser });
  } else {
    res.status(401).json({ message: "Not logged in", success: false });
  }
}
