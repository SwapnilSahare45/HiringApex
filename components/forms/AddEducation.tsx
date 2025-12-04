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
import {
  educationSchema,
  EducationSchemaType,
} from "@/lib/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEducation } from "@/app/actions/seeker.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

interface AddEducationProps {
  userId: string;
}

export default function AddEducation({ userId }: AddEducationProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(addEducation, {
    success: false,
    error: "",
  });

  const form = useForm<EducationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      userId: userId,
      institution: "",
      degree: "",
      isCurrent: false,
      startDate: undefined,
      endDate: undefined,
      grade: "",
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

  const isCurrentEducation = form.watch("isCurrent");

  function onSubmit(values: EducationSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlus />
          Add Education
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Education</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input type="hidden" name="userId" defaultValue={userId} />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>I am currently enrolled here</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <CalendarDays className="w-4 h-4" />
                      Start Date
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
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <CalendarDays className="w-4 h-4" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        {...field}
                        disabled={isCurrentEducation}
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
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
