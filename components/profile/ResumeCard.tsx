"use client";

import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Input } from "../ui/input";
import { useActionState, useEffect, useRef } from "react";
import { uploadResume } from "@/app/actions/userActions";
import { LoggedInUser } from "@/types/loggedInUser";
import { toast } from "sonner";

interface ResumeCardProps {
  user: LoggedInUser;
  resume: string;
}

export default function ResumeCard({ user, resume }: ResumeCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useActionState(uploadResume, {
    success: false,
    error: "",
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Empty className="w-4/5 border border-dashed shadow">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>Resume</EmptyTitle>

        <EmptyDescription>
          {resume ? (
            <a href={resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          ) : (
            "Resume not uploaded yet."
          )}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <form action={action} ref={formRef}>
          <Input type="hidden" name="id" value={user._id} />
          <Input
            type="file"
            name="resumeFile"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            type="button"
            onClick={handleButtonClick}
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </EmptyContent>
    </Empty>
  );
}
