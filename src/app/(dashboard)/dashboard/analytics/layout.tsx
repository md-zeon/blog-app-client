import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Analytics Layout</h1>
      <div>
        <Button asChild>
          <Link href="/dashboard/analytics/weekly">Weekly Analytics</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/analytics/monthly">Monthly Analytics</Link>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AnalyticsLayout;
