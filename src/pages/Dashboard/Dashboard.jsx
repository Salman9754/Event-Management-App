import { React, useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import { CreditCard, CheckCircle, Gauge, Users } from "lucide-react";
import '../../styles/dashboard.css'
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

const DashboardPage = () => {
  const { loading, clientData } = useClientInfo();

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
              headingCount={0}
              icon={CreditCard}
              iconColor={"text-blue-700"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={"Approved Events"}
              headingCount={0}
              icon={CheckCircle}
              iconColor={"text-green-500"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={"Pending Events"}
              headingCount={0}
              icon={Gauge}
              iconColor={"text-amber-300"}
            />
          </div>
          <div className="cards w-full">
            <DashboardCard
              heading={" Total Participants"}
              headingCount={0}
              icon={Users}
              iconColor={"text-purple-500"}
            />
          </div>
        </div>
        <div className="fullcard_two mt-5">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                <br />
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-4">
              <p>No recent activity to display</p>
              <Link to={"/dashboard/create_event"}>
                {" "}
                <Button>Create New Event</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
