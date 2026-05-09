import { Control, Controller, useWatch } from "react-hook-form";
import { Settings2, Type, ImageIcon, Target } from "lucide-react";
import { ProductFormValues } from "@/app/schema/createProductSchema";

const ZONES = [
  { id: 1, label: "Front" },
  { id: 2, label: "Back" },
  { id: 3, label: "Left Sleeve" },
  { id: 4, label: "Right Sleeve" },
] as const;

interface CustomizationSectionProps {
  control: Control<ProductFormValues>;
  customEnabled: boolean;
  toggleCustomization: (enabled: boolean) => void;
}

export function CustomizationSection({
  control,
  customEnabled,
  toggleCustomization,
}: CustomizationSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${customEnabled ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"}`}
          >
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2D2D2D]">Customer Customization</h3>
            <p className="text-xs text-gray-400">
              Define what customers can personalize.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleCustomization(!customEnabled)}
          className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
            customEnabled ? "bg-[#864227]" : "bg-gray-200"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${
              customEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {customEnabled && (
        <div className="space-y-6 pt-4 border-t border-gray-50">
          {/* AllowsText + AllowsPrinting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="Customization.AllowsText"
              render={({ field }) => (
                <label
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    field.value
                      ? "border-[#864227] bg-[#864227]/5"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      field.value ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Type className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-sm font-bold">Custom Text</div>
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="accent-[#864227]"
                  />
                </label>
              )}
            />

            <Controller
              control={control}
              name="Customization.AllowsPrinting"
              render={({ field }) => (
                <label
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    field.value
                      ? "border-[#864227] bg-[#864227]/5"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      field.value ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-sm font-bold">Custom Printing</div>
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="accent-[#864227]"
                  />
                </label>
              )}
            />
          </div>

          {/* Zones */}
          <Controller
            control={control}
            name="Customization.Zones"
            render={({ field }) => {
              const selected: number[] = field.value || [];
              return (
                <div className="p-4 bg-[#FAF8F6] rounded-xl border border-[#E8E4E0] space-y-3">
                  <p className="text-[10px] font-bold text-[#864227] uppercase flex items-center gap-2">
                    <Target className="w-3 h-3" /> Select Print Zones:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {ZONES.map((zone) => (
                      <label
                        key={zone.id}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(zone.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...selected, zone.id]);
                            } else {
                              field.onChange(selected.filter((z) => z !== zone.id));
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 accent-[#864227]"
                        />
                        <span
                          className={`text-xs font-medium ${
                            selected.includes(zone.id) ? "text-[#2D2D2D]" : "text-gray-400"
                          }`}
                        >
                          {zone.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}