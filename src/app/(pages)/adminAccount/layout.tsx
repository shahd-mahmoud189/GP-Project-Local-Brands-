import AdminAside from "@/app/_components/aside/AdminAside";
import React from "react";

export default function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="md:flex gap-10">
      <AdminAside/>
      {children}
    </div>
  );
}
