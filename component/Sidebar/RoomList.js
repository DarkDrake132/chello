import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Accordion } from "react-bootstrap";

export default function RoomList() {
  const router = useRouter();
  const { board } = router.query;

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Milestones</Accordion.Header>
          <Accordion.Body>
            <Link href={`/${board}/`}>Your Default Trello Board</Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Chat rooms</Accordion.Header>
          <Accordion.Body>
            <Link href={`/${board}/chat`}>Your Default Chat Room</Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
