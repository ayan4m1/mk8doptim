import { ChangeEvent, Fragment, useCallback, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faEraser,
  faPencil,
  faPlusCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ButtonGroup,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  ProgressBar,
  Row
} from 'react-bootstrap';

import {
  CalculationMode,
  getRemainingPercent,
  MappingPresets,
  OptimizeSubmitHandler,
  StatMapping,
  StatType,
  StatTypeAbbreviations,
  StatTypeColors
} from '../utils';
import { useFormik } from 'formik';

interface IProps {
  onSubmit: OptimizeSubmitHandler;
}

export default function OptimizeForm({ onSubmit }: IProps) {
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldError,
    values,
    errors
  } = useFormik({
    initialValues: {
      showInstructions: false,
      mode: CalculationMode.Overall,
      stat: StatType.Acceleration,
      weight: 0
    },
    onSubmit: (values) => onSubmit(values.mode, statMap)
  });
  const [statMap, setStatMap] = useState<StatMapping>(
    new Map<StatType, number>()
  );
  const remainingPercent = useMemo(
    () => getRemainingPercent(statMap),
    [statMap]
  );
  const handleStatAdd = useCallback(() => {
    if (!values.stat || !values.weight) {
      return;
    }

    setStatMap((map) => {
      const newMap = new Map<StatType, number>(map);

      newMap.set(values.stat, values.weight / 1e2);
      setFieldValue('weight', getRemainingPercent(newMap));

      return newMap;
    });
  }, [values, setStatMap, setFieldValue]);
  const handleStatClear = useCallback(() => {
    setStatMap(new Map<StatType, number>());
    setFieldValue('weight', '0');
  }, [setFieldValue]);
  const handleWeightChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      const currentValue = statMap.get(values.stat) * 1e2;
      const effectiveRemainingPct = remainingPercent + currentValue;

      if (value > effectiveRemainingPct) {
        setFieldError(
          'weight',
          `Weight must be less than ${effectiveRemainingPct}%`
        );
        return;
      } else if (value < 0) {
        setFieldError('weight', 'Weight must be positive.');
        return;
      }

      return handleChange(event);
    },
    [handleChange, setFieldError, remainingPercent, statMap, values]
  );
  const handleStatRemove = useCallback(
    (stat: StatType) =>
      setStatMap((map) => {
        const newMap = new Map<StatType, number>(map);

        newMap.delete(stat);

        return newMap;
      }),
    []
  );
  const handleStatChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const stat = event.target.value as StatType;

      if (statMap.has(stat)) {
        setFieldValue('weight', statMap.get(stat) * 1e2);
        return;
      }

      return handleChange(event);
    },
    [setFieldValue, handleChange, statMap]
  );
  const handleStatClick = useCallback(
    (stat: StatType) => {
      setFieldValue('stat', stat);
      setFieldValue('weight', (statMap.get(stat) * 1e2).toString());
    },
    [setFieldValue, statMap]
  );
  const handleDismissInstructions = useCallback(
    () => setFieldValue('showInstructions', false),
    [setFieldValue]
  );
  const handleUpdateMode = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newMode = event.target.value as CalculationMode;

      setFieldValue('mode', newMode);
      if (newMode !== 'weighted' && newMode !== 'overall') {
        setStatMap(MappingPresets.get(newMode));
      }
      if (newMode === 'weighted' && !values.showInstructions) {
        setFieldValue('showInstructions', true);
      } else if (newMode !== 'weighted' && values.showInstructions) {
        setFieldValue('showInstructions', false);
      }
    },
    [values, setFieldValue]
  );

  return (
    <Container>
      <h2>Optimize</h2>
      {values.showInstructions && (
        <Card bg="info" body className="my-2">
          <Row className="d-flex">
            <Col>
              <Card.Title>Instructions</Card.Title>
            </Col>
            <Col className="ms-auto text-end">
              <CloseButton onClick={handleDismissInstructions} />
            </Col>
          </Row>
          <Card.Text>
            You must assign a weighting value (in percent) to each statistic
            that you care about. For example, 100% Ground Speed would find you
            the builds with the highest ground speed, to the exclusion of all
            other stats. To add a stat weight, select the stat from the
            dropdown, enter the percentage in the text box to its right, and
            click Add. When you have added 100% total weighting, you will be
            able to click Calculate. This will then show you the builds which
            provide the best stats given the weights you have supplied.
          </Card.Text>
          <Card.Text></Card.Text>
        </Card>
      )}
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Col xs={12} className="d-flex">
                <Form.Select
                  name="mode"
                  onChange={handleUpdateMode}
                  className="flex-fill me-2"
                >
                  <option value="overall">Overall</option>
                  {Array.from(MappingPresets.entries()).map(([name]) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                  <option value="weighted">Custom Weights</option>
                </Form.Select>
                {values.mode === 'overall' && (
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faCalculator} /> Calculate
                  </Button>
                )}
              </Col>
            </Row>
            {values.mode !== 'overall' && (
              <Fragment>
                <Row>
                  <Col xs={8} className="pe-0">
                    <Form.Select
                      name="stat"
                      value={values.stat}
                      onChange={handleStatChange}
                    >
                      {Object.entries(StatType).map(([key, val]) => (
                        <option key={key} value={val}>
                          {key.replace(/([^^])([A-Z])/g, '$1 $2')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Form.Group as={Col} xs={2} controlId="weight">
                    <InputGroup hasValidation>
                      <Form.Control
                        min={0}
                        step={1}
                        name="weight"
                        type="number"
                        value={values.weight}
                        onChange={handleWeightChange}
                        disabled={!values.stat && remainingPercent <= 0}
                        isInvalid={Boolean(errors.weight)}
                      />

                      <InputGroup.Text>%</InputGroup.Text>
                      {errors.weight && (
                        <Form.Control.Feedback type="invalid">
                          {errors.weight}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>
                  <Col xs={2} className="d-flex">
                    <ButtonGroup className="flex-fill">
                      {statMap.has(values.stat) ? (
                        <Fragment>
                          <Button
                            variant="primary"
                            type="button"
                            onClick={handleStatAdd}
                          >
                            <FontAwesomeIcon icon={faPencil} /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            onClick={() => handleStatRemove(values.stat)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Remove
                          </Button>
                        </Fragment>
                      ) : (
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleStatAdd}
                          disabled={remainingPercent <= 0}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} /> Add
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        type="button"
                        onClick={handleStatClear}
                        disabled={remainingPercent === 100}
                      >
                        <FontAwesomeIcon icon={faEraser} /> Clear
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} className="d-flex align-items-center">
                    <ProgressBar
                      max={100}
                      className="flex-fill me-2 progress-thicc"
                    >
                      {statMap?.entries() &&
                        Array.from(statMap.entries()).map(([type, weight]) => (
                          <ProgressBar
                            key={type}
                            now={weight * 1e2}
                            style={{
                              backgroundColor: StatTypeColors[type],
                              cursor: 'pointer'
                            }}
                            label={StatTypeAbbreviations[type]}
                            onClick={() => handleStatClick(type)}
                            className="progress-thicc-bar"
                          />
                        ))}
                    </ProgressBar>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!statMap.size || remainingPercent > 0}
                    >
                      <FontAwesomeIcon icon={faCalculator} /> Calculate
                    </Button>
                  </Col>
                </Row>
              </Fragment>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
