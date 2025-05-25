import supabase from "@/supabase/client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./RouteContext";

export const ClientInfoContext = createContext(null);
export const ClientInfoProvider = ({ children }) => {
  const { user, sessionChecked } = useAuth();
  const [clientData, setclientData] = useState([]);
  const [LoanData, setLoanData] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchData = async () => {
    try {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", user.id);
          if (error) throw error;
          if (data) {
            setclientData(data);
            // try {
            //   const { data: LoanData, error: LoanError } = await supabase
            //     .from("Loan_Requests")
            //     .select("*")
            //     .eq("user_id", user.id);
            //   if (LoanError) throw LoanError;
            //   if (LoanData) {
            //     setLoanData(LoanData);
            //   }
            // } catch (error) {
            //   console.log(error);
            // }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setclientData([]);
      console.log(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (sessionChecked) {
      fetchData();
    }
  }, [user, sessionChecked]);

  return (
    <ClientInfoContext.Provider
      value={{
        loading,
        clientData,
        LoanData,
        fetchData,
        clearClientData: () => setclientData([]),
      }}
    >
      {children}
    </ClientInfoContext.Provider>
  );
};

export const useClientInfo = () => useContext(ClientInfoContext);
