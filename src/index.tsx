import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './index.scss';
import Layout from './components/Layout';
import SuspenseFallback from './components/SuspenseFallback';
import ErrorBoundary from './components/ErrorBoundary';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/index')).default
        })
      }
    ]
  }
]);
const root = createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<SuspenseFallback />}>
    <RouterProvider router={router} />
  </Suspense>
);
