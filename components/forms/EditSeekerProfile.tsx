"use client";

import { Pencil, User, Save, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  editSeekerProfileSchema,
  editSeekerProfileSchemaType,
} from "@/lib/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoggedInUser } from "@/types/loggedInUser";
import { startTransition, useActionState, useEffect, useState } from "react";
import { editSeekerProfile } from "@/app/actions/seeker.actions";
import { toast } from "sonner";

interface EditSeekerProfileProps {
  user: LoggedInUser;
}

export default function EditSeekerProfile({ user }: EditSeekerProfileProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(editSeekerProfile, {
    success: false,
    error: "",
  });

  const form = useForm<editSeekerProfileSchemaType>({
    resolver: zodResolver(editSeekerProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      headline: user?.headline || "",
      mobileNo: user?.mobileNo || "",
      city: user?.city || "",
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name || "",
        email: user?.email || "",
        headline: user?.headline || "",
        mobileNo: user?.mobileNo || "",
        city: user?.city || "",
        avatar: undefined,
      });
    }
  }, [user, form, open]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function onSubmit(values: editSeekerProfileSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Personal Details</DialogTitle>

        <div className="flex justify-center">
          <p className="w-16 h-16 border rounded-full relative overflow-hidden">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                fill={true}
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <User className="w-full h-full rounded-full p-2" />
            )}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Change Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldProps}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Headline</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
