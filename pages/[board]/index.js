import List from "../../component/List/List"

import { useRouter } from "next/router";
import store from '../../utils/store'
import { useState, useEffect } from "react"
import StoreApi from "../../utils/storeApi"
import { uuid } from "uuidv4"
import InputContainer from "../../component/Input/InputContainer"
import { DragDropContext } from "react-beautiful-dnd"
import { Droppable } from "react-beautiful-dnd"
import { useApp } from "../../context/AppProvider";
import { addMember, removeMember, getBoard, addList, renameList, moveTask } from "../../firebase/service";

import BoardLayout from "../../hoc/BoardLayout/BoardLayout";
import {
  Button,
  Popover,
  OverlayTrigger,
  Modal,
  FormControl,
} from "react-bootstrap";
import Avatar from "@atlaskit/avatar";
import { values } from "lodash";

export default function Board() {

  const [newMember, setNewMember] = useState("");
  const { members, isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId } = useApp();
  const router = useRouter();
  const [data, setData] = useState([])
  let [listsId, setListsId] = useState([])
    const [idListHiden, setIdListHiden] = useState('')
    useEffect(() => {
       const getData = async () =>{
        const dl = await getBoard(selectedRoomId)
        console.log(dl.lists);
        // let data = await Promise.all(dl.lists)
        // console.log(dl);
        // data = await data.map(values =>  Promise.all(values.tasks).then(values => values.taskName))
        // data =   data.map(values => values)
        // console.log("data: ",data);
    
        setListsId(dl.listsId)
        console.log("dl.list: ", dl.listsId);
    //     const datalist = await Promise.all(dl.lists).then((values) => {
    //         return values})
        
    //    const zdata =  datalist.map(i =>{
    //         return  Promise.all(i.tasks).then( values => values)
    //     } )

    //     const zzdata = await Promise.all(zdata).then(values=> values)
    //     console.log("object: ", zzdata);
        setData(dl.lists);
       }  
        getData();
    }, []);

    // listsId = listsId.filter(item => item!== idListHiden)

    
    // const addMoreTask = (name, listId)=>{
    //     const newTaskId = uuid();
    //     const newTask ={
    //         id: newTaskId,
    //         name: name
    //     }

    //     const list = data.lists[listId]
    //     list.tasks=[...list.tasks,newTask]

    //     const newState = {
    //         ...data,
    //         lists:{
    //             ...data.lists,
    //             [listId]: list
    //         }
    //     }
    //     setData(newState)
    // }

    const addMoreList = (title) =>{
        const newListId = uuid()
        // const newList = {
        //     id: newListId,
        //     title,
        //     tasks: []
        // };
        addList(newListId,title,selectedRoomId)
        // const newState ={
        //     listsIds: [...data.listsIds, newListId],
        //     lists:{
        //         ...data.lists,
        //         [newListId]: newList
        //     }
        // }
        const newState = [...listsId, newListId]

        setListsId(newState);
    }

    const updateListTitle = (title, listId)=>{

      // setIdTitleUpdate
      renameList(listId, title)
        // const list = data.lists[listId]
        // list.title = title
        // const newState = {
        //     ...data,
        //     lists:{
        //         ...data.lists,
        //         [listId]: list
        //     }
        // }
        // setData(newState)
    }

    const [update,setUpdate] = useState(false) 
    const onDragEnd = (result)=>{
        const {destination, source, draggableId, type} = result;
        if(!destination){
            return
        }

        if(type ==='list'){
            // const newListIds = data.listsIds
            // newListIds.splice(source.index,1)
            // newListIds.splice(destination.index,0,draggableId)
            return
        }
        const sourceList = source.droppableId
        const destinationList = destination.droppableId
        // const draggingTask = sourceList.tasks.filter((task) => task.id == draggableId)[0]

        // const sourceList = data.lists[source.droppableId]
        // const destinationList = data.lists[destination.droppableId]
        // const draggingTask = sourceList.tasks.filter((task) => task.id == draggableId)[0]
        if(source.droppableId === destination.droppableId){
            // sourceList.tasks.splice(source.index,1)
            // destinationList.tasks.splice(destination.index, 0, draggingTask)
            // const newState={
            //     ...data,
            //     lists:{
            //         ...data.lists,
            //         [sourceList.id]: destinationList
            //     }
            // }

            // setData(newState)
            return
        }else{

            moveTask(draggableId, sourceList, destinationList)
            setUpdate(true)
            // sourceList.tasks.splice(source.index,1)
            // destinationList.tasks.splice(destination.index,0,draggingTask)

            // const newState={
            //     ...data,
            //     lists:{
            //         ...data.lists,
            //         [sourceList.id]:sourceList,
            //         [destinationList.id]: destinationList
            //     }
            // }
            
            // setData(newState)
            
        }
    }

   
    

  function handleChange(e) {
    e.preventDefault();
    setNewMember(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!addMember(router.query.board, newMember)) {
      alert("Không tim thấy user hợp lệ")
    } else {
      setNewMember("");
      setIsInviteMemberVisible(false);
    }
  }

  function handleRemoveMember(memberId) {
    removeMember(router.query.board, memberId)
  }

  const popover = (id, displayName) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{displayName}</Popover.Header>
      <Popover.Body>
        <Button variant="danger" onClick={() => handleRemoveMember(id)}>Xóa thành viên khỏi room</Button>
      </Popover.Body>
    </Popover>
  );

  const avatar = members.map((member) => {
    return (
      <OverlayTrigger
        key={member.uid}
        trigger="click"
        placement="bottom"
        overlay={popover(member.uid, member.displayName)}
      >
        <Avatar src={member.photoURL} onClick={() => {}} />
      </OverlayTrigger>
    );
  });

  return (
    <BoardLayout>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isInviteMemberVisible}
        onHide={() => setIsInviteMemberVisible(false)}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding new member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Type to find user</h5>
          <FormControl
            placeholder="Nhập tên người dùng"
            aria-label="Room's Name"
            aria-describedby="basic-addon1"
            name="name"
            required
            value={newMember}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsInviteMemberVisible(false);
              setNewMember("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)}>
            Thêm thành viên!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex float-end m-2">
        <Button className="pr-1" onClick={() => setIsInviteMemberVisible(true)}>
          Mời thêm thành viên
        </Button>
        <div className="mx-2"></div>
        {avatar}
      </div>
      <StoreApi.Provider value={{ addMoreList, updateListTitle}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="app" type='list' direction="horizontal">
                    {(provided)=>(
                        <div style={{margin: "50px"}} className="d-flex justify-content-start" ref={provided.innerRef}{...provided.droppableProps}>
                            {
                               
                                listsId.map((list, index)=>{
                                    // const list = data.lists[listId]
                                    return <List list={list} key ={index} index={index} hiden={setIdListHiden}/>
                                })
                            }
                            <InputContainer type="list"/>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    </BoardLayout>
  );
}

