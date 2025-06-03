import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Participents = () => {
  const { EventData, loading } = useClientInfo();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("date_desc");
  const [participiants, setparticipiants] = useState([]);
  const totalParticipants = participiants.length;
  useEffect(() => {
    try {
      const FetchData = async () => {
        const { data, error } = await supabase.from("participiants").select();
        if(error) throw error
        if(data){
          setparticipiants(data)
        }
      };
    } catch (error) {
      log
    }
  }, []);

  const eventsWithParticipantCount = useMemo(() => {
    return events.map((event) => {
      const count = participants.filter((p) => p.event_id === event.id).length;
      return { ...event, participantCount: count };
    });
  }, [events, participants]);

  const sortedEvents = useMemo(() => {
    return [...eventsWithParticipantCount].sort((a, b) => {
      if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "participants_desc")
        return b.participantCount - a.participantCount;
      if (sortBy === "participants_asc")
        return a.participantCount - b.participantCount;
      if (sortBy === "name_asc") return a.title.localeCompare(b.title);
      if (sortBy === "name_desc") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [eventsWithParticipantCount, sortBy]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-semibold">Events & Participants Overview</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-2xl font-bold text-primary">10</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Participants</p>
            <p className="text-2xl font-bold text-primary">30</p>
          </CardContent>
        </Card>
      </div>

      {/* Sort */}
      <div className="flex justify-end">
        <Select
        //  value={sortBy} onValueChange={setSortBy}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_desc">Date: Newest First</SelectItem>
            <SelectItem value="date_asc">Date: Oldest First</SelectItem>
            <SelectItem value="participants_desc">
              Participants: High to Low
            </SelectItem>
            <SelectItem value="participants_asc">
              Participants: Low to High
            </SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events List */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No events available.
        </p>
      ) : (
        <ul className="space-y-4">
          {sortedEvents.map((event) => (
            <li
              key={event.id}
              onClick={() => navigate(`/dashboard/event/${event.id}`)}
              className="cursor-pointer border rounded-lg p-4 bg-background hover:shadow transition-shadow flex justify-between items-center"
            >
              <div>
                <p className="text-base font-medium text-foreground">
                  {event.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : "No Date"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {event.participantCount} Participants
                </Badge>
                <Badge
                  variant={
                    event.status === "approved"
                      ? "success"
                      : event.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {event.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Participents;
