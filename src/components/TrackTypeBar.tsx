import { ProgressBar } from 'react-bootstrap';

interface IProps {
  ground: number;
  water: number;
  air: number;
  antiGravity: number;
}

export default function TrackTypeBar({
  ground,
  water,
  air,
  antiGravity
}: IProps) {
  return (
    <ProgressBar max={80} className="my-2">
      <ProgressBar variant="success" now={ground} label={ground} />
      <ProgressBar variant="info" now={water} label={water} />
      <ProgressBar variant="light" now={air} label={air} />
      <ProgressBar variant="warning" now={antiGravity} label={antiGravity} />
    </ProgressBar>
  );
}
