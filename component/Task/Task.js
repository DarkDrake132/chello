import { useState, useEffect } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Card } from "react-bootstrap"
import { getTask } from "../../firebase/service"
import styles from './Task.module.css'

function Task({task, index}){
    const [taskName, setTaskName] = useState('')
    useEffect(() => {
        const getData = async () =>{
         const dl = await getTask(task)
         setTaskName(dl.taskName);
        }  
         getData();
     }, []);
    return(
        <Draggable draggableId={task} index={index}>
            {(provided)=>(
                <div ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}>
                    <Card border="secondary" className={styles.container} >
                        <Card.Body>
                            <Card.Text>
                                {taskName}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

export default Task