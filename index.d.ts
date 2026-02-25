declare module '*.csv' {
  const value: {
    name: string;
    groundSpeed: number;
    groundHandling: number;
    waterSpeed: number;
    waterHandling: number;
    airSpeed: number;
    airHandling: number;
    antiGravitySpeed: number;
    antiGravityHandling: number;
    acceleration: number;
    weight: number;
    traction: number;
    miniTurbo: number;
    invincibility: number;
  }[];

  export default value;
}
