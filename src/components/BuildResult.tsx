import { useMemo } from 'react';
import { Build, Part, StatType } from '../hooks/useMarioKartData';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import TrackTypeBar from './TrackTypeBar';

interface IProps {
  gliders: Part[];
  drivers: Part[];
  bodies: Part[];
  tires: Part[];
  build: Build;
}

export default function BuildResult({
  gliders,
  drivers,
  bodies,
  tires,
  build
}: IProps) {
  if (!build) {
    return null;
  }

  const parts = useMemo(
    () => ({
      glider: gliders.find((part) => part.name === build.glider),
      driver: drivers.find((part) => part.name === build.driver),
      body: bodies.find((part) => part.name === build.body),
      tire: tires.find((part) => part.name === build.tire)
    }),
    [gliders, drivers, bodies, tires, build]
  );

  const effectiveStats = useMemo(
    () =>
      new Map<StatType, number>(
        Object.values(StatType).map((type) => [
          type,
          parts.glider.stats.get(type) +
            parts.driver.stats.get(type) +
            parts.body.stats.get(type) +
            parts.tire.stats.get(type)
        ])
      ),
    [parts]
  );
  const totalStats = useMemo(
    () =>
      Object.values(StatType).reduce(
        (sum, type) =>
          sum +
          (isNaN(effectiveStats.get(type)) ? 0 : effectiveStats.get(type)),
        0
      ),
    [effectiveStats]
  );
  const qualityRating = useMemo(
    () => Math.round((totalStats / 260 - 0.5) * 1e2),
    [totalStats]
  );
  const bestTrackType = useMemo(() => {
    const stats: [number, string][] = [
      [
        [StatType.GroundSpeed, StatType.GroundHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Ground'
      ],
      [
        [StatType.WaterSpeed, StatType.WaterHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Water'
      ],
      [
        [StatType.AirSpeed, StatType.AirHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Air'
      ],
      [
        [StatType.AntiGravitySpeed, StatType.AntiGravityHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Anti-Gravity'
      ]
    ];

    const statValues = [...stats.map(([val]) => val)];
    const [, name] = stats.find(([val]) => val === Math.max(...statValues));

    return name;
  }, [effectiveStats]);

  return (
    <Container className="mt-4">
      <h2>Results</h2>
      <h3>Best Track Type: {bestTrackType}</h3>
      <h3>Stat Points: {totalStats} / 260</h3>
      <h3>
        Quality:{' '}
        <span className={`text-${qualityRating > 0 ? 'success' : 'danger'}`}>
          {Math.abs(qualityRating)}% {qualityRating > 0 ? 'above' : 'below'}{' '}
          average
        </span>
      </h3>
      <Row>
        <Col xs={4} className="text-end">
          Speed
        </Col>
        <Col xs={8}>
          <TrackTypeBar
            ground={effectiveStats.get(StatType.GroundSpeed)}
            water={effectiveStats.get(StatType.WaterSpeed)}
            air={effectiveStats.get(StatType.AirSpeed)}
            antiGravity={effectiveStats.get(StatType.AntiGravitySpeed)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Acceleration
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={effectiveStats.get(StatType.Acceleration)}
            now={effectiveStats.get(StatType.Acceleration)}
            variant="success"
            max={23}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Weight
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={effectiveStats.get(StatType.Weight)}
            now={effectiveStats.get(StatType.Weight)}
            variant="danger"
            max={23}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Handling
        </Col>
        <Col xs={8}>
          <TrackTypeBar
            ground={effectiveStats.get(StatType.GroundHandling)}
            water={effectiveStats.get(StatType.WaterHandling)}
            air={effectiveStats.get(StatType.AirHandling)}
            antiGravity={effectiveStats.get(StatType.AntiGravityHandling)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Traction
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={effectiveStats.get(StatType.Traction)}
            now={effectiveStats.get(StatType.Traction)}
            variant="warning"
            max={23}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Mini-Turbo
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={effectiveStats.get(StatType.MiniTurbo)}
            now={effectiveStats.get(StatType.MiniTurbo)}
            variant="danger"
            max={23}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Invincibility
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={effectiveStats.get(StatType.Invincibility)}
            now={effectiveStats.get(StatType.Invincibility)}
            variant="info"
            max={23}
          />
        </Col>
      </Row>
    </Container>
  );
}
