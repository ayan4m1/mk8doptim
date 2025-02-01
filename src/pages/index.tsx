import { Helmet } from 'react-helmet';
import { Fragment, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';

import CustomErrorBoundary from '../components/ErrorBoundary';
import useMarioKartData, { StatType } from '../hooks/useMarioKartData';
import BuildResult from '../components/BuildResult';
import BuildForm from '../components/BuildForm';
import OptimizeForm from '../components/OptimizeForm';

export const ErrorBoundary = CustomErrorBoundary;

export default function IndexPage() {
  const [parts, setParts] = useState<string[]>([]);
  const [optimizeStats, setOptimizeStats] = useState<StatType[]>();
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();

  console.dir(optimizeStats);

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
        onSubmit={({ glider, driver, body, tire }) =>
          setParts([glider, driver, body, tire])
        }
      />
      <OptimizeForm onSubmit={setOptimizeStats} />
      <BuildResult
        gliders={gliders}
        drivers={drivers}
        bodies={bodies}
        tires={tires}
        glider={parts[0]}
        driver={parts[1]}
        body={parts[2]}
        tire={parts[3]}
      />
    </Fragment>
  );
}
