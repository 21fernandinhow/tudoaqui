import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ConfigPage } from "./pages/ConfigPage";
import { UserLinksPage } from "./pages/UserLinksPage";
import { PremiumPage } from "./pages/PremiumPage";
import { CommunityPage } from "./pages/CommunityPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/premium" element={<PremiumPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/:userUrl" element={<UserLinksPage />} />
    </Routes>
  );
}