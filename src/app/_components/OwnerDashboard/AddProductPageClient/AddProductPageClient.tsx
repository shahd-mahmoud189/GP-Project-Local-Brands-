"use client";
import { useState } from "react";
import BrandRequestApproved from "@/app/_components/customerAccount/brandRequest/BrandRequestApproved/BrandRequestApproved";
import { AddProductTab } from "../../../_components/OwnerDashboard/AddProduct";

export default function AddProductPageClient({
  hasAcceptedContract,
  contractText,
}: {
  hasAcceptedContract: boolean;
  contractText: string;
}) {
  const [accepted, setAccepted] = useState(hasAcceptedContract);

  return (
    <>
      {!accepted && (
        <BrandRequestApproved
          contractText={contractText}
          onAccepted={() => setAccepted(true)} // ← بيخفي الكارد فوراً
        />
      )}
      <AddProductTab />
    </>
  );
}