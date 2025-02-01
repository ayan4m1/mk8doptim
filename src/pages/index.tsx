import { Helmet } from 'react-helmet';
import { Fragment, useCallback, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';

import BuildForm from '../components/BuildForm';
import BuildResult from '../components/BuildResult';
import OptimizeForm from '../components/OptimizeForm';
import CustomErrorBoundary from '../components/ErrorBoundary';
import useMarioKartData, { Build, StatType } from '../hooks/useMarioKartData';

export const ErrorBoundary = CustomErrorBoundary;

export default function IndexPage() {
  const [build, setBuild] = useState<Build>(null);
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();
  const handleOptimize = useCallback((stats: StatType[]) => {
    console.dir(stats);
  }, []);

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
      <BuildForm
        gliders={gliders}
        drivers={drivers}
        bodies={bodies}
        tires={tires}
        onSubmit={setBuild}
      />
      <OptimizeForm onSubmit={handleOptimize} />
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
