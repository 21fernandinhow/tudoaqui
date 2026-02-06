import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const MetricsPage = lazy(() => import("./pages/MetricsPage"));
const ManifestPage = lazy(() => import("./pages/ManifestPage"));

import ConfigPage from "./pages/ConfigPage";
import UserLinksPage from "./pages/UserLinksPage";

export const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/explore"
        element={
          <Suspense fallback={null}>
            <ExplorePage />
          </Suspense>
        }
      />
      <Route
        path="/metrics"
        element={
          <Suspense fallback={null}>
            <MetricsPage />
          </Suspense>
        }
      />

      <Route path="/config" element={<ConfigPage />} />
      <Route path="/manifest" element={<ManifestPage />} />
      <Route path="/:userUrl" element={<UserLinksPage />} />
    </Routes>
  );
};