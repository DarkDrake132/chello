import React from "react";

import Avatar from "@atlaskit/avatar";

export default function ChatMessage({ text, displayName, photoURL }) {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <Avatar src={photoURL} />
        <h4 className="ms-2 fs-5 fw-bold">{displayName}</h4>
      </div>
      <div>
        <p className="ms-4">{text}</p>
      </div>
    </div>
  );
}
