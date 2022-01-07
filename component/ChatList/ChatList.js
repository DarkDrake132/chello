import React, { useMemo } from "react";

import { useApp } from "../../context/AppProvider";
import  useFirestore from "../../hooks/useFirestore";

import ChatMessage from "./ChatMessage";

export default function ChatList() {
  const { selectedRoomId } = useApp();
  const condition = useMemo(() => ({
    fieldName: "roomId",
    operator: "==",
    compareValue: selectedRoomId,
  }), [selectedRoomId])
  const messages = useFirestore("messages", condition);

  console.log(messages);

  return (
    <div
      className="d-flex align-items-start-end flex-column justify-content-end"
      style={{
        height: "85vh",
        padding: "10px",
        maxHeight: "100%",
        overFlowY: "auto",
      }}
    >
      {messages.map(message => 
      {
        return (

          <ChatMessage
          key={message.id}
          text={message.text}
          photoURL={message.photoURL}
          displayName={message.displayName}
          //createAt={formatDate(message.createdAt)}
        />
        )
      })}
    </div>
  );
}
