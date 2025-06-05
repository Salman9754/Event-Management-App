import React, { useState } from "react";
import LogOutBtn from "@/components/LogOutBtn";
import supabase from "@/supabase/client";
import { CheckCircleIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/context/RouteContext";
import { useClientInfo } from "@/context/ClientInfoContext";

const AdminPage = () => {
  const { clientData, allUsersData } = useClientInfo();
  const { user } = useAuth();
  const [admin, setadmin] = useState([]);
  const [activity, setactivity] = useState([]);
  const [actLoading, setactLoading] = useState(false);
  const AdminData = clientData.find((item) => item.user_id === user.id);

  useEffect(() => {
    const Data = async () => {
      setactLoading(true);
      try {
        const { data, error } = await supabase.from("activity").select("*");
        if (error) throw error;
        if (data) {
          setactivity(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setactLoading(false);
        }, 200);
      }
    };
    Data();
    setadmin(AdminData);
  }, [clientData]);

  return (
    <div className="fullcard mt-5">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="title_container flex justify-between items-center">
              <div>
                {admin ? (
                  <span key={admin.id}>
                    {admin.first_name} {admin.last_name}
                  </span>
                ) : (
                  "No User Logged In"
                )}
              </div>
              <div className="hidden lg:block md:block">
                <LogOutBtn />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            Welcome, Admin! You can review, approve, or delete event requests
            here.
          </CardDescription>
          <div className="logout_for_mobile w-full flex justify-center lg:hidden md:hidden">
            <LogOutBtn />
          </div>
        </CardHeader>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Last few event changes
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {actLoading ? (
            <ul className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-muted flex flex-col sm:flex-row justify-between sm:items-center gap-3 animate-pulse"
                >
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </li>
              ))}
            </ul>
          ) : activity.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm flex flex-col">
              No recent activity yet
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {activity.map((item, index) => {
                const actUser = allUsersData.find((user) => {
                  return user.user_id === item.user_id;
                });
                return (
                  <li
                    key={index}
                    className="flex items-start gap-3 border-b pb-2 last:border-none"
                  >
                    <span className="text-xl text-muted-foreground">
                      {item.type === "created" ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <Trash2 className="w-5 h-5 text-red-600" />
                      )}
                    </span>
                    <div>
                      <p>
                        {item.type === "created" ? (
                          <>
                            Created event{" "}
                            <span className="font-semibold">
                              {" "}
                              "{item.event_name}"
                            </span>{" "}
                            by{" "}
                            <span className="text-green-600">
                              {actUser?.first_name} {actUser?.last_name}
                            </span>
                          </>
                        ) : (
                          <>
                            Deleted event{" "}
                            <span className="font-semibold">
                              {" "}
                              "{item.event_name}"
                            </span>{" "}
                            by{" "}
                            <span className="text-rose-600">
                              {actUser?.first_name} {actUser?.last_name}
                            </span>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
