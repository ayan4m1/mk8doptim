export enum CalculationMode {
  Overall = 'overall',
  Weighted = 'weighted'
}

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

export type StatMapping = Map<StatType, number>;

export type Build = {
  body: Part;
  driver: Part;
  glider: Part;
  tire: Part;
};

export type EquivalentBuilds = {
  bodies: Part[];
  drivers: Part[];
  gliders: Part[];
  tires: Part[];
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
  stats: StatMapping;
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

export const mappingPresets: Map<string, StatMapping> = new Map<
  string,
  StatMapping
>([
  [
    'Balanced',
    new Map<StatType, number>([
      [StatType.Acceleration, 0.4],
      [StatType.GroundSpeed, 0.15],
      [StatType.AntiGravitySpeed, 0.15],
      [StatType.GroundSpeed, 0.3],
      [StatType.Traction, 0.3]
    ])
  ],
  [
    'Speed',
    new Map<StatType, number>([
      [StatType.GroundSpeed, 0.25],
      [StatType.WaterSpeed, 0.25],
      [StatType.AirSpeed, 0.25],
      [StatType.AntiGravitySpeed, 0.25]
    ])
  ],
  [
    'Boost',
    new Map<StatType, number>([
      [StatType.MiniTurbo, 0.6],
      [StatType.GroundHandling, 0.1],
      [StatType.WaterHandling, 0.1],
      [StatType.AirHandling, 0.1],
      [StatType.AntiGravityHandling, 0.1]
    ])
  ],
  [
    'Traction',
    new Map<StatType, number>([
      [StatType.Traction, 0.75],
      [StatType.Acceleration, 0.15],
      [StatType.WaterSpeed, 0.1]
    ])
  ]
]);

export const parsePart = (rawPart: RawPart): Part => ({
  name: rawPart.name,
  stats: new Map<StatType, number>(
    Object.values(StatType).map((stat) => [stat, rawPart[stat]])
  )
});

export const getTotalStatScore = (mapping: StatMapping): number =>
  Array.from(mapping.values()).reduce(
    (sum, val) => sum + (isNaN(val) ? 0 : val),
    0
  );

export const calculateWeightedStats = (
  build: Build,
  weights: StatMapping
): StatMapping =>
  new Map<StatType, number>(
    Object.values(StatType).map((type) => [
      type,
      calculateStat(build, type, weights.get(type) ?? 0)
    ])
  );

export const calculateStats = (build: Build): StatMapping =>
  new Map<StatType, number>(
    Object.values(StatType).map((type) => [type, calculateStat(build, type, 1)])
  );

export const calculateStat = (
  build: Build,
  type: StatType,
  weight: number
): number =>
  (build.glider.stats.get(type) +
    build.driver.stats.get(type) +
    build.body.stats.get(type) +
    build.tire.stats.get(type)) *
  weight;

export const getRemainingPercent = (weights?: StatMapping): number => {
  if (!weights) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        100 -
          Array.from(weights.values()).reduce(
            (sum, weight) => sum + weight,
            0
          ) *
            1e2
      )
    )
  );
};
