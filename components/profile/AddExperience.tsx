"use client";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CirclePlus, Save, CalendarDays } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { addExperience } from "@/app/actions/userActions";
import { toast } from "sonner";
interface AddExperienceProps {
  userId: string;
}

export default function AddExperience({ userId }: AddExperienceProps) {
  const [isCurrent, setIsCurrent] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(addExperience, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Experience
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="grid gap-4 py-4">
          <Input type="hidden" name="userId" value={userId} />
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Frontend developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="e.g., TCS or Freelance"
              required
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

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="isCurrent"
              name="isCurrent"
              checked={isCurrent}
              onChange={() => setIsCurrent(!isCurrent)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label
              htmlFor="isCurrent"
              className="flex items-center text-sm font-medium leading-none cursor-pointer"
            >
              I currently work here
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />{" "}
                Start Date
              </Label>
              <Input id="startDate" name="startDate" type="month" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />{" "}
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                disabled={isCurrent}
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Summarize your role and key achievements (optional)"
              rows={4}
            />
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
