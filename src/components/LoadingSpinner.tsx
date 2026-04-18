import { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingSpinner() {
  return (
    <Fragment>
      <title>mk8doptim - Loading...</title>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <FontAwesomeIcon icon={faSpinner} size="2xl" spin />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
