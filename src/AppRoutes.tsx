// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConfigPage from "./pages/ConfigPage";
import UserLinksPage from "./pages/UserLinksPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/:userUrl" element={<UserLinksPage />} />
    </Routes>
  );
}

export default AppRoutes;