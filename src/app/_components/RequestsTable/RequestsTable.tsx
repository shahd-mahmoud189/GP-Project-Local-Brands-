"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptBrand, getPendingRequest, rejectBrand } from "@/app/api/brand-request.api";
import { BrandRequest } from "@/app/types/my-request.type";
import React, { useState } from "react";

export default function RequestsTable() {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<BrandRequest | null>(null);
  const [loadingId, setLoadingId] = useState<{ id: number; action: "accept" | "reject" } | null>(null);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: getPendingRequest,
  });

  const acceptMutation = useMutation({
    mutationFn: (id: number) => acceptBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      setLoadingId(null);
    },
    onError: () => setLoadingId(null),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => rejectBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      setLoadingId(null);
    },
    onError: () => setLoadingId(null),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">Brand Name</th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">Credentials</th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-4 text-center text-stone-900 font-semibold text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {requests.map((request: BrandRequest) => (
                <tr key={request.requestId} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-stone-900 font-semibold">{request.brandName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-stone-700">{request.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-stone-700">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="text-amber-800 underline hover:text-amber-900"
                    >
                      View Credentials
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-stone-500 font-mono">
                    {new Date(request.requestDate).toLocaleDateString("en-GB")}{" "}
                    {new Date(request.requestDate).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setLoadingId({ id: request.requestId, action: "accept" });
                          acceptMutation.mutate(request.requestId);
                        }}
                        disabled={loadingId?.id === request.requestId}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        {loadingId?.id === request.requestId && loadingId?.action === "accept" ? (
                          <i className="fa-solid fa-spinner fa-spin" />
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setLoadingId({ id: request.requestId, action: "reject" });
                          rejectMutation.mutate(request.requestId);
                        }}
                        disabled={loadingId?.id === request.requestId}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        {loadingId?.id === request.requestId && loadingId?.action === "reject" ? (
                          <i className="fa-solid fa-spinner fa-spin" />
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedRequest(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-stone-900">
                  {selectedRequest.brandName} — Credentials
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-stone-400 hover:text-stone-600 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#6B5B54] tracking-wider">
                    Brand Description
                  </label>
                  <p className="text-stone-700 mt-1 leading-relaxed">
                    {selectedRequest.brandDescription}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-[#6B5B54] tracking-wider">
                    Business License
                  </label>
                  <div className="mt-2 w-full h-64 rounded-lg border border-stone-200 overflow-hidden bg-stone-50">
                    <iframe
                      src={`https://graduationprojectclean-production.up.railway.app${selectedRequest.businessLicense}`}
                      className="w-full h-full"
                      title="Business License"
                    />
                  </div>
                  <a
                    href={`https://graduationprojectclean-production.up.railway.app${selectedRequest.businessLicense}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-amber-800 underline hover:text-amber-900 text-sm"
                  >
                    Open in full screen →
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-full mt-6 bg-[#0288D1] hover:bg-[#6d351f] text-white py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}