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
  [StatType.Acceleration]: '#39dc14',
  [StatType.Weight]: '#7289da',
  [StatType.Traction]: '#a8033f',
  [StatType.MiniTurbo]: '#ce3a00',
  [StatType.Invincibility]: '#52007a'
};

export const StatTypeLabels = {
  [StatType.GroundSpeed]: 'Speed',
  [StatType.GroundHandling]: 'Handling',
  [StatType.Acceleration]: 'Accel',
  [StatType.Weight]: 'Weight',
  [StatType.Traction]: 'Tract',
  [StatType.MiniTurbo]: 'Turbo',
  [StatType.Invincibility]: 'Invuln'
};

export const StatListing: StatType[][] = [
  [
    StatType.GroundSpeed,
    StatType.WaterSpeed,
    StatType.AirSpeed,
    StatType.AntiGravitySpeed
  ],
  [StatType.Acceleration],
  [StatType.Weight],
  [
    StatType.GroundHandling,
    StatType.WaterHandling,
    StatType.AirHandling,
    StatType.AntiGravityHandling
  ],
  [StatType.Traction],
  [StatType.MiniTurbo],
  [StatType.Invincibility]
];

export const StatMaxes = new Map<PartType, StatMapping>([
  [
    PartType.Body,
    new Map<StatType, number>([
      [StatType.GroundSpeed, 5],
      [StatType.WaterSpeed, 5],
      [StatType.AirSpeed, 4],
      [StatType.AntiGravitySpeed, 5],
      [StatType.GroundHandling, 5],
      [StatType.WaterHandling, 5],
      [StatType.AirHandling, 4],
      [StatType.AntiGravityHandling, 5],
      [StatType.Acceleration, 7],
      [StatType.Weight, 4],
      [StatType.Traction, 7],
      [StatType.MiniTurbo, 7],
      [StatType.Invincibility, 7]
    ])
  ],
  [
    PartType.Driver,
    new Map<StatType, number>([
      [StatType.GroundSpeed, 10],
      [StatType.WaterSpeed, 10],
      [StatType.AirSpeed, 10],
      [StatType.AntiGravitySpeed, 10],
      [StatType.GroundHandling, 10],
      [StatType.WaterHandling, 10],
      [StatType.AirHandling, 10],
      [StatType.AntiGravityHandling, 10],
      [StatType.Acceleration, 5],
      [StatType.Weight, 10],
      [StatType.Traction, 5],
      [StatType.MiniTurbo, 5],
      [StatType.Invincibility, 6]
    ])
  ],
  [
    PartType.Glider,
    new Map<StatType, number>([
      [StatType.GroundSpeed, 1],
      [StatType.WaterSpeed, 1],
      [StatType.AirSpeed, 3],
      [StatType.AntiGravitySpeed, 1],
      [StatType.GroundHandling, 1],
      [StatType.WaterHandling, 1],
      [StatType.AirHandling, 2],
      [StatType.AntiGravityHandling, 1],
      [StatType.Acceleration, 2],
      [StatType.Weight, 1],
      [StatType.Traction, 1],
      [StatType.MiniTurbo, 2],
      [StatType.Invincibility, 1]
    ])
  ],
  [
    PartType.Tire,
    new Map<StatType, number>([
      [StatType.GroundSpeed, 4],
      [StatType.WaterSpeed, 4],
      [StatType.AirSpeed, 4],
      [StatType.AntiGravitySpeed, 4],
      [StatType.GroundHandling, 4],
      [StatType.WaterHandling, 4],
      [StatType.AirHandling, 4],
      [StatType.AntiGravityHandling, 4],
      [StatType.Acceleration, 6],
      [StatType.Weight, 4],
      [StatType.Traction, 7],
      [StatType.MiniTurbo, 6],
      [StatType.Invincibility, 6]
    ])
  ]
]);

export const MappingPresets: Map<string, StatMapping> = new Map<
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
