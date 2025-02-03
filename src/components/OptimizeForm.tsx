import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faEraser,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  ProgressBar,
  Row
} from 'react-bootstrap';

import {
  getRemainingPercent,
  StatSearch,
  StatType,
  StatTypeAbbreviations,
  StatTypeColors
} from '../utils';

interface IProps {
  onSubmit: (stats: StatSearch) => void;
}

export default function OptimizeForm({ onSubmit }: IProps) {
  const statRef = useRef<HTMLSelectElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const [statMap, setStatMap] = useState<StatSearch>(
    new Map<StatType, number>()
  );
  const remainingPercent = useMemo(
    () => getRemainingPercent(statMap),
    [statMap]
  );
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(statMap);
    },
    [statMap]
  );
  const handleStatAdd = useCallback(() => {
    if (!statRef.current || !weightRef.current) {
      return;
    }

    const weight = parseInt(weightRef.current.value, 10);

    if (isNaN(weight) || weight <= 0 || weight > remainingPercent) {
      return;
    }

    const statType = statRef.current.value as StatType;

    if (statMap.has(statType)) {
      return;
    }

    setStatMap((map) => {
      if (map.has(statType)) {
        return map;
      }

      const newMap = new Map<StatType, number>(statMap);

      newMap.set(statType, parseInt(weightRef.current.value, 10) / 1e2);

      weightRef.current.value = getRemainingPercent(newMap).toString();

      return newMap;
    });
  }, [statRef, weightRef, remainingPercent, setStatMap]);
  const handleStatClear = useCallback(
    () => setStatMap(new Map<StatType, number>()),
    []
  );
  // const handleStatRemove = useCallback(() => {
  //   if (!statRef.current) {
  //     return;
  //   }

  //   const statType = statRef.current.value as StatType;

  //   if (!statMap.current.has(statType)) {
  //     return;
  //   }

  //   statMap.current.delete(statType);
  // }, [statRef]);

  return (
    <Container fluid className="mt-4">
      <h2>Optimize</h2>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={8} className="pe-0">
                <Form.Select ref={statRef}>
                  {Object.entries(StatType).map(([key, val]) => (
                    <option key={key} value={val}>
                      {key.replace(/([^^])([A-Z])/g, '$1 $2')}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={2}>
                <InputGroup>
                  <Form.Control
                    min={0}
                    max={remainingPercent}
                    type="number"
                    ref={weightRef}
                    disabled={remainingPercent <= 0}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col xs={2} className="d-flex">
                <Button
                  variant="success"
                  type="button"
                  onClick={handleStatAdd}
                  className="flex-fill me-1"
                  disabled={remainingPercent <= 0}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={handleStatClear}
                  className="flex-fill ms-1"
                >
                  <FontAwesomeIcon icon={faEraser} /> Clear
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ListGroup className="my-4">
                  <ProgressBar max={100}>
                    {Array.from(statMap.entries()).map(([type, weight]) => (
                      <ProgressBar
                        key={type}
                        now={weight * 1e2}
                        style={{ backgroundColor: StatTypeColors[type] }}
                        label={StatTypeAbbreviations[type]}
                      />
                      // { <span>
                      //   {index + 1}.{' '}
                      //   {`${type[0].toLocaleUpperCase()}${type.substring(1)}`.replace(
                      //     /([^^])([A-Z])/g,
                      //     '$1 $2'
                      //   )}
                      // </span>
                      // <Button
                      //   size="sm"
                      //   variant="danger"
                      //   className="ms-auto"
                      //   onClick={() => handleStatRemove(type)}
                      // >
                      //   <FontAwesomeIcon icon={faRemove} fixedWidth />
                      // </Button>}
                    ))}
                  </ProgressBar>
                </ListGroup>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!statMap.size || remainingPercent > 0}
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
