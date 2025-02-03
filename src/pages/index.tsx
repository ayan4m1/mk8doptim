import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { Fragment, useCallback, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Build, Part, StatSearch } from '../utils';
import BuildResult from '../components/BuildResult';
import OptimizeForm from '../components/OptimizeForm';
import useMarioKartData from '../hooks/useMarioKartData';

const createSortHandler = (weights: StatSearch) => (a: Part, b: Part) => {
  let result = 0;

  for (const [stat, weight] of weights.entries()) {
    result += (b.stats.get(stat) - a.stats.get(stat)) * weight;
  }

  return result;
};

export default function IndexPage() {
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();
  const [builds, setBuilds] = useState<Build[]>(null);

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

      const results: Build[] = [];

      for (let i = 0; i < 5; i++) {
        results.push({
          body: sortedBodies.shift(),
          driver: sortedDrivers.shift(),
          glider: sortedGliders.shift(),
          tire: sortedTires.shift()
        });
      }

      setBuilds(results);
    },
    [bodies, drivers, gliders, tires, setBuilds]
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
      {/* <BuildForm
        gliders={gliders}
        drivers={drivers}
        bodies={bodies}
        tires={tires}
        onSubmit={({ body, driver, glider, tire }) =>
          setBuilds([
            {
              body: bodies.find((item) => item.name === body),
              driver: drivers.find((item) => item.name === driver),
              glider: gliders.find((item) => item.name === glider),
              tire: tires.find((item) => item.name === tire)
            }
          ])
        }
      /> */}
      {builds?.length
        ? builds.map((build) => (
            <BuildResult
              gliders={gliders}
              drivers={drivers}
              bodies={bodies}
              tires={tires}
              build={build}
            />
          ))
        : null}
    </Fragment>
  );
}
