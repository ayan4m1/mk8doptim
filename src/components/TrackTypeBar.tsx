import { ProgressBar } from 'react-bootstrap';

export default function TrackTypeBar({ ground, water, air, antiGravity }) {
  return (
    <div>
      <ProgressBar variant="success" now={ground} max={6} label={ground} />
      <ProgressBar variant="info" now={water} max={6} label={water} />
      <ProgressBar variant="light" now={air} max={6} label={air} />
      <ProgressBar
        variant="warning"
        now={antiGravity}
        max={6}
        label={antiGravity}
      />
    </div>
  );
}
