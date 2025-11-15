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

// Nuevas páginas del sistema Planners Edition
import ClientsPage from "@/routes/ClientsPage";
import EventsPage from "@/routes/EventsPage";
import RoomingListPage from "@/routes/RoomingListPage";
import PaymentsPage from "@/routes/PaymentsPage";
import QuotesPage from "@/routes/QuotesPage";
import ProvidersPage from "@/routes/ProvidersPage";
import ReportsPage from "@/routes/ReportsPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Planners Edition Routes */}
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/rooming-list" element={<RoomingListPage />} />
          <Route path="/pagos" element={<PaymentsPage />} />
          <Route path="/cotizaciones" element={<QuotesPage />} />
          <Route path="/proveedores" element={<ProvidersPage />} />
          <Route path="/reportes" element={<ReportsPage />} />

          {/* Original Routes */}
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
