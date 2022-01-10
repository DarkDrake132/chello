import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useApp } from "../../context/AppProvider";
import { useAuth } from "../../context/AuthContext";
import { addDocument } from "../../firebase/service";

export default function ChatList() {
  const { selectedRoomId } = useApp();
  const { user } = useAuth();

  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmitNewMessage = (e) => {
    e.preventDefault();
    if (newMessage.length === 0) {
      return;
    }
    console.log(user);
    addDocument("messages", {
      text: newMessage,
      uid: user.uid,
      photoURL: user.photoURL,
      roomId: selectedRoomId,
      displayName: user.displayName,
    });
    setNewMessage("");
  };

  return (
    <Form
      className="d-flex justify-content-between"
      onSubmit={handleSubmitNewMessage}
    >
      <Form.Group controlId="formBasicEmail" style={{ width: "80%", marginLeft: "10px"}}>
        <Form.Control
          value={newMessage}
          onEnter={handleSubmitNewMessage}
          onChange={handleNewMessageInput}
          type="text"
          placeholder="Nhập tin nhắn"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="px-4 mx-4">
        Gửi
      </Button>
    </Form>
  );
}
