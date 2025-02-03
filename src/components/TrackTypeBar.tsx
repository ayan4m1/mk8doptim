import { ProgressBar } from 'react-bootstrap';

interface IProps {
  ground: number;
  water: number;
  air: number;
  antiGravity: number;
}

const scalingFactor = 5 / 4;

export default function TrackTypeBar({
  ground,
  water,
  air,
  antiGravity
}: IProps) {
  return (
    <ProgressBar className="my-2">
      <ProgressBar
        variant="success"
        now={ground * scalingFactor}
        label={ground}
      />
      <ProgressBar variant="info" now={water * scalingFactor} label={water} />
      <ProgressBar variant="light" now={air * scalingFactor} label={air} />
      <ProgressBar
        variant="warning"
        now={antiGravity * scalingFactor}
        label={antiGravity}
      />
    </ProgressBar>
  );
}
