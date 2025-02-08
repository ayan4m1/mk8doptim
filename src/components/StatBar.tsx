import { Col, ProgressBar, Row } from 'react-bootstrap';

import { StatType, StatTypeColors, StatTypeLabels } from '../utils';
import TrackTypeBar from './TrackTypeBar';

interface IProps {
  stat: StatType | StatType[];
  value: number | number[];
  maxValue: number;
}

export default function StatBar({ stat, maxValue, value }: IProps) {
  if (Array.isArray(stat) && !Array.isArray(value)) {
    return null;
  }

  return Array.isArray(stat) ? (
    <Row className="d-flex align-items-baseline g-0">
      <Col xs={3} className="text-end pe-2">
        {StatTypeLabels[stat[0]].replace(/([^^])([A-Z])/g, '$1 $2')}
      </Col>
      <Col xs={9}>
        <TrackTypeBar
          max={maxValue}
          stats={stat as StatType[]}
          values={value as number[]}
        />
      </Col>
    </Row>
  ) : (
    <Row className="d-flex align-items-baseline g-0">
      <Col xs={3} className="text-end pe-2">
        {StatTypeLabels[stat].replace(/([^^])([A-Z])/g, '$1 $2')}
      </Col>
      <Col xs={9}>
        <ProgressBar>
          <ProgressBar
            max={maxValue}
            label={value}
            now={value as number}
            style={{ backgroundColor: StatTypeColors[stat] }}
          />
        </ProgressBar>
      </Col>
    </Row>
  );
}
