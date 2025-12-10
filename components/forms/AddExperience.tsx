"use client";

import { CalendarDays, CirclePlus, Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  experienceSchema,
  experienceSchemaType,
} from "@/lib/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { addExperience } from "@/app/actions/seeker.actions";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function AddExperience() {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(addExperience, {
    success: false,
    error: "",
  });

  const form = useForm<experienceSchemaType>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      isCurrent: false,
      joiningDate: undefined,
      leavingDate: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      form.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, form]);

  const isCurrentJob = form.watch("isCurrent");

  function onSubmit(values: experienceSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlus />
          Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Experience</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Senior Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Hiring Apex" {...field} />
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
                    <Input placeholder="e.g., Pune, India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I currently work here</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <CalendarDays className="w-4 h-4" />
                      Joining Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().slice(0, 7)
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leavingDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <CalendarDays className="w-4 h-4" />
                      Leaving Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        {...field}
                        disabled={isCurrentJob}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().slice(0, 7)
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Describe your key responsibilities, achievements, and projects in this role."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
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
