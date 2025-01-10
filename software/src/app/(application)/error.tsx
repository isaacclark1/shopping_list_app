"use client";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col gap-y-5 items-center">
      <h2 className="text-red-600 text-3xl">Something went wrong! 😮</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

export default Error;
