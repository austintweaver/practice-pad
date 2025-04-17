
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ClientLayout } from "./components/layout/ClientLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";
import Messages from "./pages/Messages";
import Services from "./pages/Services";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reporting from "./pages/Reporting";
import NotFound from "./pages/NotFound";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientDocuments from "./pages/client/ClientDocuments";
import ClientMessages from "./pages/client/ClientMessages";
import ClientServices from "./pages/client/ClientServices";
import ClientCalendar from "./pages/client/ClientCalendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Attorney Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/services" element={<Services />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reporting" element={<Reporting />} />
          </Route>
          
          {/* Client Routes */}
          <Route element={<ClientLayout />}>
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/documents" element={<ClientDocuments />} />
            <Route path="/client/messages" element={<ClientMessages />} />
            <Route path="/client/services" element={<ClientServices />} />
            <Route path="/client/calendar" element={<ClientCalendar />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
