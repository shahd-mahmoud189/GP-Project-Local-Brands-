// page.tsx
import RequestsTable from "@/app/_components/RequestsTable/RequestsTable";

export default function Page() {
  return (
    <div className="p-4 md:p-8 max-w-full overflow-hidden">
      <div className="mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
          Registration Requests
        </h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Manage brand registration applications.
        </p>
      </div>
      <RequestsTable />
    </div>
  );
}