import React from "react";

export default function RoomInfo({ name, description }) {
  return (
    <div className="m-2">
      <h3 className="text-center">{name}</h3>
      <p>{description}</p>
    </div>
  );
}
