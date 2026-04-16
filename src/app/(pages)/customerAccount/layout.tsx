import CustomerAside from "@/app/_components/aside/CustomerAside";
import Link from "next/link";
import React from "react";

export default function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex gap-10">
      <CustomerAside/>
      {children}
    </div>
  );
}
