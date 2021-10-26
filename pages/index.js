import styles from '../styles/Home.module.css'
import Board from '../component/Board/Board';

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter();

  const [ board, setBoard ] = useState([
    {
      id: 1,
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    },
    {
      id: 2,
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'QHTT'
    },
    {
      id: 3,
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'Thiết kế giao diện'
    },
    {
      id: 4,
      image: `https://th.bing.com/th/id/R.7414d461bf1f6c332a38aca5d297222d?rik=gHvWKb9rAYLbAA&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    },
    {
      id: 5,
      image: `https://th.bing.com/th/id/R.7414d461bf1f6c332a38aca5d297222d?rik=gHvWKb9rAYLbAA&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    }
  ])

  function boardHanlder(id) {
    if (id) {
      router.push(`/${id}`);
    } else {
      props.modalHandler()
    }
  }

  return (
    <div className={styles.Container + ' container d-flex flex-wrap rounded'}>
      {board.map((item) => {
        return (
          <Board key={item.id} image={item.image} boardName={item.boardName} clicked={() => boardHanlder(item.id)} />
        )
      })}
      <Board image={`https://th.bing.com/th/id/OIP.7KQv5iIl5pP1RGC5ICS5SQHaEo?pid=ImgDet&rs=1`} boardName="Create new Room" clicked={() => boardHanlder()}></Board>
    </div>
  )
}
