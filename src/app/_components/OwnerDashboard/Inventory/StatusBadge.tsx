"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ProductStatus, STATUS_BADGE, STATUS_DOT } from "./inventory.types";

export function StatusBadge({
    status,
    rejectReason,
    size = "md",
}: {
    status: ProductStatus;
    rejectReason?: string;
    size?: "sm" | "md";
}) {
    const [show, setShow] = useState(false);

    return (
        <div className="flex items-center gap-1.5">
            <span
                className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${STATUS_BADGE[status]
                    } ${size === "sm"
                        ? "text-[10px] px-2 py-0.5"
                        : "text-[11px] px-2.5 py-1"
                    }`}
            >
                <span
                    className={`rounded-full shrink-0 ${STATUS_DOT[status]} ${size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5"
                        }`}
                />
                {status}
            </span>
            {status === "Rejected" && rejectReason && (
                <div className="relative">
                    <button
                        type="button"
                        aria-label="View rejection reason"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow((s) => !s);
                        }}
                        className="text-red-400 hover:text-red-600 transition-colors"
                    >
                        <Info className="w-3.5 h-3.5" />
                    </button>
                    {show && (
                        <div className="absolute right-0 sm:left-full sm:ml-2 top-full sm:top-1/2 mt-2 sm:mt-0 sm:-translate-y-1/2 z-[100] w-56 rounded-lg border border-red-200 bg-red-50 p-3 shadow-lg">
                            <p className="text-[11px] text-red-700 leading-relaxed">
                                {rejectReason}
                            </p>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShow(false);
                                }}
                                className="text-[10px] text-red-500 mt-1.5 font-medium hover:underline"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
