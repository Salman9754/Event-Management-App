import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import supabase from "@/supabase/client";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useAuth } from "@/context/RouteContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const NewEventForm = () => {
  const imageRef = useRef(null);
  const [loading, setloading] = useState(false);
  const notify = () => toast.success("Event Created");
  const notifyError = () => toast.error("Something went wrong");
  let { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      dateOfEvent: "",
      Location: "",
      category: "",
      image: null,
    },
  });
  const { reset } = form;
  const onSubmit = async (newLoanData) => {
    const { title, dateOfEvent, Location, category, description, image } =
      newLoanData;

    try {
      setloading(true);

      const userId = user.id;

      let imageUrl = null;

      if (image && image[0]) {
        const avatarFile = image[0];
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `events/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          notifyError();
          throw uploadError;
        }

        // get public URL
        const { data: publicData } = supabase.storage
          .from("event-images")
          .getPublicUrl(filePath);

        imageUrl = publicData?.publicUrl;
      }
      const { data: newEvent, error } = await supabase
        .from("events")
        .insert({
          title: title,
          description: description,
          date_event: dateOfEvent,
          location: Location,
          category: category,
          image_url: imageUrl,
          user_Id: userId,
        })
        .select()
        .single();

      if (error) throw error;
      try {
        await supabase.from("activity").insert([
          {
            event_id: newEvent.id,
            event_name: title,
            type: "created",
            user_id: userId,
          },
        ]);
        notify();
        setTimeout(() => {
          reset();
          if (imageRef.current) {
            imageRef.current.value = null;
          }
        }, 1000);
      } catch (error) {
        console.log(error.message);
      }
    } catch (err) {
      notifyError();
      console.error("Error submitting event:", err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Required",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Event Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* date of event  */}
              <FormField
                control={form.control}
                name="dateOfEvent"
                rules={{
                  required: "Required",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Date of Event</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} min={today} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Location */}
              <FormField
                control={form.control}
                name="Location"
                rules={{
                  required: "Required",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Event Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Category  */}
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
              {/* Image  */}
              <FormField
                control={form.control}
                name="image"
                rules={{ required: "Image is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Event Image</FormLabel>
                    <FormControl>
                      <Input
                        ref={imageRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{
                  required: "Required",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2 mt-5">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="submit_btn mt-12 flex justify-end">
                <Button type="submit">
                  {loading ? (
                    <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Submit" // Text when loading is false
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

export default NewEventForm;
