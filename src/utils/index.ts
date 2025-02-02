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

export type Build = {
  body: Part;
  driver: Part;
  glider: Part;
  tire: Part;
};

export enum PartType {
  Body = 'body',
  Driver = 'driver',
  Glider = 'glider',
  Tire = 'tire'
}

export type Part = {
  name: string;
  type?: PartType;
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

export const parsePart = (rawPart: RawPart): Part => ({
  name: rawPart.name,
  stats: new Map<StatType, number>(
    Object.values(StatType).map((stat) => [stat, rawPart[stat]])
  )
});

export const calculateStats = (
  build: Build,
  types: StatType[] = Object.values(StatType)
): Map<StatType, number> =>
  new Map<StatType, number>(
    types.map((type) => [type, calculateStat(build, type)])
  );

export const calculateStat = (build: Build, type: StatType): number =>
  build.glider.stats.get(type) +
  build.driver.stats.get(type) +
  build.body.stats.get(type) +
  build.tire.stats.get(type);
