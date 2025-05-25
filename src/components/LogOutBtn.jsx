import { Button } from "./ui/button";
import supabase from "@/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
// import { useClientInfo } from "@/context/supabaseClientInfo";

const LogOutBtn = () => {
  const navigate = useNavigate();
  // const { clearClientData } = useClientInfo();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // clearClientData();
      navigate("/login");
    } catch (error) {
      console.log("Error during logout:", error.message);
    }
  };

  return (
    <Button className="bg-red-500" onClick={handleLogout}>
      <LogOut /> Log Out
    </Button>
  );
};

export default LogOutBtn;