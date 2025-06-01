import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useClientInfo } from "@/context/ClientInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import "../../styles/dashboard.css";
import { toast } from "sonner";
import supabase from "@/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
const EditEvent = () => {
  const { eventId } = useParams();
  const { EventData, loading: contextLoading } = useClientInfo();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date_event: "",
      location: "",
      category: "",
      image_url: "",
    },
  });
  const { reset, handleSubmit } = form;
  useEffect(() => {
    // Try to find event in context first
    const eventFromContext = EventData.find((e) => e.id === Number(eventId));
    if (eventFromContext) {
      setEventData(eventFromContext);
      reset(eventFromContext);
      setLoading(false);
    }
  }, [eventId, EventData]);
  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      image_url: uploadedImageUrl || values.image_url,
    };
    const { error } = await supabase
      .from("events")
      .update(updatedValues)
      .eq("id", eventId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event Updated");
    }
  };
  if (loading || contextLoading) return <p>Loading...</p>;
  if (!eventData) return <p>Event not found.</p>;

  return (
    <>
      <div className="new_loan_container mt-5">
        <Card className="px-3 bg-rose-600 text-white ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle /> Edit Event
            </CardTitle>
            <CardDescription className="mt-2 text-white">
              fill the information to update the event
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Event description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} min={today} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                rules={{
                  required: "Required",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5 relative">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Entertainment">
                          Entertainment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_url"
                rules={{ required: "Image is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Update Event Image</FormLabel>
                    <FormControl>
                      <Input
                        name="image_url"
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (field.value) {
                            const oldUrl = field.value;
                            const pathStartIndex =
                              oldUrl.indexOf("/event-images/") +
                              "/event-images/".length;
                            const oldPath = oldUrl.substring(pathStartIndex); // just the file path

                            const { error: deleteError } =
                              await supabase.storage
                                .from("event-images")
                                .remove([oldPath]);

                            if (deleteError) {
                              console.error(
                                "Failed to delete old image:",
                                deleteError.message
                              );
                            }
                          }
                          if (!file) return;

                          const fileExt = file.name.split(".").pop();
                          const fileName = `${Date.now()}.${fileExt}`;
                          const filePath = `events/${fileName}`;

                          const { error: uploadError } = await supabase.storage
                            .from("event-images")
                            .upload(filePath, file);

                          if (uploadError) {
                            console.error("Upload error:", uploadError.message);
                          } else {
                            const {
                              data: { publicUrl },
                            } = supabase.storage
                              .from("event-images")
                              .getPublicUrl(filePath);
                            setUploadedImageUrl(publicUrl);
                            field.onChange(publicUrl);
                          }
                        }}
                      />
                    </FormControl>
                    {field.value && (
                      <img
                        src={field.value}
                        alt="Event"
                        className="mt-10 w-48 h-auto rounded-2xl border border-muted shadow-md p-1"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="submit_btn mt-12 flex justify-end">
                <Button type="submit">
                  {loading ? (
                    <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Update Event" // Text when loading is false
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default EditEvent;
