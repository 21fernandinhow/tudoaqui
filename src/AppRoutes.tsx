import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const PremiumPage = lazy(() => import("./pages/PremiumPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const MetricsPage = lazy(() => import("./pages/MetricsPage"));

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
        path="/premium"
        element={
          <Suspense fallback={null}>
            <PremiumPage />
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
      <Route path="/:userUrl" element={<UserLinksPage />} />
    </Routes>
  );
};