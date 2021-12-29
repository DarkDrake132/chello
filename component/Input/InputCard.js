import { useState, useContext } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap"
import { MdClear } from "react-icons/md";
import storeApi from "../../utils/storeApi";
export default function InputCard({setOpen, listId, type}) {
    const [cardName, setCardName] = useState(null)
    const handleOnChange = (e)=>{
        setCardName(e.target.value)
    }
    const {addMoreTask, addMoreList} = useContext(storeApi)

    const handleBtnConfirm =()=>{
        if(type === "card"){
            addMoreTask(cardName, listId)
            setCardName(null)
            setOpen(false)
        } else{
            if(cardName==null){
                setOpen(false)
            }
            else{
                addMoreList(cardName)
                setCardName(null)
                setOpen(false)
            }
            
        }
    }
    return (
        <div style={{margin: "8px"}} >
            <div>
                <FloatingLabel label={type === 'card'?"Enter task title":"Enter list title"}>
                    <Form.Control
                   
                    onChange={handleOnChange}
                    autoFocus
                    as="textarea"
                    defaultValue={cardName}
                    placeholder="Input title"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
            </div>
            <div style={{marginTop: "8px"}} className="d-flex align-items-center">
                <Button style={{marginRight: "8px"}} onClick={handleBtnConfirm}>{type ==="card"?"Add task":"Add list"}</Button>
                <button type="button" className="btn-close" aria-label="Close" onClick={()=>setOpen(false)}></button>
                {/* <MdClear style={{marginLeft: "8px"}} size={24}/> */}
            </div>
        </div>
    )
}
