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

export const StatTypeAbbreviations = {
  [StatType.GroundSpeed]: 'G.Sp',
  [StatType.GroundHandling]: 'G.Hd',
  [StatType.WaterSpeed]: 'W.Sp',
  [StatType.WaterHandling]: 'W.Hd',
  [StatType.AirSpeed]: 'A.Sp',
  [StatType.AirHandling]: 'A.Hd',
  [StatType.AntiGravitySpeed]: 'AG.Sp',
  [StatType.AntiGravityHandling]: 'AG.Hd',
  [StatType.Acceleration]: 'Acc',
  [StatType.Weight]: 'Wt',
  [StatType.Traction]: 'Tr',
  [StatType.MiniTurbo]: 'MT',
  [StatType.Invincibility]: 'Inv'
};

export const StatTypeColors = {
  [StatType.GroundSpeed]: '#374f2f',
  [StatType.GroundHandling]: '#2c3f26',
  [StatType.WaterSpeed]: '#01386a',
  [StatType.WaterHandling]: '#012d55',
  [StatType.AirSpeed]: '#87ceeb',
  [StatType.AirHandling]: '#48b4e0',
  [StatType.AntiGravitySpeed]: '#ff00ff',
  [StatType.AntiGravityHandling]: '#cc00cc',
  [StatType.Acceleration]: '#ff2400',
  [StatType.Weight]: '#35281e',
  [StatType.Traction]: '#576778',
  [StatType.MiniTurbo]: '#23dc00',
  [StatType.Invincibility]: '#52007a'
};

export type StatSearch = Map<StatType, number>;

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

export const getRemainingPercent = (weights?: StatSearch): number => {
  if (!weights) {
    return 100;
  }

  return (
    100 -
    Array.from(weights.values()).reduce((sum, weight) => sum + weight, 0) * 1e2
  );
};
