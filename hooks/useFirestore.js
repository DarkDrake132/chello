import { useState, useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore = (collectionQuery, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    if (!condition.compareValue || !condition.compareValue.length) {
      return;
    }
    const collectionRef = collection(db, collectionQuery);
    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      })
      setDocument(documents);
    });

    return unsubscribe;
  }, [collectionQuery, condition]);

  return document;
};

export default useFirestore;
