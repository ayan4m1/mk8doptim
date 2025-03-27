import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingSpinner() {
  return (
    <Fragment>
      <Helmet title="Loading..." />
      <Container fluid>
        <Row>
          <Col xs={12}>
            <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
