import { Fragment } from 'react';
import { Col, Row, ProgressBar } from 'react-bootstrap';

import TrackTypeBar from './TrackTypeBar';
import { StatType } from '../utils';

export default function BuildStats({ effectiveStats }) {
  return (
    <Fragment>
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
    </Fragment>
  );
}
