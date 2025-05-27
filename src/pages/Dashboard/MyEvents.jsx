import React, { useEffect } from "react";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import supabase from "@/supabase/client";
import DeleteModal from "@/components/DeleteModal";

const MyEvents = () => {
  const navigate = useNavigate();
  const { EventData, fetchData } = useClientInfo();
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
      console.error("Failed to delete event:", error.message);
    } else {
      fetchData();
      console.log("Event deleted successfully");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!EventData) return;
  console.log(EventData);

  if (EventData.length === 0) {
    return <p>No events create one</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 new_loan_container">
      {EventData.map((event) => {
        return (
          <Card key={event.id} className="w-full max-w-md mx-auto">
            <CardContent className="p-4">
              <img
                src={event.image_url}
                alt={event.title}
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-muted-foreground">
                {event.date_event} • {event.location}
              </p>

              <p className="text-xs mt-1 text-rose-500">#{event.category}</p>
              <p className="text-sm mt-2">{event.description}</p>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/dashboard/edit_event/${event.id}`)}
                >
                  Edit
                </Button>
                <DeleteModal onConfirm={() => handleDelete(event.id,event.image_url)} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MyEvents;
