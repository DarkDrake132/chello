import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ChatList() {
  return (
    <Form className="d-flex justify-content-between">
      <Form.Group controlId="formBasicEmail" style={{ width: "70%" }}>
        <Form.Control type="text" placeholder="Nhập tin nhắn" />
      </Form.Group>
      <Button variant="primary" type="submit" className="px-4 mx-4">
        Gửi
      </Button>
    </Form>
  );
}
