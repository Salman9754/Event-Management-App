import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex md:h-screen">
      <Sidebar className='md:sticky md:top-0 md:h-screen'/>
      <main className="flex-1 p-6 min-h-screen bg-neutral-50 overflow-y-auto">
        <Outlet /> {/* This is where the content of the selected nav appears */}
      </main>
    </div>
  );
}