import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { Fragment, useCallback, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BuildForm from '../components/BuildForm';
import BuildResult from '../components/BuildResult';
import OptimizeForm from '../components/OptimizeForm';
import useMarioKartData from '../hooks/useMarioKartData';
import CustomErrorBoundary from '../components/ErrorBoundary';
import { Build, StatType } from '../utils';

export const ErrorBoundary = CustomErrorBoundary;

export default function IndexPage() {
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();
  const [build, setBuild] = useState<Build>(null);

  const handleOptimize = useCallback(
    (stats: StatType[]) => {
      const sortedBodies = [...bodies];

      for (const stat of stats) {
        sortedBodies.sort((a, b) => b.stats.get(stat) - a.stats.get(stat));
      }

      const body = sortedBodies.shift();
      const sortedDrivers = [...drivers];

      for (const stat of stats) {
        sortedDrivers.sort((a, b) => b.stats.get(stat) - a.stats.get(stat));
      }

      const driver = sortedDrivers.shift();
      const sortedGliders = [...gliders];

      for (const stat of stats) {
        sortedGliders.sort((a, b) => b.stats.get(stat) - a.stats.get(stat));
      }

      const glider = sortedGliders.shift();
      const sortedTires = [...tires];

      for (const stat of stats) {
        sortedTires.sort((a, b) => b.stats.get(stat) - a.stats.get(stat));
      }

      const tire = sortedTires.shift();

      setBuild({
        body,
        driver,
        glider,
        tire
      });
    },
    [bodies, drivers, gliders, tires]
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
