import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountAsc } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon fixedWidth icon={faSortAmountAsc} size="lg" />{' '}
            Mario Kart 8 Deluxe Optimizer
          </Nav.Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
