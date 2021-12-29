import {
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./config";

export const addDocument = (collectionName, data) => {
  const collectionRef = doc(collection(db, collectionName));

  const docData = {
    ...data,
    createdAt: Timestamp.now(),
  };
  setDoc(collectionRef, docData);
};

export const findUser = async (data) => {
  const q = query(collection(db, "users"), where("email", "==", data));

  let userData;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    userData = doc.data();
  });
  return userData;
};

export const addMember = async (roomId, memberEmail) => {
  const userQuery = await findUser(memberEmail);

  if (userQuery === undefined) {
    console.log("User not found");
    return false;
  }

  const roomRef = doc(db, "rooms", roomId);

  // Atomically add a new region to the "regions" array field.
  await updateDoc(roomRef, {
    members: arrayUnion(userQuery.uid),
  });

  return true;
};

export const removeMember = async (roomId, memberId) => {
  const roomRef = doc(db, "rooms", roomId);
  await updateDoc(roomRef, {
    members: arrayRemove(memberId),
  });
};
