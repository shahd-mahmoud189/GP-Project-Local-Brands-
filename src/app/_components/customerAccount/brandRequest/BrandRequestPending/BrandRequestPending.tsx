import React from "react";

export default function BrandRequestPending({ date }: { date: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-[#EC8E07] text-3xl">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Your request is under review
            </h3>
            <p className="text-gray-500 mt-1">
              Thanks for applying! We’re reviewing your information.
            </p>
            <p className="text-sm text-gray-400 mt-2" suppressHydrationWarning>
              Submitted on: {new Date(date).toLocaleDateString("en-GB")}{" "}
              {new Date(date).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <span className="bg-[#FEF4E2] text-[#EC8E07] px-3 py-1 rounded-full text-sm">
          Pending
        </span>
      </div>
    </div>
  );
}
