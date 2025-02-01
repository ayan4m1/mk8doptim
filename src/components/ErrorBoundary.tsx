import { Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router';

type MessageError = {
  message: string;
};

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Container>
      <h1>Error</h1>
      {isRouteErrorResponse(error) ? (
        <h1>
          {error.status} {error.statusText}
        </h1>
      ) : (
        <h1>{(error as MessageError).message ?? error?.toString?.()}</h1>
      )}
    </Container>
  );
}
