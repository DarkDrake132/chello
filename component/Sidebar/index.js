import React, { useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import { Row, Col } from "react-bootstrap";

import RoomInfo from "./RoomInfo";
import RoomList from "./RoomList";

export default function Sidebar() {
  // useEffect(() => {
  //   const collectionRef = collection(db, "users");
  //   onSnapshot(collectionRef, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => doc.data({
  //       ...doc.data,
  //       id: doc.id,
  //     }));

  //     console.log({ data, snapshot, docs: snapshot.docs });
  //   });
  // }, []);
  return (
    <Row>
      <Col md={12}>
        <RoomInfo />
      </Col>
      <Col md={12}>
        <RoomList />
      </Col>
    </Row>
  );
}
