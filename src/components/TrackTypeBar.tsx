import { ProgressBar } from 'react-bootstrap';

interface IProps {
  ground: number;
  water: number;
  air: number;
  antiGravity: number;
  max: number;
}

const scalingFactor = 5 / 4;

export default function TrackTypeBar({
  ground,
  water,
  air,
  antiGravity,
  max
}: IProps) {
  return (
    <ProgressBar>
      <ProgressBar
        variant="success"
        now={ground * scalingFactor}
        label={ground}
        max={max * scalingFactor}
      />
      <ProgressBar
        variant="info"
        now={water * scalingFactor}
        label={water}
        max={max * scalingFactor}
      />
      <ProgressBar
        variant="light"
        now={air * scalingFactor}
        label={air}
        max={max * scalingFactor}
      />
      <ProgressBar
        variant="warning"
        now={antiGravity * scalingFactor}
        label={antiGravity}
        max={max * scalingFactor}
      />
    </ProgressBar>
  );
}
