import React, { useMemo } from "react";

import { useApp } from "../../context/AppProvider";
import  useFirestore from "../../hooks/useFirestore";

import { formatRelative } from "date-fns/esm";

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

  const formatDate = (seconds) => {
    let formatDate = '';
    if (seconds) {
      const date = new Date(seconds * 1000);
      formatDate = formatRelative(date, new Date());

      formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }

    return formatDate;
  }

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
          createAt={formatDate(message.createdAt)}
        />
        )
      })}
    </div>
  );
}
