import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faEraser,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
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
  mappingPresets,
  StatMapping,
  StatType,
  StatTypeAbbreviations,
  StatTypeColors
} from '../utils';

interface IProps {
  onSubmit: (mode: string, weights?: StatMapping) => void;
}

export default function OptimizeForm({ onSubmit }: IProps) {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [mode, setMode] = useState<CalculationMode>(CalculationMode.Overall);
  const statRef = useRef<HTMLSelectElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const [statMap, setStatMap] = useState<StatMapping>(
    new Map<StatType, number>()
  );
  const remainingPercent = useMemo(
    () => getRemainingPercent(statMap),
    [statMap]
  );
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(mode, statMap);
    },
    [mode, statMap, onSubmit]
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

    setStatMap((map) => {
      if (map.has(statType)) {
        return map;
      }

      const newMap = new Map<StatType, number>(map);

      newMap.set(statType, parseInt(weightRef.current.value, 10) / 1e2);

      weightRef.current.value = getRemainingPercent(newMap).toString();

      return newMap;
    });
  }, [statRef, weightRef, remainingPercent, setStatMap]);
  const handleStatClear = useCallback(
    () => setStatMap(new Map<StatType, number>()),
    []
  );
  const handleDismissInstructions = useCallback(
    () => setShowInstructions(false),
    [setShowInstructions]
  );
  const handleUpdateMode = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newMode = event.target.value as CalculationMode;

      setMode(newMode);
      if (newMode !== 'weighted' && newMode !== 'overall') {
        setStatMap(mappingPresets.get(newMode));
      }
      if (newMode === 'weighted' && !showInstructions) {
        setShowInstructions(true);
      } else if (newMode !== 'weighted' && showInstructions) {
        setShowInstructions(false);
      }
    },
    [setMode, setStatMap, showInstructions]
  );

  return (
    <Container fluid>
      <h2>Optimize</h2>
      {showInstructions && (
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
                  onChange={handleUpdateMode}
                  className="flex-fill me-2"
                >
                  <option value="overall">Overall</option>
                  {Array.from(mappingPresets.entries()).map(([name]) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                  <option value="weighted">Custom Weights</option>
                </Form.Select>
                {mode === 'overall' && (
                  <Button variant="success" type="submit">
                    <FontAwesomeIcon fixedWidth icon={faCalculator} /> Calculate
                  </Button>
                )}
              </Col>
            </Row>
            {mode !== 'overall' && (
              <Fragment>
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
                      disabled={remainingPercent === 100}
                    >
                      <FontAwesomeIcon icon={faEraser} /> Clear
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} className="d-flex align-items-center">
                    <ProgressBar max={100} className="flex-fill me-2">
                      {statMap?.entries() &&
                        Array.from(statMap.entries()).map(([type, weight]) => (
                          <ProgressBar
                            key={type}
                            now={weight * 1e2}
                            style={{ backgroundColor: StatTypeColors[type] }}
                            label={StatTypeAbbreviations[type]}
                          />
                        ))}
                    </ProgressBar>
                    <Button
                      variant="success"
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
