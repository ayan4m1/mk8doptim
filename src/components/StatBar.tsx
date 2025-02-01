import { ProgressBar } from 'react-bootstrap';

export enum StatBarType {
  Speed,
  Acceleration,
  Weight,
  Handling,
  Traction,
  MiniTurbo,
  Invincibility
}

export default function StatBar({ ...props }) {
  return <ProgressBar {...props} />;
}
