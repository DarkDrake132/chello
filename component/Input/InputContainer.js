import styles from './Input.module.css'
import InputCard from './InputCard'
import { useState } from 'react'
function InputContainer({listId, type, addType}){
    const [open, setOpen] = useState(false)
    return(
        <div className={styles.inputContainer}>
            {open?(
                <InputCard  setOpen={setOpen} listId={listId} type={type} addType={addType}/>
            ):(
                <div className={styles.addCard} onClick={()=>setOpen(!open)}>{type ==="card"?"+ Add task":"+ Create a new list"}</div>
            )}
        </div>
    )
}

export default InputContainer