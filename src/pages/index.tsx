import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Form, ProgressBar, Row } from 'react-bootstrap';

import CustomErrorBoundary from '../components/ErrorBoundary';
import TrackTypeBar from '../components/TrackTypeBar';
import useMarioKartData from '../hooks/useMarioKartData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const ErrorBoundary = CustomErrorBoundary;

export default function IndexPage() {
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();

  if (loading) {
    return (
      <Fragment>
        <Helmet title="Mario Kart 8 Optimizer" />
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

  return (
    <Fragment>
      <Helmet title="Mario Kart 8 Optimizer" />
      <Container>
        <Form>
          <h2>Options</h2>
          <Form.Group>
            <Form.Label>Kart Body</Form.Label>
            <Form.Select>
              {bodies.map((body) => (
                <option value={body.Body}>{body.Body}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver</Form.Label>
            <Form.Select>
              {drivers.map((driver) => (
                <option value={driver.Driver}>{driver.Driver}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Glider</Form.Label>
            <Form.Select>
              {gliders.map((glider) => (
                <option value={glider.Glider}>{glider.Glider}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tires</Form.Label>
            <Form.Select>
              {tires.map((tire) => (
                <option value={tire.Tire}>{tire.Tire}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <h2>Stats</h2>
        <Row>
          <Col xs={4}>Speed</Col>
          <Col xs={8}>
            <TrackTypeBar ground={2} water={3} air={4} antiGravity={2.5} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Acceleration</Col>
          <Col xs={8}>
            <ProgressBar now={3.5} max={6} variant="primary" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Weight</Col>
          <Col xs={8}>
            <ProgressBar now={4} max={6} variant="primary" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Handling</Col>
          <Col xs={8}>
            <TrackTypeBar ground={4} water={1} air={1} antiGravity={3} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Traction</Col>
          <Col xs={8}>
            <ProgressBar now={4} max={6} variant="primary" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Mini-Turbo</Col>
          <Col xs={8}>
            <ProgressBar now={1} max={6} variant="primary" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>Invincibility</Col>
          <Col xs={8}>
            <ProgressBar now={2} max={6} variant="primary" />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
