import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/client";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Skeleton } from "@/components/ui/skeleton";

const ManageEvents = () => {
  const { allUsersData, loading } = useClientInfo();
  const [allEvents, setallEvents] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*");
        if (eventError) throw eventError;
        if (eventData) {
          setallEvents(eventData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    data();
  }, []);
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
    <div className="mobile_container">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
          <CardDescription>
            Review event submissions and take action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Event</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Submitted By
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allEvents.map((event) => {
                  let userName = [];
                  if (!loading) {
                    userName = allUsersData.find((item) => {
                      return item.user_id === event.user_Id;
                    });
                  }

                  return (
                    <TableRow key={event.id}>
                      <TableCell className="min-w-[150px]">
                        {event.title}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        {userName.first_name} {userName.last_name}
                      </TableCell>
                      <TableCell className="min-w-[160px]">
                        {new Date(event.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium capitalize",
                            event.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : event.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {event.status}
                        </span>
                      </TableCell>
                      <TableCell className="min-w-[160px]">
                        {event.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleApprove(event.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(event.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageEvents;
