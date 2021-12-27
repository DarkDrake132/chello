import { Fragment } from "react";
import ChatList from "../ChatList/ChatList";
import ChatForm from "../ChatList/ChatForm";

export default function ChatWindow() {
  return (
    <Fragment>
      <div>
        <div>
          <p>Room name</p>
          <span>Đây là room default</span>
        </div>
        <ChatList />
        <ChatForm />
      </div>
      <div></div>
    </Fragment>
  );
}
