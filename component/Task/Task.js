import { Draggable } from "react-beautiful-dnd"
import { Card } from "react-bootstrap"
import styles from './Task.module.css'

function Task({task, index}){
    return(
        <Draggable draggableId={task.id} index={index}>
            {(provided)=>(
                <div ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}>
                    <Card border="secondary" className={styles.container} >
                        <Card.Body>
                            <Card.Text>
                                {task.name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

export default Task