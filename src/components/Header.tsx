import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon fixedWidth icon={faMagic} size="lg" /> mk8doptim
          </Nav.Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
