import React from "react";
import ChatMessage from "./ChatMessage";

export default function ChatList() {
  return (
    <div
      className="d-flex align-items-start-end flex-column justify-content-end"
      style={{
        height: "80vh",
        padding: "10px",
        maxHeight: "100%",
        overFlowY: "auto",
      }}
    >
      <ChatMessage
        text="Text"
        photoURL={null}
        displayName="Bach"
        createAt={123213213213123}
      />
      <ChatMessage
        text="Text 123"
        photoURL={null}
        displayName="Bach"
        createAt={123213213213123}
      />
      <ChatMessage
        text="Text test"
        photoURL={null}
        displayName="Bach"
        createAt={123213213213123}
      />
      <ChatMessage
        text="Text oke"
        photoURL={null}
        displayName="Bach"
        createAt={123213213213123}
      />
    </div>
  );
}
