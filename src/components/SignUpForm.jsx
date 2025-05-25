import { React, useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "@/supabase/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

const SignupForm = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("Account created confirm email");
  const [loading, setloading] = useState(false);
  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    const { firstname, lastname, email, password } = formData;
    console.log(firstname, lastname, email, password);
    try {
      setloading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (data) {
        const userId = data.user.id;
        try {
          const { error: UserError } = await supabase.from("users").insert({
            first_name: firstname,
            last_name: lastname,
            email: email,
            user_id: userId,
          });
          if (UserError) throw UserError;
          notify();
          form.reset();
          setInterval(() => {
            navigate("/login");
          }, 2700);
        } catch (error) {
          console.log(error);
        } finally {
          setloading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstname"
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastname"
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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

export default SignupForm;
