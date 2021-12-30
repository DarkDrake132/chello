import List from "../../component/List/List"

import store from '../../utils/store'
import { useState } from "react"
import StoreApi from "../../utils/storeApi"
import { uuid } from "uuidv4"
import InputContainer from "../../component/Input/InputContainer"
import { DragDropContext } from "react-beautiful-dnd"
import { Droppable } from "react-beautiful-dnd"

export default function Board() {
    const [data, setData] = useState(store)
    const addMoreTask = (name, listId)=>{
        const newTaskId = uuid();
        const newTask ={
            id: newTaskId,
            name: name
        }

        const list = data.lists[listId]
        list.tasks=[...list.tasks,newTask]

        const newState = {
            ...data,
            lists:{
                ...data.lists,
                [listId]: list
            }
        }
        setData(newState)
    }

    const addMoreList = (title) =>{
        const newListId = uuid()
        const newList = {
            id: newListId,
            title,
            tasks: []
        };

        const newState ={
            listsIds: [...data.listsIds, newListId],
            lists:{
                ...data.lists,
                [newListId]: newList
            }
        }

        setData(newState);
    }

    const updateListTitle = (title, listId)=>{
        const list = data.lists[listId]
        list.title = title
        const newState = {
            ...data,
            lists:{
                ...data.lists,
                [listId]: list
            }
        }
        setData(newState)
    }

    const onDragEnd = (result)=>{
        const {destination, source, draggableId, type} = result;
        if(!destination){
            return
        }

        if(type ==='list'){
            const newListIds = data.listsIds
            newListIds.splice(source.index,1)
            newListIds.splice(destination.index,0,draggableId)
            return
        }

        const sourceList = data.lists[source.droppableId]
        const destinationList = data.lists[destination.droppableId]
        const draggingTask = sourceList.tasks.filter((task) => task.id == draggableId)[0]
        if(source.droppableId === destination.droppableId){
            sourceList.tasks.splice(source.index,1)
            destinationList.tasks.splice(destination.index, 0, draggingTask)
            const newState={
                ...data,
                lists:{
                    ...data.lists,
                    [sourceList.id]: destinationList
                }
            }

            setData(newState)
        }else{
            sourceList.tasks.splice(source.index,1)
            destinationList.tasks.splice(destination.index,0,draggingTask)

            const newState={
                ...data,
                lists:{
                    ...data.lists,
                    [sourceList.id]:sourceList,
                    [destinationList.id]: destinationList
                }
            }

            setData(newState)
        }
    }

    return (
        <StoreApi.Provider value={{addMoreTask, addMoreList, updateListTitle}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="app" type='list' direction="horizontal">
                    {(provided)=>(
                        <div style={{margin: "36px"}} className="d-flex justify-content-start" ref={provided.innerRef}{...provided.droppableProps}>
                            {
                                data.listsIds.map((listId, index)=>{
                                    const list = data.lists[listId]
                                    return <List list={list} key ={listId} index={index}/>
                                })
                            }
                            <InputContainer type="list"/>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    )
}