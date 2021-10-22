import styles from '../styles/Home.module.css'
import { Button, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      {/* Test boostrap */}
      <Row className="mx-0">
        <Button as={Col} variant="primary">Button #1</Button>
        <Button as={Col} variant="secondary" className="mx-2">Button #2</Button>
        <Button as={Col} variant="success">Button #3</Button>
      </Row>
      <p>Hello world!</p>
    </div>
  )
}
