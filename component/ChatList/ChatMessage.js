import React from "react";

import Avatar from "@atlaskit/avatar";

export default function ChatMessage({ text, displayName, createAt, photoURL }) {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <Avatar src={photoURL} />
        <h4 className="ms-2 fs-5 fw-bold">{displayName}</h4>
        <h5 className="ms-3 fs-6" style={{ color: "#a7a7a7" }}>{createAt}</h5>
      </div>
      <div>
        <p className="ms-4">{text}</p>
      </div>
    </div>
  );
}
