import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';

import { StatType } from '../hooks/useMarioKartData';
import { useFormik } from 'formik';
import { useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faPlusCircle,
  faRemove
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onSubmit: (stats: StatType[]) => void;
}

type FormType = {
  stats: StatType[];
};

export default function OptimizeForm({ onSubmit }: IProps) {
  const statRef = useRef(null);
  const { handleSubmit, handleChange, setFieldValue, values } =
    useFormik<FormType>({
      initialValues: {
        stats: []
      },
      onSubmit: ({ stats }) => onSubmit(stats)
    });
  const handleStatAdd = useCallback(() => {
    if (values.stats.includes(statRef.current.value)) {
      return;
    }

    setFieldValue('stats', [...values.stats, statRef.current.value]);
  }, [statRef, setFieldValue, values]);
  const handleStatRemove = useCallback(
    (index: number) => {
      const newStats = [...values.stats];

      newStats.splice(index, 1);

      setFieldValue('stats', newStats);
    },
    [setFieldValue, values]
  );
  return (
    <Container fluid className="mt-4">
      <h2>Optimize</h2>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              name="stats"
              hidden
              value={values.stats}
              onChange={handleChange}
            />
            <Row>
              <Col xs={10} className="pe-0">
                <Form.Select ref={statRef}>
                  {Object.entries(StatType).map(([key, val]) => (
                    <option key={key} value={val}>
                      {key.replace(/([^^])([A-Z])/g, '$1 $2')}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={2}>
                <Button
                  variant="success"
                  type="button"
                  onClick={handleStatAdd}
                  className="w-100"
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Stat
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ListGroup className="my-4">
                  {values.stats.length ? (
                    values.stats.map((type, index) => (
                      <ListGroupItem
                        key={type}
                        className="d-flex align-items-center"
                      >
                        <span>
                          {index + 1}.{' '}
                          {`${type[0].toLocaleUpperCase()}${type.substring(1)}`.replace(
                            /([^^])([A-Z])/g,
                            '$1 $2'
                          )}
                        </span>
                        <Button
                          size="sm"
                          variant="danger"
                          className="ms-auto"
                          onClick={() => handleStatRemove(index)}
                        >
                          <FontAwesomeIcon icon={faRemove} fixedWidth />
                        </Button>
                      </ListGroupItem>
                    ))
                  ) : (
                    <ListGroupItem>None yet.</ListGroupItem>
                  )}
                </ListGroup>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!values.stats.length}
                >
                  <FontAwesomeIcon icon={faCalculator} /> Calculate
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
