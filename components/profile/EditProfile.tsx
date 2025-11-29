"use client";

import { Pencil, Save, User } from "lucide-react";
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
import Image from "next/image";
import { Label } from "../ui/label";
import { editProfile } from "@/app/actions/userActions";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoggedInUser } from "@/types/loggedInUser";

interface EditProfileProps {
  user: LoggedInUser;
}

export default function EditProfile({ user }: EditProfileProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [state, action, isPending] = useActionState(editProfile, {
    success: false,
    error: "",
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsOpen(false);
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action}>
          <Input type="hidden" name="id" value={user._id} />
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6">
            <p className="w-16 h-16 border rounded-full relative overflow-hidden">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  fill={true}
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <User className="w-full h-full rounded-full p-2" />
              )}
            </p>
            <div className="w-full space-y-2">
              <Label htmlFor="avatar">Change Avatar:</Label>
              <Input id="avatar" type="file" name="avatar" accept="image/*" />
            </div>
            <div className="w-full space-y-2">
              <Label>Name:</Label>
              <Input name="username" defaultValue={user.username || ""} />
            </div>
            <div className="w-full space-y-2">
              <Label>Email:</Label>
              <Input name="email" defaultValue={user.email || ""} disabled />
            </div>
            <div className="w-full space-y-2">
              <Label>Headline:</Label>
              <Input name="headline" defaultValue={user.headline || ""} />
            </div>
            <div className="w-full space-y-2">
              <Label>Mobile No:</Label>
              <Input name="mobileNo" defaultValue={user.mobileNo || ""} />
            </div>
            <div className="w-full space-y-2">
              <Label>City:</Label>
              <Input name="city" defaultValue={user.city || ""} />
            </div>
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
