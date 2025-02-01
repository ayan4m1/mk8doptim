import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';
import Layout from './components/Layout';
import SuspenseFallback from './components/SuspenseFallback';

const root = createRoot(document.getElementById('root'));

const IndexPage = lazy(() => import('./pages/index'));

root.render(
  <BrowserRouter>
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
