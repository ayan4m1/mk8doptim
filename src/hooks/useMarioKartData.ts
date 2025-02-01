import { useEffect, useState } from 'react';

export default function useMarioKartData() {
  const [bodies, setBodies] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [gliders, setGliders] = useState(null);
  const [tires, setTires] = useState(null);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/bodies.csv').then((module) =>
          setBodies(module.default)
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/drivers.csv').then((module) =>
          setDrivers(module.default)
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/gliders.csv').then((module) =>
          setGliders(module.default)
        ),
        //@ts-expect-error csv-loader works but ts doesn't recognize that
        import('../data/tires.csv').then((module) => setTires(module.default))
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
