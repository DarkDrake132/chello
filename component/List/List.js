import styles from './List.module.css'
import Task from '../Task/Task'
import Title from './Title'
import InputContainer from '../Input/InputContainer'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'


function List({list, index}){
    return(
        <Draggable draggableId={list.id} index={index}>
            {(provided)=>(
                <div {...provided.draggableProps} ref={provided.innerRef}>

                    <div className={styles.container} {...provided.dragHandleProps} >
                        <Title title={list.title} listId={list.id}/>
                        <Droppable droppableId={list.id}>
                            {(provided)=>(
                                <div ref={provided.innerRef}{...provided.droppableProps} style={{marginTop: "16px"}}>
                                    {list.tasks.map((task, index) =>(
                                        <Task key={task.id} task={task} index={index}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <InputContainer listId={list.id} type="card"/>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default List