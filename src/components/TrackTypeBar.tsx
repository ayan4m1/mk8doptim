import { ProgressBar } from 'react-bootstrap';

import { StatType, StatTypeColors } from '../utils';

interface IProps {
  stats: StatType[];
  values: number[];
  max: number;
}

const scalingFactor = 5 / 4;

export default function TrackTypeBar({ stats, values, max }: IProps) {
  return (
    <ProgressBar>
      {values?.length &&
        values.map((value, index) => (
          <ProgressBar
            key={index}
            now={value * scalingFactor}
            label={value}
            max={max * scalingFactor}
            style={{ backgroundColor: StatTypeColors[stats[index]] }}
          />
        ))}
    </ProgressBar>
  );
}
