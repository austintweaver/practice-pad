
import { Outlet } from "react-router-dom";
import { ClientSidebar } from "./ClientSidebar";
import { Header } from "./Header";

export function ClientLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <ClientSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
