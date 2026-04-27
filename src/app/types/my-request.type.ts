export type BrandRequest = {
    requestId: number;
    userId: number;
    userName: string;
    userEmail: string;
    businessName: string;
    businessLicense: string;
    brandName: string;
    brandDescription: string;
    brandLogoUrl: string;
    createdBrandId: number | null;
    requestStatus: number;
    requestStatusText: "Pending" | "Approved" | "Rejected" | string;
    requestDate: string;
    reviewedBy: number | string | null;
    reviewerName: string | null;
    reviewDate: string | null;
}

export type PendingRequests = BrandRequest[];