import { Fragment } from "react";
import ChatList from "../ChatList/ChatList";
import ChatForm from "../ChatList/ChatForm";

export default function ChatWindow({ selectedRoom }) {
  return (
    <Fragment>
      <div>
        <div>
          <p>{selectedRoom.name}</p>
          <span>{selectedRoom.description}</span>
        </div>
        <ChatList />
        <ChatForm />
      </div>
      <div></div>
    </Fragment>
  );
}
