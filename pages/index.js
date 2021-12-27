import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import Board from '../component/Board/Board';

import { useAuth } from '../context/AuthContext';
import useFirestore from '../hooks/useFirestore';

export default function Home(props) {
  const router = useRouter();

  const { user } = useAuth();
  
  /**
   * {
   *  name: "room name",
   * description: "room description",
   * members: [uid1, uid2, ...]
   * }
   */
   const roomsCondition = useMemo(() => {
     return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.uid,
     }
   }, [user?.uid])

   const rooms = useFirestore("rooms", roomsCondition);

  function boardHanlder(id) {
    if (id) {
      router.push(`/${id}`);
    } else {
      props.modalHandler()
    }
  }

  return (
    <div className={styles.Container + ' container d-flex flex-wrap rounded'}>
      {rooms.map(room => {
        return (
          <Board
            key={room.id}
            image={`https://th.bing.com/th/id/OIP.7KQv5iIl5pP1RGC5ICS5SQHaEo?pid=ImgDet&rs=1`}
            boardName={room.name}
            onClick={() => boardHanlder(room.id)}
          />
        )
      })}
    </div>
  )
}
