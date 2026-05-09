'use client';

import { Edit, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { updateMyBrand } from '@/app/api/brand.api';
import { useRouter } from 'next/navigation';

interface EditBrandButtonProps {
  brandId: number;
  initialName: string;
  initialDescription: string;
}

export function EditBrandButton({
  brandId,
  initialName,
  initialDescription,
}: EditBrandButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Brand name is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await updateMyBrand(brandId, { brandName: name, description });
      setOpen(false);
      router.refresh(); // بيعمل re-fetch للـ server component من غير page reload
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-3 sm:px-4 py-2 rounded-full font-semibold transition text-sm sm:text-base"
      >
        <Edit size={18} />
        <span className="hidden sm:inline">Edit</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">Edit Brand</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-500">
                  Brand Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-400 text-sm"
                  placeholder="e.g. Brandy"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-500">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-400 text-sm resize-none"
                  placeholder="Describe your brand..."
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-medium">{error}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}