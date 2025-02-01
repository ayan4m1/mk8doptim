import { useEffect, useState } from 'react';

export enum StatType {
  GroundSpeed = 'groundSpeed',
  GroundHandling = 'groundHandling',
  WaterSpeed = 'waterSpeed',
  WaterHandling = 'waterHandling',
  AirSpeed = 'airSpeed',
  AirHandling = 'airHandling',
  AntiGravitySpeed = 'antiGravitySpeed',
  AntiGravityHandling = 'antiGravityHandling',
  Acceleration = 'acceleration',
  Weight = 'weight',
  Traction = 'traction',
  MiniTurbo = 'miniTurbo',
  Invincibility = 'invincibility'
}

export type Part = {
  name: string;
  stats: Map<StatType, number>;
};

type RawPart = {
  name: string;
  [StatType.GroundSpeed]: number;
  [StatType.GroundHandling]: number;
  [StatType.WaterSpeed]: number;
  [StatType.WaterHandling]: number;
  [StatType.AirSpeed]: number;
  [StatType.AirHandling]: number;
  [StatType.AntiGravitySpeed]: number;
  [StatType.AntiGravityHandling]: number;
  [StatType.Acceleration]: number;
  [StatType.Weight]: number;
  [StatType.Traction]: number;
  [StatType.MiniTurbo]: number;
  [StatType.Invincibility]: number;
};

const parsePart = (rawPart: RawPart): Part => ({
  name: rawPart.name,
  stats: new Map<StatType, number>(
    Object.values(StatType).map((stat) => [stat, rawPart[stat]])
  )
});

export default function useMarioKartData() {
  const [bodies, setBodies] = useState<Part[]>(null);
  const [drivers, setDrivers] = useState<Part[]>(null);
  const [gliders, setGliders] = useState<Part[]>(null);
  const [tires, setTires] = useState<Part[]>(null);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/bodies.csv').then((module) =>
          setBodies(module.default.map(parsePart))
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/drivers.csv').then((module) =>
          setDrivers(module.default.map(parsePart))
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/gliders.csv').then((module) =>
          setGliders(module.default.map(parsePart))
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/tires.csv').then((module) =>
          setTires(module.default.map(parsePart))
        )
      ]);
    }

    fetchData();
  }, []);

  return {
    bodies,
    drivers,
    gliders,
    tires,
    loading: !bodies || !drivers || !gliders || !tires
  };
}
