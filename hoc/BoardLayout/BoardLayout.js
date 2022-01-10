import { Col, Row } from "react-bootstrap";

import Sidebar from "../../component/Sidebar";

export default function BoardLayout({children}) {
  return (
    <Row>
      <Col xs={0} md={2} style={{ background: "#F1F2F5", height: "100%" }}>
        <Sidebar />
      </Col>
      <Col xs={12} md={10}>
        {children}
      </Col>
    </Row>
  );
}
