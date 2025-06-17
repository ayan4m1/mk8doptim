import { useMemo } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import StatBars from './StatBars';
import {
  calculateStats,
  EquivalentBuilds,
  getTotalStatScore,
  PartType,
  StatMaxes,
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

export default function BuildResult({ builds }: IProps) {
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
  const totalScore = useMemo(() => getTotalStatScore(buildStats), [buildStats]);
  const qualityRating = useMemo(
    () => Math.round((totalScore / 155) * 1e2),
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
        <Col md={3} sm={12}>
          <h5>
            <FontAwesomeIcon icon={faCar} /> Vehicles
          </h5>
          <ListGroup>
            {builds.bodies.map((body) => (
              <ListGroupItem key={body.name}>{body.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={3} sm={12}>
          <h5>
            <FontAwesomeIcon icon={faHelmetSafety} /> Drivers
          </h5>
          <ListGroup>
            {builds.drivers.map((driver) => (
              <ListGroupItem key={driver.name}>{driver.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={3} sm={12}>
          <h5>
            <FontAwesomeIcon icon={faPaperPlane} /> Gliders
          </h5>
          <ListGroup>
            {builds.gliders.map((glider) => (
              <ListGroupItem key={glider.name}>{glider.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={3} sm={12}>
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
          <StatBars
            maxStats={StatMaxes.get(PartType.Body)}
            stats={effectiveParts.body.stats}
          />
        </Col>
        <Col xs={3}>
          <StatBars
            maxStats={StatMaxes.get(PartType.Driver)}
            stats={effectiveParts.driver.stats}
          />
        </Col>
        <Col xs={3}>
          <StatBars
            maxStats={StatMaxes.get(PartType.Glider)}
            stats={effectiveParts.glider.stats}
          />
        </Col>
        <Col xs={3}>
          <StatBars
            maxStats={StatMaxes.get(PartType.Tire)}
            stats={effectiveParts.tire.stats}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Overall Stats</h4>
          <h6>Best Track Type: {bestTrackType}</h6>
          <h6>
            Stat Points: {totalScore} / 155 ({Math.abs(qualityRating)}%)
          </h6>
          <StatBars stats={buildStats} />
        </Col>
      </Row>
    </Container>
  );
}
