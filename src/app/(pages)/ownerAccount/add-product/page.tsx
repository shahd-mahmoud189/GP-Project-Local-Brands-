import AddProductPageClient from "@/app/_components/OwnerDashboard/AddProductPageClient/AddProductPageClient";
import { getContract, getContractStatus } from "@/app/api/serverFunction/serverFunctions.api";

export default async function AddProductPage() {
  const status = await getContractStatus();
  const contract = await getContract();

  return (
    <AddProductPageClient
      hasAcceptedContract={status.hasAcceptedContract}
      contractText={contract.contractText}
    />
  );
}