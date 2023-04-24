import app from "../../lib/firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
const db = getFirestore(app);

export default async function handler(req, res) {
  const querySnapshot = await getDocs(collection(db, "users"));
  res.status(200).json(querySnapshot.docs.map((doc) => doc.data()));
}
