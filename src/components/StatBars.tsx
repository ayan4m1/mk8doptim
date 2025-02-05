import { Fragment } from 'react';
import { Col, Row, ProgressBar } from 'react-bootstrap';

import TrackTypeBar from './TrackTypeBar';
import { StatType, StatMapping } from '../utils';

interface IProps {
  stats: StatMapping;
}

export default function StatBars({ stats }: IProps) {
  return (
    <Fragment>
      <Row className="mb-2">
        <Col xs={4} className="text-end">
          Speed
        </Col>
        <Col xs={8}>
          <TrackTypeBar
            ground={stats.get(StatType.GroundSpeed)}
            water={stats.get(StatType.WaterSpeed)}
            air={stats.get(StatType.AirSpeed)}
            antiGravity={stats.get(StatType.AntiGravitySpeed)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Acceleration
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={stats.get(StatType.Acceleration)}
            now={stats.get(StatType.Acceleration)}
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
            label={stats.get(StatType.Weight)}
            now={stats.get(StatType.Weight)}
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
            ground={stats.get(StatType.GroundHandling)}
            water={stats.get(StatType.WaterHandling)}
            air={stats.get(StatType.AirHandling)}
            antiGravity={stats.get(StatType.AntiGravityHandling)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-end">
          Traction
        </Col>
        <Col xs={8}>
          <ProgressBar
            label={stats.get(StatType.Traction)}
            now={stats.get(StatType.Traction)}
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
            label={stats.get(StatType.MiniTurbo)}
            now={stats.get(StatType.MiniTurbo)}
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
            label={stats.get(StatType.Invincibility)}
            now={stats.get(StatType.Invincibility)}
            variant="info"
            max={23}
          />
        </Col>
      </Row>
    </Fragment>
  );
}
