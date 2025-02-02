import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {
  faCar,
  faCircleDot,
  faHelmetSafety,
  faPaperPlane,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';

import { Build, Part } from '../utils';
import { useEffect } from 'react';

interface IProps {
  gliders: Part[];
  drivers: Part[];
  bodies: Part[];
  tires: Part[];
  build?: Build;
  onSubmit: (values: {
    glider: string;
    driver: string;
    body: string;
    tire: string;
  }) => void;
}

export default function BuildForm({
  gliders,
  drivers,
  bodies,
  tires,
  build,
  onSubmit
}: IProps) {
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      body: bodies[0].name,
      driver: drivers[0].name,
      glider: gliders[0].name,
      tire: tires[0].name
    },
    onSubmit
  });

  useEffect(() => {
    if (!build?.body || !build?.driver || !build?.glider || !build?.tire) {
      return;
    }

    setFieldValue('body', build.body.name);
    setFieldValue('driver', build.driver.name);
    setFieldValue('glider', build.glider.name);
    setFieldValue('tire', build.tire.name);
  }, [build]);

  return (
    <Container fluid className="mt-4">
      <h2>Build</h2>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit} className="d-flex flex-row">
            <Form.Group className="flex-grow-1 mx-2">
              <Form.Label>
                <FontAwesomeIcon icon={faCar} /> Vehicle
              </Form.Label>
              <Form.Select
                name="body"
                onChange={handleChange}
                value={values.body}
              >
                {(bodies as Part[]).map((body) => (
                  <option key={body.name} value={body.name}>
                    {body.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-grow-1 me-2">
              <Form.Label>
                <FontAwesomeIcon icon={faHelmetSafety} /> Driver
              </Form.Label>
              <Form.Select
                name="driver"
                onChange={handleChange}
                value={values.driver}
              >
                {drivers.map((driver) => (
                  <option key={driver.name} value={driver.name}>
                    {driver.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-grow-1 me-2">
              <Form.Label>
                <FontAwesomeIcon icon={faPaperPlane} /> Glider
              </Form.Label>
              <Form.Select
                name="glider"
                onChange={handleChange}
                value={values.glider}
              >
                {gliders.map((glider) => (
                  <option key={glider.name} value={glider.name}>
                    {glider.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-grow-1 me-2">
              <Form.Label>
                <FontAwesomeIcon icon={faCircleDot} /> Tires
              </Form.Label>
              <Form.Select
                name="tire"
                onChange={handleChange}
                value={values.tire}
              >
                {tires.map((tire) => (
                  <option key={tire.name} value={tire.name}>
                    {tire.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-grow-1 align-content-end text-end">
              <Button variant="success" type="submit" className="w-100">
                <FontAwesomeIcon icon={faRefresh} /> Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
