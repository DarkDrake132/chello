import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useApp } from "../context/AppProvider";
import { useAuth } from "../context/AuthContext";

import { addDocument } from "../firebase/service";

import styles from "../styles/Home.module.css";
import Board from "../component/Board/Board";

import { Modal, Button, FormControl } from "react-bootstrap";

export default function Home() {
  const [room, setRoom] = useState({
    name: "",
    description: "",
  });
  const { setSelectedRoomId } = useApp();

  const router = useRouter();
  const { rooms, isAddRoomVisible, setIsAddRoomVisible } = useApp();
  const { user } = useAuth();

  function boardHanlder(id) {
    setSelectedRoomId(id);
    router.push(`/${id}`);
  }

  function createBoardHandler() {
    if (room.name.length === 0) {
      alert("Please enter a name for the board");
      return;
    } else {
      addDocument("rooms", {...room, members: [user.uid]});
      setIsAddRoomVisible(false);
      setRoom({
        name: "",
        description: "",
      });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isAddRoomVisible}
        onHide={() => setIsAddRoomVisible(false)}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Creating new Room...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>What will be the name for your room</h5>
          <FormControl
            placeholder="Enter Room's name here"
            aria-label="Room's Name"
            aria-describedby="basic-addon1"
            name="name"
            required
            value={room.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <h5 className="fs-6">Some description</h5>
          <FormControl
            placeholder="Enter description here"
            aria-label="Description"
            aria-describedby="basic-addon1"
            name="description"
            value={room.description}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsAddRoomVisible(false);
              setRoom({
                name: "",
                description: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button onClick={createBoardHandler}>Create Now!</Button>
        </Modal.Footer>
      </Modal>
      <Button style={{ marginTop: 10, marginLeft: 20 }} onClick={() => setIsAddRoomVisible(true)}>Tạo phòng mới</Button>
      <div className={styles.Container + " container d-flex flex-wrap rounded"}>
        {rooms.map((room) => {
          const { name, id } = room;
          return (
            <Board
              key={id}
              image={`https://dncache-mauganscorp.netdna-ssl.com/thumbseg/58/58558-bigthumbnail.jpg`}
              boardName={name}
              clicked={() => boardHanlder(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
