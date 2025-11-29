"use client";

import React, {
  useState,
  useRef,
  useActionState,
  useEffect,
  startTransition,
} from "react";
import { CirclePlus, X, Save, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { addSkills } from "@/app/actions/userActions";
import { toast } from "sonner";

interface AddSkillsProps {
  userId: string;
}

export default function AddSkills({ userId }: AddSkillsProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(addSkills, {
    success: false,
    error: "",
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const skillToAdd = inputValue.trim();

    if (skillToAdd && !skills.includes(skillToAdd)) {
      setSkills([...skills, skillToAdd]);
      setInputValue("");
    } else if (skillToAdd && skills.includes(skillToAdd)) {
      setInputValue("");
    }
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (skills.length === 0) return;

    const formData = new FormData();

    formData.append("skills", skills.join(","));

    formData.append("userId", userId);

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setSkills([]);
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
          Add Skills
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Skills</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              name="skills"
              placeholder="Type skill and press Enter or click Add"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSkill(e);
              }}
              className="grow"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              disabled={!inputValue.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="min-h-12 p-3 border rounded-md bg-gray-50 dark:bg-gray-800/50 flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium border border-primary/20"
                >
                  {skill}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer text-primary/70 hover:text-primary"
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-base italic self-center px-2">
                {`  Type skills like 'React', 'TypeScript', or 'MongoDB' to add them
                to your profile.`}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={skills.length === 0 || isPending}
            >
              {isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
