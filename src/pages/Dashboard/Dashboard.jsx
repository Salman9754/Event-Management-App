import { React, useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import {
  CreditCard,
  CheckCircle,
  Gauge,
  Users,
  CheckCircleIcon,
  Trash2,
} from "lucide-react";
import "../../styles/dashboard.css";
import { Button } from "@/components/ui/button";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import supabase from "@/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LogOutBtn from "@/components/LogOutBtn";
import { useAuth } from "@/context/RouteContext";

const DashboardPage = () => {
  const { loading, clientData, EventData, Partcipiants } = useClientInfo();
  const { user } = useAuth();
  const [pending, setpending] = useState([]);
  const [Approved, setApproved] = useState([]);
  const [activity, setactivity] = useState([]);
  const [actLoading, setactLoading] = useState(false);
  useEffect(() => {
    if (EventData?.length) {
      const pendingData = EventData.filter((item) => item.status === "pending");
      setpending(pendingData);
      const approved = EventData.filter((item) => item.status === "approved");
      setApproved(approved);
    }
  }, [EventData]);
  useEffect(() => {
    const Data = async () => {
      try {
        setactLoading(true);
        const { data, error } = await supabase
          .from("activity")
          .select("*")
          .eq("user_id", user.id);
        if (error) throw error;
        if (data) {
          setactivity(data)
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setactLoading(false);
      }
    };
    Data();
  }, [user?.id]);
  if (loading) {
    return (
      <>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="dashboard_cards flex flex-col gap-5">
        <div className="fullcard mt-5">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="title_container flex justify-between items-center">
                  <div>
                    {clientData
                      ? clientData.map((item, index) => {
                          return (
                            <span key={index}>
                              {item.first_name} {item.last_name}
                            </span>
                          );
                        })
                      : "No User Logged In"}
                  </div>
                  <div className="hidden lg:block md:block">
                    <LogOutBtn />
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                Thank you for using our platform here is the overview of your
                account
              </CardDescription>
              <div className="logout_for_mobile w-full flex justify-center lg:hidden md:hidden">
                <LogOutBtn />
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="cards w-full">
            <DashboardCard
              heading={" My Events"}
              headingCount={EventData.length}
              icon={CreditCard}
              iconColor={"text-blue-700"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={"Approved Events"}
              headingCount={Approved.length}
              icon={CheckCircle}
              iconColor={"text-green-500"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={"Pending Events"}
              headingCount={pending.length}
              icon={Gauge}
              iconColor={"text-amber-300"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={" Total Participants"}
              headingCount={Partcipiants.length}
              icon={Users}
              iconColor={"text-purple-500"}
            />
          </div>
        </div>
        <div className="fullcard_two mt-5">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
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
                  <Link to="/dashboard/create_event">
                    <Button className="mt-3">Create new event</Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3 text-sm">
                  {activity.map((item, index) => (
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
                          {item.type === "created"
                            ? `Created event "${item.event_name}"`
                            : `Deleted event "${item.event_name}"`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
