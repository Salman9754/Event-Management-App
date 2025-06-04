import React, { useMemo, useState } from "react";
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
  const { EventData, loading, Partcipiants } = useClientInfo();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("date_desc");

  const totalParticipants = Partcipiants.length;

  const eventsWithParticipantCount = useMemo(() => {
    return EventData.map((event) => {
      const count = Partcipiants.filter((p) => p.event_id === event.id).length;
      return { ...event, participantCount: count };
    });
  }, [EventData, Partcipiants]);

  const sortedEvents = useMemo(() => {
    return [...eventsWithParticipantCount].sort((a, b) => {
      if (sortBy === "date_asc")
        return new Date(a.date_event) - new Date(b.date_event);
      if (sortBy === "date_desc")
        return new Date(b.date_event) - new Date(a.date_event);
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
    <div className="max-w-4xl mx-auto p-4 space-y-6 mobile_container">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        Events & Participants Overview
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {EventData.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm text-muted-foreground">Total Participants</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {totalParticipants}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sort */}
      <div className="flex justify-end">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] sm:w-[220px]">
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
      ) : sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No events available.
        </p>
      ) : (
        <ul className="space-y-4">
          {sortedEvents.map((event) => (
            <li
              key={event.id}
              onClick={() => navigate(`/dashboard/event_detail/${event.id}`)}
              className="cursor-pointer border rounded-lg p-4 bg-background hover:shadow transition-shadow flex justify-between items-center gap-4"
            >
              <div>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {event.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.date_event
                    ? new Date(event.date_event).toLocaleDateString()
                    : "No Date"}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Badge className="text-xs sm:text-sm" variant="secondary">
                  {event.participantCount} Participants
                </Badge>
                <Badge
                  className="text-xs sm:text-sm"
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
