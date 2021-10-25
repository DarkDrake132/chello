import styles from '../styles/Home.module.css'
import Board from '../component/Board/Board';

import { useState } from 'react'

export default function Home() {
  const [ board, setBoard ] = useState([
    {
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    },
    {
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'QHTT'
    },
    {
      image: `https://th.bing.com/th/id/R.3ed7cfc51b4d3b1d8ad2731da7c5ab58?rik=KK%2fN1qGA37HlTQ&pid=ImgRaw&r=0`,
      boardName: 'Thiết kế giao diện'
    },
    {
      image: `https://th.bing.com/th/id/R.7414d461bf1f6c332a38aca5d297222d?rik=gHvWKb9rAYLbAA&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    },
    {
      image: `https://th.bing.com/th/id/R.7414d461bf1f6c332a38aca5d297222d?rik=gHvWKb9rAYLbAA&pid=ImgRaw&r=0`,
      boardName: 'Software Modeling'
    }
  ])

  return (
    <div className={styles.Container + ' container d-flex flex-wrap rounded'}>
      {board.map((item, id) => {
        return (
          <Board key={id} image={item.image} boardName={item.boardName} />
        )
      })}
    </div>
  )
}
