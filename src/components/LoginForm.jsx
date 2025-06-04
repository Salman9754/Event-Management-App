import { React, useState } from "react";
import supabase from "@/supabase/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/RouteContext";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //   const { fetchData } = useClientInfo();
  const { role, checkSession } = useAuth();
  const navigate = useNavigate();
  const Unnotify = (error) => toast.error(error.message);
  const [loading, setloading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (FormData) => {
    const { email, password } = FormData;
    try {
      setloading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (data) {
        // await fetchData();
        form.reset();
        checkSession();
        if (role === "user") {
          navigate("/dashboard");
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      Unnotify(error);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Submit" // Text when loading is false
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
