import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Header';

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <Container fluid="sm" style={{ minWidth: '100%', maxWidth: 'unset' }}>
        <Outlet />
      </Container>
    </Fragment>
  );
}
