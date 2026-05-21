import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar1";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CommonLayout;
