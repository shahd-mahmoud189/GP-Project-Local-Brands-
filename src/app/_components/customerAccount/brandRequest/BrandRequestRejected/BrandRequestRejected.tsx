import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

export default function BrandRequestRejected() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-red-500 text-3xl">
            <i className='fa-regular fa-xmark-circle'></i>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Your request was not approved
            </h3>
            <p className="text-gray-500 mt-1">
              Your application did not meet our current requirements.
            </p>

            <Link href={'/request-brand'} className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl">
              Apply Again
            </Link>
          </div>
        </div>

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          Rejected
        </span>
      </div>

      <div className="mt-6 border border-red-100 rounded-xl p-4 bg-red-50">
        <h4 className="font-semibold text-red-600">Why was my request rejected?</h4>
        <p className="text-sm text-gray-600 mt-2">
          Your application did not meet our current requirements. Please review guidelines.
        </p>

        <button className="mt-3 text-sm text-red-600 underline">
          View Guidelines →
        </button>
      </div>
    </div>
  );
}