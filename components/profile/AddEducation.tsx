"use client";

import { CalendarDays, CirclePlus, Save } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { addEducation } from "@/app/actions/userActions";
import { toast } from "sonner";

interface AddEducationProps {
  userId: string;
}

export default function AddEducation({ userId }: AddEducationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [state, action, isPending] = useActionState(addEducation, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsOpen(false);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlus />
          Add Education
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Education</DialogTitle>
        </DialogHeader>

        <form action={action} className="grid gap-4 py-4">
          <Input type="hidden" name="userId" value={userId} />
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" name="degree" placeholder="e.g., MCA" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              placeholder="Enter your college or university"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Pune, India"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />{" "}
                Start Date
              </Label>
              <Input id="startDate" name="startDate" type="month" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />{" "}
                End Date
              </Label>
              <Input id="endDate" name="endDate" type="month" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="description">Job Description</Label>
            <Input id="grade" name="grade" placeholder="e.g., 7.29" />
          </div>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
