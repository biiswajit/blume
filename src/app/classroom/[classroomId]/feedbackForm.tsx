"use client";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { useState, useEffect } from "react";
import { sendFeedback, fetchFeedback } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackForm({
  solutionId,
  assignmentMark,
}: {
  solutionId: string;
  assignmentMark: string;
}) {
  const [mark, setMark] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchRes() {
      const res = await fetchFeedback(solutionId);
      if (res) {
        setMark(res.mark);
        setFeedback(res.feedback);
      }
    }

    fetchRes();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div>
        <Label htmlFor="obtainMark" className="opacity-70">
          Mark
        </Label>
        <Input
          className="bg-sidebar-accent border border-primary"
          value={mark}
          type="number"
          placeholder="obtained mark"
          onChange={(e) => setMark(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message" className="opacity-70">
          Your Feedback
        </Label>
        <Textarea
          className="bg-sidebar-accent border border-primary"
          value={feedback}
          placeholder="Type your feedback here."
          id="message"
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <Button
        onClick={async () => {
          const res = await sendFeedback(
            solutionId,
            mark,
            feedback,
            assignmentMark,
          );
          if (res?.success) {
            toast({
              title: "Success",
              description: res.message,
            });
          } else {
            toast({
              title: "Failure",
              description: res.message,
              variant: "destructive",
            });
          }
        }}
      >
        Send Feedback
      </Button>
    </div>
  );
}
