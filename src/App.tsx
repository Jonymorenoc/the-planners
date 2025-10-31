import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LandingPage } from "@/routes/LandingPage";
import { DashboardPage } from "@/routes/DashboardPage";
import { GuestsPage } from "@/routes/GuestsPage";
import { BudgetPage } from "@/routes/BudgetPage";
import { PhotosPage } from "@/routes/PhotosPage";
import { WebsiteBuilderPage } from "@/routes/WebsiteBuilderPage";
import { SeatingPlannerPage } from "@/routes/SeatingPlannerPage";
import { ContractsPage } from "@/routes/ContractsPage";
import { OnboardingPage } from "@/routes/OnboardingPage";
import { LoginPage } from "@/routes/LoginPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/invitados" element={<GuestsPage />} />
          <Route path="/presupuesto" element={<BudgetPage />} />
          <Route path="/fotos" element={<PhotosPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/sitio-web" element={<WebsiteBuilderPage />} />
          <Route path="/planificador" element={<SeatingPlannerPage />} />
          <Route path="/contratos" element={<ContractsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
