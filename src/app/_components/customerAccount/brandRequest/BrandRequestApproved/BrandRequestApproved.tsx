"use client";
import AcceptContractButton from "@/app/_components/AcceptContractButton/AcceptContractButton";

export default function BrandRequestApproved({
  contractText,
  onAccepted,
}: {
  contractText: string;
  onAccepted: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
      <div className="bg-green-50 border-b border-stone-200 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 sm:gap-4">
            <div className="text-green-600 text-2xl sm:text-3xl flex-shrink-0">
              <i className="fa-regular fa-check-circle"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">Congratulations!</h3>
              <p className="text-stone-600 text-sm sm:text-base mt-1">
                Your brand has been approved. Please review and accept the terms to start selling.
              </p>
            </div>
          </div>
          <span className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0">
            Approved
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h4 className="text-base sm:text-lg font-bold text-stone-900 mb-4">Platform Terms & Conditions</h4>
        <div className="bg-stone-50 rounded-lg p-4 sm:p-6 border border-stone-200 mb-6 max-h-96 overflow-y-auto">
          <div className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
            {contractText}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <AcceptContractButton onAccepted={onAccepted} />
        </div>
      </div>
    </div>
  );
}