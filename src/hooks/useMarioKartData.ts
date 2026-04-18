import { useEffect, useState } from 'react';

import { parsePart, Part } from '../utils';

export default function useMarioKartData() {
  const [bodies, setBodies] = useState<Part[]>();
  const [drivers, setDrivers] = useState<Part[]>();
  const [gliders, setGliders] = useState<Part[]>();
  const [tires, setTires] = useState<Part[]>();

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        import('../data/bodies.csv').then((module) =>
          setBodies(module.default.map(parsePart))
        ),
        import('../data/drivers.csv').then((module) =>
          setDrivers(module.default.map(parsePart))
        ),
        import('../data/gliders.csv').then((module) =>
          setGliders(module.default.map(parsePart))
        ),
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
