import { Control, Controller, useWatch } from "react-hook-form";
import { Settings2, Type, ImageIcon, Target } from "lucide-react";
import { CreateProductForm } from "../../../schema/createProductSchema";

const PRINT_AREAS = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "left-sleeve", label: "Left Sleeve" },
  { id: "right-sleeve", label: "Right Sleeve" },
];

interface CustomizationSectionProps {
  control: Control<CreateProductForm>;
  customEnabled: boolean;
  toggleCustomization: (enabled: boolean) => void;
}

export function CustomizationSection({
  control,
  customEnabled,
  toggleCustomization,
}: CustomizationSectionProps) {
  const selectedTypes = useWatch({
    control,
    name: "customization.types",
    defaultValue: [],
  });
  return (
    <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 shadow-sm space-y-4">
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
          className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${customEnabled ? "bg-[#864227]" : "bg-gray-200"}`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${customEnabled ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
      </div>
      {customEnabled && (
        <div className="space-y-6 pt-4 border-t border-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Custom Text */}
            <Controller
              control={control}
              name="customization.types"
              render={({ field }) => {
                const selected = field.value || [];
                return (
                  <label
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${selected.includes("text") ? "border-[#864227] bg-[#864227]/5" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${selected.includes("text") ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <Type className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-sm font-bold">Custom Text</div>
                    <input
                      type="checkbox"
                      checked={selected.includes("text")}
                      onChange={(e) => {
                        if (e.target.checked)
                          field.onChange([...selected, "text"]);
                        else
                          field.onChange(selected.filter((t) => t !== "text"));
                      }}
                      className="accent-[#864227]"
                    />
                  </label>
                );
              }}
            />

            {/* Custom Photo */}
            <Controller
              control={control}
              name="customization.types"
              render={({ field }) => {
                const selected = field.value || [];
                return (
                  <label
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${selected.includes("photo") ? "border-[#864227] bg-[#864227]/5" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${selected.includes("photo") ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-sm font-bold">Custom Photo</div>
                    <input
                      type="checkbox"
                      checked={selected.includes("photo")}
                      onChange={(e) => {
                        if (e.target.checked)
                          field.onChange([...selected, "photo"]);
                        else
                          field.onChange(selected.filter((t) => t !== "photo"));
                      }}
                      className="accent-[#864227]"
                    />
                  </label>
                );
              }}
            />
          </div>

          <Controller
            control={control}
            name="customization.areas"
            render={({ field }) => (
              <div className="p-4 bg-[#FAF8F6] rounded-xl border border-[#E8E4E0] space-y-3">
                <p className="text-[10px] font-bold text-[#864227] uppercase flex items-center gap-2">
                  <Target className="w-3 h-3" /> Select Print Areas:
                </p>
                <div className="flex flex-wrap gap-3">
                  {PRINT_AREAS.map((area) => (
                    <label
                      key={area.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        value={area.id}
                        checked={(field.value || []).includes(area.id)}
                        onChange={(e) => {
                          const current = field.value || [];
                          if (e.target.checked)
                            field.onChange([...current, area.id]);
                          else
                            field.onChange(
                              current.filter((a) => a !== area.id),
                            );
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#864227] focus:ring-[#864227] accent-[#864227]"
                      />
                      <span
                        className={`text-xs font-medium ${(field.value || []).includes(area.id) ? "text-[#2D2D2D]" : "text-gray-400"}`}
                      >
                        {area.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
