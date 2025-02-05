import uniq from 'lodash.uniq';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { Fragment, useCallback, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BuildResult from '../components/BuildResult';
import OptimizeForm from '../components/OptimizeForm';
import useMarioKartData from '../hooks/useMarioKartData';
import {
  Build,
  calculateStats,
  calculateWeightedStats,
  getTotalStatScore,
  EquivalentBuilds,
  StatMapping
} from '../utils';

export default function IndexPage() {
  const { loading, bodies, drivers, gliders, tires } = useMarioKartData();
  const [builds, setBuilds] = useState<EquivalentBuilds>(null);

  const handleOptimize = useCallback(
    (mode: string, weights?: StatMapping) => {
      let topScore = 0,
        equivalentBuilds: Build[] = [];

      for (const body of bodies) {
        for (const driver of drivers) {
          for (const glider of gliders) {
            for (const tire of tires) {
              const build = {
                body,
                driver,
                glider,
                tire
              };

              let totalScore = 0;

              if (mode === 'overall') {
                totalScore = getTotalStatScore(calculateStats(build));
              } else if (mode === 'weighted') {
                totalScore = getTotalStatScore(
                  calculateWeightedStats(build, weights)
                );
              }

              if (totalScore > topScore) {
                equivalentBuilds = [];
                equivalentBuilds.push(build);
                topScore = totalScore;
              } else if (totalScore === topScore) {
                equivalentBuilds.push(build);
              }
            }
          }
        }
      }

      setBuilds({
        bodies: uniq(equivalentBuilds.map((build) => build.body)),
        drivers: uniq(equivalentBuilds.map((build) => build.driver)),
        gliders: uniq(equivalentBuilds.map((build) => build.glider)),
        tires: uniq(equivalentBuilds.map((build) => build.tire))
      });
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
      <BuildResult builds={builds} />
    </Fragment>
  );
}
