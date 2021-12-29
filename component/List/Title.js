import { InputGroup, FormControl } from "react-bootstrap"
import { useState } from "react"
import styles from './List.module.css'
import { FiMoreHorizontal } from "react-icons/fi";
import { useContext } from "react";
import storeApi from "../../utils/storeApi";
const Title = ({title, listId}) =>{
    const [newTitle, setNewTitle] = useState(title)
    const [open, setOpen] = useState(false)
    const {updateListTitle} = useContext(storeApi)
    const handleOnChange =(e)=>{
        setNewTitle(e.target.value)
    }

    const handleOnBlur = () =>{
        updateListTitle(newTitle, listId)
        setOpen(false)
    }
    return(
        <div >
            <div>
                {open?(
                    <InputGroup className="mb-3">
                        <FormControl defaultValue={title} onBlur={handleOnBlur} autoFocus
                        onChange={handleOnChange}/>
                    </InputGroup>
                ):(
                    <div onClick={()=> setOpen(!open)} className="d-flex justify-content-space-between">
                        <div className={styles.title}>{title}</div>
                        <div><FiMoreHorizontal size={28}/></div>
                    </div>
                )}
            </div>
        </div>
     
    )
}

export default Title