import { useMemo } from 'react';
import { Container } from 'react-bootstrap';

import BuildStats from './BuildStats';
import { Build, Part, StatType } from '../utils';

interface IProps {
  gliders: Part[];
  drivers: Part[];
  bodies: Part[];
  tires: Part[];
  build: Build;
}

export default function BuildResult({
  gliders,
  drivers,
  bodies,
  tires,
  build
}: IProps) {
  if (!build) {
    return null;
  }

  const parts = useMemo(
    () => ({
      glider: gliders.find((part) => part.name === build.glider.name),
      driver: drivers.find((part) => part.name === build.driver.name),
      body: bodies.find((part) => part.name === build.body.name),
      tire: tires.find((part) => part.name === build.tire.name)
    }),
    [gliders, drivers, bodies, tires, build]
  );

  const effectiveStats = useMemo(
    () =>
      new Map<StatType, number>(
        Object.values(StatType).map((type) => [
          type,
          parts.glider.stats.get(type) +
            parts.driver.stats.get(type) +
            parts.body.stats.get(type) +
            parts.tire.stats.get(type)
        ])
      ),
    [parts]
  );
  const totalStats = useMemo(
    () =>
      Object.values(StatType).reduce(
        (sum, type) =>
          sum +
          (isNaN(effectiveStats.get(type)) ? 0 : effectiveStats.get(type)),
        0
      ),
    [effectiveStats]
  );
  const qualityRating = useMemo(
    () => Math.round((totalStats / 260 - 0.5) * 1e2),
    [totalStats]
  );
  const bestTrackType = useMemo(() => {
    const stats: [number, string][] = [
      [
        [StatType.GroundSpeed, StatType.GroundHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Ground'
      ],
      [
        [StatType.WaterSpeed, StatType.WaterHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Water'
      ],
      [
        [StatType.AirSpeed, StatType.AirHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Air'
      ],
      [
        [StatType.AntiGravitySpeed, StatType.AntiGravityHandling].reduce(
          (sum, type) => sum + effectiveStats.get(type),
          0
        ),
        'Anti-Gravity'
      ]
    ];

    const statValues = [...stats.map(([val]) => val)];
    const [, name] = stats.find(([val]) => val === Math.max(...statValues));

    return name;
  }, [effectiveStats]);

  return (
    <Container className="mt-4">
      <h3>
        {parts.driver.name} on {parts.body.name} with {parts.tire.name} Tires
        and {parts.glider.name}
      </h3>
      <h4>Best Track Type: {bestTrackType}</h4>
      <h4>Stat Points: {totalStats} / 260</h4>
      <h4>
        Quality:{' '}
        <span className={`text-${qualityRating > 0 ? 'success' : 'danger'}`}>
          {Math.abs(qualityRating)}% {qualityRating > 0 ? 'above' : 'below'}{' '}
          average
        </span>
      </h4>
      <BuildStats effectiveStats={effectiveStats} />
    </Container>
  );
}
