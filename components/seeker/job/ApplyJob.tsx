"use client";

import { applyForJob } from "@/app/actions/seeker.actions";
import { Button } from "../../ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";

interface ApplyJobProps {
  jobId: string;
  hasApplied: boolean;
}

export default function ApplyJob({ jobId, hasApplied }: ApplyJobProps) {
  const applyActionWithId = applyForJob.bind(null, jobId);
  const [state, action, isPending] = useActionState(applyActionWithId, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  if (hasApplied || state?.success) {
    return (
      <div className="w-full bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
          <CircleCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h4 className="font-semibold text-green-700 dark:text-green-300">
            Application Submitted
          </h4>
          <p className="text-sm text-green-600/80 dark:text-green-400/80">
            Good luck! The recruiter is reviewing your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action}>
      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Applying..." : "Apply Now"}
      </Button>
    </form>
  );
}
