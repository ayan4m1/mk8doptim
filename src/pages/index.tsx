import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { Fragment, useCallback, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BuildForm from '../components/BuildForm';
import { Build, Part, StatSearch } from '../utils';
import BuildResult from '../components/BuildResult';
import OptimizeForm from '../components/OptimizeForm';
import useMarioKartData from '../hooks/useMarioKartData';
import CustomErrorBoundary from '../components/ErrorBoundary';

export const ErrorBoundary = CustomErrorBoundary;

const createSortHandler = (weights: StatSearch) => (a: Part, b: Part) => {
  let result = 0;

  for (const stat of weights.keys()) {
    result += b.stats.get(stat) - a.stats.get(stat);
  }

  // const otherStats = Object.values(StatType).filter(
  //   (val) => !stats.includes(val)
  // );

  // for (const stat of otherStats) {
  //   result += a.stats.get(stat) - b.stats.get(stat);
  // }

  return result;
};

export default function IndexPage() {
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();
  const [build, setBuild] = useState<Build>(null);

  const handleOptimize = useCallback(
    (weights: StatSearch) => {
      const sortedBodies = [...bodies];
      const sortedDrivers = [...drivers];
      const sortedGliders = [...gliders];
      const sortedTires = [...tires];
      const sortHandler = createSortHandler(weights);

      sortedBodies.sort(sortHandler);
      sortedDrivers.sort(sortHandler);
      sortedGliders.sort(sortHandler);
      sortedTires.sort(sortHandler);

      console.dir(sortedBodies.slice(0, 5));
      console.dir(sortedDrivers.slice(0, 5));
      console.dir(sortedGliders.slice(0, 5));
      console.dir(sortedTires.slice(0, 5));

      const body = sortedBodies.shift();
      const driver = sortedDrivers.shift();
      const glider = sortedGliders.shift();
      const tire = sortedTires.shift();
      const newBuild = {
        body,
        driver,
        glider,
        tire
      };

      setBuild(newBuild);
    },
    [bodies, drivers, gliders, tires, setBuild]
  );

  if (loading) {
    return (
      <Fragment>
        <Helmet title="Mario Kart 8 Optimizer" />
        <Container fluid>
          <Row>
            <Col xs={12}>
              <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Helmet title="Mario Kart 8 Optimizer" />
      <OptimizeForm onSubmit={handleOptimize} />
      <BuildForm
        gliders={gliders}
        drivers={drivers}
        bodies={bodies}
        tires={tires}
        build={build}
        onSubmit={({ body, driver, glider, tire }) =>
          setBuild({
            body: bodies.find((item) => item.name === body),
            driver: drivers.find((item) => item.name === driver),
            glider: gliders.find((item) => item.name === glider),
            tire: tires.find((item) => item.name === tire)
          })
        }
      />
      <BuildResult
        gliders={gliders}
        drivers={drivers}
        bodies={bodies}
        tires={tires}
        build={build}
      />
    </Fragment>
  );
}
