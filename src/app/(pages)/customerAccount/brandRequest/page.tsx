'use client'
import BrandRequestPending from '@/app/_components/customerAccount/brandRequest/BrandRequestPending/BrandRequestPending'
import BrandRequestApproved from '@/app/_components/customerAccount/brandRequest/BrandRequestApproved/BrandRequestApproved'
import BrandRequestRejected from '@/app/_components/customerAccount/brandRequest/BrandRequestRejected/BrandRequestRejected'
import JoinBrandyCard from '@/app/_components/customerAccount/brandRequest/JoinBrandyCard/JoinBrandyCard'
import { useSelector } from 'react-redux'
import { AppState } from '@/app/store/store'

export default function Page() {
  const { requestStatusText, requestDate } = useSelector(
    (appState: AppState) => appState.brandRequest,
  );

  const statusComponents: Record<string, React.ReactNode> = {
    Pending: <BrandRequestPending date={requestDate} />,
    Approved: <BrandRequestApproved />,
    Rejected: <BrandRequestRejected />,
  };

  return (
    <div className='p-8'>
      <div className="mb-10">
        <h2 className="text-5xl font-bold">Join Brandy</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Join Brandy as a brand owner and start selling your products to thousands of customers.
        </p>
      </div>

      {statusComponents[requestStatusText] || <JoinBrandyCard />}
    </div>
  );
}