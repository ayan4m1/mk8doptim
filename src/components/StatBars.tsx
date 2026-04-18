import { Container } from 'react-bootstrap';

import StatBar from './StatBar';
import { StatMapping, StatListing, maxStatTotals } from '../utils';

interface IProps {
  stats: StatMapping;
  maxStats?: StatMapping;
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
              maxValue={(maxStats ?? maxStatTotals).get(stat) ?? 0}
              stat={stat}
              value={stats.get(stat) ?? 0}
            />
          );
        } else {
          return (
            <StatBar
              key={index}
              maxValue={(maxStats ?? maxStatTotals).values().next().value ?? 0}
              stat={list}
              value={list.map((type) => stats.get(type) ?? 0)}
            />
          );
        }
      })}
    </Container>
  );
}
