import React from "react";
import NewEventForm from "@/components/NewEventForm";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const CreateEvent = () => {
  return (
    <>
      <div className="new_loan_container mt-5">
        <Card className="px-3 bg-rose-600 text-white ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle /> Create a new Event
            </CardTitle>
            <CardDescription className="mt-2 text-white">
              Please fill all required information to create the event
            </CardDescription>
          </CardHeader>
        </Card>
        <NewEventForm />
      </div>
    </>
  );
};

export default CreateEvent;
