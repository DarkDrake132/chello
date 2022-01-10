import {
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDoc,
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



export const getBoard = async (boardId) => {
  const boardRef = doc(db, "rooms", boardId);
  let raw = await getDoc(boardRef);
  let board = raw.data();
  
  Object.assign(board, {
    boardId,
    ...board
  })
  board.listsId = board.lists.map( list => list);

  board.lists = board.lists.map( list => getList(list));
  
  return board;
}
  
export const addTask = async (taskId, taskName, listId)=>{
  //create new task
  await setDoc(doc(db, "tasks", taskId), {
    taskName,
    users:[],
    createdAt: Timestamp.now(),
    isHidden:false
  });

   // add task to list
   const listRef = doc(db, "lists", listId);
  
   await updateDoc(listRef, {
     tasks: arrayUnion(taskId)
   });
}

export const moveTask = async (taskId, listFrom, listTo) => {
  // remove from old List
  const listFromRef = doc(db, "lists", listFrom);
  
  await updateDoc(listFromRef, {
    tasks: arrayRemove(taskId)
  });
  
  // add to new list
  const listToRef = doc(db, "lists", listTo);
  
   await updateDoc(listToRef, {
     tasks: arrayUnion(taskId)
   });
}

export const hideTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  
  await updateDoc(taskRef, {
    isHidden:false
  });
}

export const getTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  const raw = await getDoc(taskRef);
  let task = raw.data();
  Object.assign(task, {
    taskId,
    ...task
  })
  return task;
}

export const getList = async (listId) => {
    const listRef = doc(db, "lists", listId);
  let raw = await getDoc(listRef);
  let list = raw.data();
  Object.assign(list, {
    listId,
    ...list
  })
  list.tasksId = list.tasks.map(taskId => taskId);

  list.tasks = list.tasks.map(taskId => getTask(taskId));
  return list;
  
}

export const hideList = async (listId) => {
  const listRef = doc(db, "lists", listId);
  
  await updateDoc(listRef, {
    isHidden:true
  });
}

export const renameList = async (listId, listName) => {
  const listRef = doc(db, "lists", listId);
  
  await updateDoc(listRef, {
    listName
  });
}

export const addList = async (listId, listName, boardId) => {
  // create new list
  await setDoc(doc(db, "lists", listId), {
    listName,
    tasks: [],
    createdAt: Timestamp.now(),
    isHidden:false
  });

  // add list to board
  const roomRef = doc(db, "rooms", boardId);
  
  await updateDoc(roomRef, {
    lists: arrayUnion(listId)
  });
}

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
