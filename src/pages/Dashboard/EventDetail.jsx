import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/RouteContext";
import supabase from "@/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import DeleteModal from "@/components/DeleteModal";

const EventDetailPage = () => {
  const { user } = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [open, setopen] = useState(false);
  const { eventId } = useParams();
  const { EventData, Partcipiants, fetchData, loading } = useClientInfo();
  const event = EventData.find((event) => String(event.id) === String(eventId));
  const handleAddParticipant = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("participiants").insert({
        name: name,
        email: email,
        phone: phone,
        event_id: eventId,
        user_id: user.id,
      });
      if (error) throw error;
      setname("");
      setemail("");
      setphone("");
      setopen(false);
      fetchData();
      setTimeout(() => {
        toast.success("Participiant added successfully");
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (Id) => {
    try {
      const { error } = await supabase
        .from("participiants")
        .delete()
        .eq("id", Id);
      if (error) throw error;
      toast.success("Participiant deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  if (!event) {
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
    <Card className="w-full max-w-3xl mx-auto border rounded-xl shadow-sm mobile_container">
      <CardHeader className="p-4 space-y-3">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-56 sm:h-64 object-cover rounded-lg border"
          />
        )}

        <div className="flex items-center justify-between w-full flex-wrap gap-2">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-medium text-primary">
            {event.title}
          </CardTitle>
          <Badge
            className={`text-xs px-2 py-1 rounded-full capitalize ${
              event.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : event.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {event.status}
          </Badge>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-4">
        {event.status === "pending" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold">
                Add Participant
              </h3>
              <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setopen(true)}>
                    + Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg font-semibold">
                      Add New Participant
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Fill out the form to add a participant to this event.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleAddParticipant}
                    className="space-y-4 mt-4"
                  >
                    <Input
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <Input
                      placeholder="Phone"
                      required
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-base sm:text-lg mb-3">Participants</h3>
          {loading ? (
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
          ) : Partcipiants.length > 0 ? (
            <ul className="space-y-3">
              {Partcipiants.map((p) => (
                <li
                  key={p.id}
                  className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-muted flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-primary">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.email}</p>
                    <p className="text-sm text-muted-foreground">{p.phone}</p>
                  </div>
                  <DeleteModal onConfirm={() => handleDelete(p.id)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No participants added yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailPage;
