import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/RouteContext";
import { ClientInfoProvider } from "./context/ClientInfoContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ClientInfoProvider>
      <App />
      <Toaster />
    </ClientInfoProvider>
  </AuthProvider>
);
