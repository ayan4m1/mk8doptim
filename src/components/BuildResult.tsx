import { useMemo } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import StatBars from './StatBars';
import {
  calculateStats,
  EquivalentBuilds,
  getTotalStatScore,
  StatType
} from '../utils';
import {
  faCar,
  faCircleDot,
  faHelmetSafety,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  builds: EquivalentBuilds;
}

const partStatMax = new Map<StatType, number>(
  Object.values(StatType).map((type) => [type, 10])
);
const totalStatMax = new Map<StatType, number>(
  Object.values(StatType).map((type) => [type, 20])
);

export default function BuildResult({ builds }: IProps) {
  if (!builds?.bodies.length) {
    return null;
  }

  const effectiveParts = useMemo(
    () => ({
      body: builds.bodies[0],
      driver: builds.drivers[0],
      glider: builds.gliders[0],
      tire: builds.tires[0]
    }),
    [builds]
  );
  const buildStats = useMemo(
    () => calculateStats(effectiveParts),
    [effectiveParts]
  );
  const totalScore = useMemo(
    () => getTotalStatScore(buildStats),
    [effectiveParts]
  );
  const qualityRating = useMemo(
    () => Math.round((totalScore / 260 - 0.5) * 1e2),
    [totalScore]
  );
  const bestTrackType = useMemo(() => {
    const stats: [number, string][] = [
      [
        [StatType.GroundSpeed, StatType.GroundHandling].reduce(
          (sum, type) => sum + buildStats.get(type),
          0
        ),
        'Ground'
      ],
      [
        [StatType.WaterSpeed, StatType.WaterHandling].reduce(
          (sum, type) => sum + buildStats.get(type),
          0
        ),
        'Water'
      ],
      [
        [StatType.AirSpeed, StatType.AirHandling].reduce(
          (sum, type) => sum + buildStats.get(type),
          0
        ),
        'Air'
      ],
      [
        [StatType.AntiGravitySpeed, StatType.AntiGravityHandling].reduce(
          (sum, type) => sum + buildStats.get(type),
          0
        ),
        'Anti-Gravity'
      ]
    ];

    const statValues = [...stats.map(([val]) => val)];
    const [, name] = stats.find(([val]) => val === Math.max(...statValues));

    return name;
  }, [buildStats]);

  return (
    <Container className="mt-4">
      <h2>Results</h2>
      <Row className="mb-2">
        <Col xs={3}>
          <h5>
            <FontAwesomeIcon icon={faCar} /> Vehicles
          </h5>
          <ListGroup>
            {builds.bodies.map((body) => (
              <ListGroupItem key={body.name}>{body.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col xs={3}>
          <h5>
            <FontAwesomeIcon icon={faHelmetSafety} /> Drivers
          </h5>
          <ListGroup>
            {builds.drivers.map((driver) => (
              <ListGroupItem key={driver.name}>{driver.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col xs={3}>
          <h5>
            <FontAwesomeIcon icon={faPaperPlane} /> Gliders
          </h5>
          <ListGroup>
            {builds.gliders.map((glider) => (
              <ListGroupItem key={glider.name}>{glider.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col xs={3}>
          <h5>
            <FontAwesomeIcon icon={faCircleDot} /> Tires
          </h5>
          <ListGroup>
            {builds.tires.map((tire) => (
              <ListGroupItem key={tire.name}>{tire.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={3}>
          <StatBars stats={effectiveParts.body.stats} maxStats={partStatMax} />
        </Col>
        <Col xs={3}>
          <StatBars
            stats={effectiveParts.driver.stats}
            maxStats={partStatMax}
          />
        </Col>
        <Col xs={3}>
          <StatBars
            stats={effectiveParts.glider.stats}
            maxStats={partStatMax}
          />
        </Col>
        <Col xs={3}>
          <StatBars stats={effectiveParts.tire.stats} maxStats={partStatMax} />
        </Col>
      </Row>
      <h4>Overall Stats</h4>
      <h6>Best Track Type: {bestTrackType}</h6>
      <h6>Stat Points: {totalScore} / 260</h6>
      <h6>
        Quality:{' '}
        <span className={`text-${qualityRating > 0 ? 'success' : 'danger'}`}>
          {Math.abs(qualityRating)}% {qualityRating > 0 ? 'above' : 'below'}{' '}
          average
        </span>
      </h6>
      <StatBars stats={buildStats} maxStats={totalStatMax} />
    </Container>
  );
}
