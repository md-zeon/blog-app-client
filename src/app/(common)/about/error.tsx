"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AboutError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>{error.message}</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default AboutError;
