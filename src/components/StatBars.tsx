import { Col, Row, ProgressBar, Container } from 'react-bootstrap';

import TrackTypeBar from './TrackTypeBar';
import { StatType, StatMapping, getTotalStatScore } from '../utils';

interface IProps {
  stats: StatMapping;
  maxStats: StatMapping;
}

export default function StatBars({ stats, maxStats }: IProps) {
  return (
    <Container fluid>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Speed
        </Col>
        <Col xs={9}>
          <TrackTypeBar
            max={getTotalStatScore(
              new Map<StatType, number>(
                Array.from(maxStats.entries()).filter(([type]) =>
                  [
                    StatType.GroundSpeed,
                    StatType.WaterSpeed,
                    StatType.AirSpeed,
                    StatType.AntiGravitySpeed
                  ].includes(type)
                )
              )
            )}
            ground={stats.get(StatType.GroundSpeed)}
            water={stats.get(StatType.WaterSpeed)}
            air={stats.get(StatType.AirSpeed)}
            antiGravity={stats.get(StatType.AntiGravitySpeed)}
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Accel
        </Col>
        <Col xs={9}>
          <ProgressBar
            max={maxStats.get(StatType.Acceleration) ?? 10}
            label={stats.get(StatType.Acceleration)}
            now={stats.get(StatType.Acceleration)}
            variant="success"
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Weight
        </Col>
        <Col xs={9}>
          <ProgressBar
            label={stats.get(StatType.Weight)}
            now={stats.get(StatType.Weight)}
            variant="danger"
            max={maxStats.get(StatType.Weight) ?? 10}
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Handling
        </Col>
        <Col xs={9}>
          <TrackTypeBar
            max={getTotalStatScore(
              new Map<StatType, number>(
                Array.from(maxStats.entries()).filter(([type]) =>
                  [
                    StatType.GroundHandling,
                    StatType.WaterHandling,
                    StatType.AirHandling,
                    StatType.AntiGravityHandling
                  ].includes(type)
                )
              )
            )}
            ground={stats.get(StatType.GroundHandling)}
            water={stats.get(StatType.WaterHandling)}
            air={stats.get(StatType.AirHandling)}
            antiGravity={stats.get(StatType.AntiGravityHandling)}
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Traction
        </Col>
        <Col xs={9}>
          <ProgressBar
            label={stats.get(StatType.Traction)}
            now={stats.get(StatType.Traction)}
            variant="warning"
            max={maxStats.get(StatType.Traction) ?? 10}
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Turbo
        </Col>
        <Col xs={9}>
          <ProgressBar
            label={stats.get(StatType.MiniTurbo)}
            now={stats.get(StatType.MiniTurbo)}
            variant="danger"
            max={maxStats.get(StatType.MiniTurbo) ?? 10}
          />
        </Col>
      </Row>
      <Row className="d-flex align-items-baseline g-0">
        <Col xs={3} className="text-end pe-2">
          Invuln
        </Col>
        <Col xs={9}>
          <ProgressBar
            label={stats.get(StatType.Invincibility)}
            now={stats.get(StatType.Invincibility)}
            variant="info"
            max={maxStats.get(StatType.Invincibility) ?? 10}
          />
        </Col>
      </Row>
    </Container>
  );
}
