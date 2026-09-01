import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page } from './components/site/Page';

// Admin is lazy: it pulls in the Supabase client, which is dead weight on the
// marketing page and was the bulk of the "unused JavaScript" Lighthouse flagged.
const Login = lazy(() => import('./admin/pages/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('./admin/pages/Dashboard').then((m) => ({ default: m.Dashboard })));

// Routes only, with no router attached — the client wraps these in BrowserRouter
// and the prerender step wraps the same tree in StaticRouter, so both render
// identical markup and hydration matches.
export const AppRoutes = () => (
  <Routes>
    {/* Main Website */}
    <Route path="/" element={<Page />} />

    {/* Admin Routes — Suspense placeholder matches the admin page background
        so there is no white flash while the chunk loads. */}
    <Route
      path="/admin"
      element={
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
          <Login />
        </Suspense>
      }
    />
    <Route
      path="/admin/dashboard"
      element={
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
          <Dashboard />
        </Suspense>
      }
    />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
