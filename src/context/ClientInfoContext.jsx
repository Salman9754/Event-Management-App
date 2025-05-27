import supabase from "@/supabase/client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./RouteContext";

export const ClientInfoContext = createContext(null);
export const ClientInfoProvider = ({ children }) => {
  const { user, sessionChecked } = useAuth();
  const [clientData, setclientData] = useState([]);
  const [EventData, setEventData] = useState([]);
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
            try {
              const { data: eventData, error: eventError } = await supabase
                .from("events")
                .select("*")
                .eq("user_Id", user.id);
              if (eventError) throw eventError;
              if (eventData) {
                setEventData(eventData);
              }
            } catch (error) {
              console.log(error);
            }
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
        EventData,
        fetchData,
        clearClientData: () => setclientData([]),
      }}
    >
      {children}
    </ClientInfoContext.Provider>
  );
};

export const useClientInfo = () => useContext(ClientInfoContext);
