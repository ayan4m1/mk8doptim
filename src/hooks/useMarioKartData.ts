import { useEffect, useState } from 'react';

import { parsePart, Part } from '../utils';

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
