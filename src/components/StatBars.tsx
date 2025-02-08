import { Container } from 'react-bootstrap';

import StatBar from './StatBar';
import { StatMapping, getTotalStatScore, StatListing } from '../utils';

interface IProps {
  stats: StatMapping;
  maxStats: StatMapping;
}

export default function StatBars({ stats, maxStats }: IProps) {
  return (
    <Container fluid>
      {StatListing.map((list, index) => {
        if (list.length === 1) {
          const [stat] = list;

          return (
            <StatBar
              key={index}
              stat={stat}
              maxValue={maxStats.get(stat)}
              value={stats.get(stat)}
            />
          );
        } else {
          return (
            <StatBar
              key={index}
              stat={list}
              maxValue={Array.from(Object.values(maxStats))[0]}
              value={list.map((type) => stats.get(type))}
            />
          );
        }
      })}
    </Container>
  );
}
