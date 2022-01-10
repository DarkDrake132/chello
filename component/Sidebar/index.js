import React from "react";
import { Row, Col } from "react-bootstrap";

import { useApp } from "../../context/AppProvider";

import RoomInfo from "./RoomInfo";
import RoomList from "./RoomList";

export default function Sidebar() {
  const { selectedRoom } = useApp();

  return (
    <Row>
      <Col md={12}>
        <RoomInfo name={selectedRoom.name} description={selectedRoom.description} />
      </Col>
      <Col md={12} style={{ paddingRight: 0 }}>
        <RoomList />
      </Col>
    </Row>
  );
}
