import { Row, Col, Spinner, Container } from 'react-bootstrap';

export default function SuspenseFallback() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Loading...</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Spinner animation="border" className="my-3" />
        </Col>
      </Row>
    </Container>
  );
}
