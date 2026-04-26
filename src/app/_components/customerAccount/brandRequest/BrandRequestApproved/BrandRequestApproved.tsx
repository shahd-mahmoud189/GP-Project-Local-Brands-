
export default function BrandRequestApproved() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-green-500 text-3xl">
            <i className='fa-regular fa-check-circle'></i>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-500 mt-1">
              Your brand has been approved. You can start selling now.
            </p>
          </div>
        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Approved
        </span>
      </div>

      <div className="mt-6 border rounded-xl p-4">
        <h4 className="font-semibold mb-2">What you can do now</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✔ Add your products</li>
          <li>✔ Manage your store</li>
          <li>✔ Track your orders and earnings</li>
        </ul>
      </div>
    </div>
  );
}