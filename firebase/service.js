import { collection, doc, setDoc, FieldValue } from "firebase/firestore"
import { db } from "./config";

export const addDocument = (collectionName, data) => {
    const collectionRef = collection(db, collectionName);

    setDoc(collectionRef, {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
    })
}