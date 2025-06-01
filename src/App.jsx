import "./App.css";
import { useEffect } from "react";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  useEffect(() => {
    console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("KEY:", import.meta.env.VITE_SUPABASE_KEY);
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
