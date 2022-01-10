import { InputGroup, FormControl,Form, Button } from "react-bootstrap"
import { useState } from "react"
import styles from './List.module.css'
import { FiMoreHorizontal } from "react-icons/fi";
import { useContext } from "react";
import storeApi from "../../utils/storeApi";
const Title = ({title, listId, setName, hiden}) =>{
    const [newTitle, setNewTitle] = useState(title)
    const [open, setOpen] = useState(false)
    const {updateListTitle, setHiden} = useContext(storeApi)
    const handleOnChange =(e)=>{
        setNewTitle(e.target.value)
    }

    const handleOnBlur = () =>{
        if(newTitle===''){
            setName={title}
            setOpen(false)
        }
        else{
            updateListTitle(newTitle, listId)
            setName(newTitle)
            setOpen(false)
        }
    
    }

    const handleClickMore = ()=>{
        setClickMore(!clickMore)

    }

    const handleDelete = ()=>{
        // hiden = listId
        setHiden(listId)
        console.log("dfsdf:", hiden);
        setClickMore(false)
    }

    const [clickMore, setClickMore] = useState(false)

    return(
        <div >
            <div>
                {open?(
                    <InputGroup className="mb-3">
                        <Form.Control defaultValue={title} onBlur={handleOnBlur} autoFocus
                        onChange={handleOnChange}/>
                    </InputGroup>
                ):(
                    <div className="d-flex justify-content-space-between">
                        <div className={styles.title} onClick={()=> setOpen(!open)} >{title}</div>
                        <div>
                            {
                                clickMore?<div>
                                    <div style={{marginLeft: "42px"}}>
                                    <FiMoreHorizontal size={28} onClick={handleClickMore} />
                                    </div>
                                    
                                    <Button variant="danger" className="position-sticky" onClick={handleDelete} >Delete</Button>
                                </div>:<FiMoreHorizontal size={28} onClick={handleClickMore}/>
                            }
                        
                        </div>
                    </div>
                )}
            </div>
        </div>
     
    )
}

export default Title