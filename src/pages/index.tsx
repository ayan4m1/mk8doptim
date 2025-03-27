import uniq from 'lodash.uniq';
import { Helmet } from 'react-helmet';
import { Fragment, useCallback, useState } from 'react';

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
import LoadingSpinner from '../components/LoadingSpinner';

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
              } else {
                totalScore = getTotalStatScore(
                  calculateWeightedStats(build, weights)
                );
              }

              if (totalScore > topScore) {
                equivalentBuilds = [build];
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
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <Helmet title="Build Optimizer" />
      <OptimizeForm onSubmit={handleOptimize} />
      {Boolean(builds) && <BuildResult builds={builds} />}
    </Fragment>
  );
}
