
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ClientLayout } from "./components/layout/ClientLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Professional Pages
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";
import Messages from "./pages/Messages";
import Services from "./pages/Services";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reporting from "./pages/Reporting";
import Finances from "./pages/Finances";
import TimeTracking from "./pages/TimeTracking";
import ProfessionalSignup from "./pages/professional/ProfessionalSignup";
import CreateClientAccount from "./pages/attorney/CreateClientAccount";
import CreateTeamMember from "./pages/attorney/CreateTeamMember";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientDocuments from "./pages/client/ClientDocuments";
import ClientMessages from "./pages/client/ClientMessages";
import ClientServices from "./pages/client/ClientServices";
import ClientCalendar from "./pages/client/ClientCalendar";
import ClientFinances from "./pages/client/ClientFinances";

// Other
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/professional/signup" element={<ProfessionalSignup />} />
          
          {/* Professional Routes - Protected (would need auth in real app) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/new" element={<CreateClientAccount />} />
            <Route path="/team/new" element={<CreateTeamMember />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/services" element={<Services />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/timetracking" element={<TimeTracking />} />
          </Route>
          
          {/* Client Routes - Protected (would need auth in real app) */}
          <Route element={<ClientLayout />}>
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/documents" element={<ClientDocuments />} />
            <Route path="/client/messages" element={<ClientMessages />} />
            <Route path="/client/services" element={<ClientServices />} />
            <Route path="/client/calendar" element={<ClientCalendar />} />
            <Route path="/client/finances" element={<ClientFinances />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
