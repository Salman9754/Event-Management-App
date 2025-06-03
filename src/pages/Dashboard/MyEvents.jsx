import React, { useEffect } from "react";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import supabase from "@/supabase/client";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const MyEvents = () => {
  const navigate = useNavigate();
  const { EventData, fetchData, loading } = useClientInfo();
  const handleDelete = async (eventId, image) => {
    try {
      const pathStartIndex =
        image.indexOf("/event-images/") + "/event-images/".length;
      const imagePath = image.substring(pathStartIndex); // Just the path like "events/filename.jpg"

      // Delete image from storage
      const { error: imageError } = await supabase.storage
        .from("event-images")
        .remove([imagePath]);

      if (imageError) {
        console.error("Failed to delete image:", imageError.message);
        return; // Optional: stop if image delete fails
      }
    } catch (error) {
      console.log(error);
    }
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      toast.error("Failed to delete event:", error.message);
    } else {
      fetchData();
      toast.success("Event Deleted");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!EventData) return;
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
  if (EventData.length === 0) {
    return <p>No events create one</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 xxxl:grid-cols-5 gap-5  mobile_container">
      {EventData.map((event) => {
        return (
          <Card className="w-full max-w-md mx-auto" key={event.id}>
            <CardContent className="p-4">
              <Link to={`/dashboard/event_detail/${event.id}`}>
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="rounded-lg mb-4 h-48 w-full object-cover"
                />
                <div className="head flex justify-between">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <Badge
                    className={
                      event.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : event.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground">
                {event.date_event} • {event.location}
              </p>

              <p className="text-xs mt-1 text-rose-500">#{event.category}</p>
              <p className="text-sm mt-2">{event.description}</p>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => navigate(`/dashboard/edit_event/${event.id}`)}
                >
                  Edit
                </Button>
                <DeleteModal
                  onConfirm={() => handleDelete(event.id, event.image_url)}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MyEvents;
