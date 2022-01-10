import styles from './List.module.css'
import Task from '../Task/Task'
import Title from './Title'
import InputContainer from '../Input/InputContainer'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import { addTask, getList } from '../../firebase/service'
import { uuid } from 'uuidv4'
import { isNull } from 'lodash'


function List({list, index, hiden}){
    const [tasksId, setTasksId] = useState([])
    const [listName, setListName] = useState('')
    const [isHiden, setIsHiden] = useState('')
    useEffect(() => {
        const getData = async () =>{
         const dl = await getList(list)
         setListName(dl.listName)
         setIsHiden(dl.isHidden)
         setTasksId(dl.tasksId);
        }  
         getData();
     });

     

        const addMoreTask = (name, listId)=>{
        const newTaskId = uuid();
        // const newTask ={
        //     id: newTaskId,
        //     name: name
        // }

        // const list = data.lists[listId]
        // list.tasks=[...list.tasks,newTask]

        // const newState = {
        //     ...data,
        //     lists:{
        //         ...data.lists,
        //         [listId]: list
        //     }
        // }
        // setData(newState)

        addTask(newTaskId,name,listId)
        const newState = [...tasksId, newTaskId]
        setTasksId(newState)
    }

    

    
    return(
        <div>

            {
                isHiden?null:
                <Draggable draggableId={list} index={index}>
            {(provided)=>(
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    
                    <div className={styles.container} {...provided.dragHandleProps} >
                        <Title title={listName} listId={list} setName={setListName} hiden={hiden}/>
                       
                            <Droppable droppableId={list}>
                                {(provided)=>(
                                    <div ref={provided.innerRef}{...provided.droppableProps} style={{marginTop: "16px"}}>
                                        {tasksId.map((task, index) =>(
                                            <Task key={task} task={task} index={index}/>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                       
                        <InputContainer listId={list} type="card" addType={addMoreTask}/>
                    </div>
                    
                   
                </div>
            )}
        </Draggable>
            }
        </div>
    )
}

export default List