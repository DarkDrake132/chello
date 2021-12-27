import { collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "./config";

export const addDocument = (collectionName, data) => {
    const collectionRef = doc(collection(db, collectionName));

    const docData = {
        ...data,
        createdAt: Timestamp.now(),
    }
    setDoc(collectionRef, docData);
}