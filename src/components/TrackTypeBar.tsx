import { ProgressBar } from 'react-bootstrap';

import { StatType, StatTypeColors } from '../utils';

interface IProps {
  stats: StatType[];
  values: number[];
  max: number;
}

export default function TrackTypeBar({ stats, values, max }: IProps) {
  return (
    <ProgressBar>
      {values?.length &&
        values.map((value, index) => (
          <ProgressBar
            key={index}
            label={value}
            now={value}
            max={max * 4}
            style={{ backgroundColor: StatTypeColors[stats[index]] }}
          />
        ))}
    </ProgressBar>
  );
}
