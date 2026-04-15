"use client"

import { useState, useRef, useCallback } from "react"
import { UploadCloud, Plus, Trash2, Sparkles, CheckCircle2, XCircle, ChevronDown, Zap, Scissors } from "lucide-react"

type AiDescStatus = "idle" | "detecting" | "locked"
type ImageScanStatus = "idle" | "scanning" | "authentic" | "blocked"
type HotspotKey = "front" | "back" | "sleeve-left" | "sleeve-right"

interface Variant {
  id: string
  size: string
  color: string
  stock: string
}

const HOTSPOTS: { key: HotspotKey; label: string; x: number; y: number }[] = [
  { key: "front", label: "Front", x: 50, y: 38 },
  { key: "back", label: "Back", x: 50, y: 62 },
  { key: "sleeve-left", label: "Left Sleeve", x: 18, y: 45 },
  { key: "sleeve-right", label: "Right Sleeve", x: 82, y: 45 },
]

const CUSTOMIZATION_RATES = [
  { type: "Embroidery", sizes: [{ size: "Small (5x5cm)", price: 85 }, { size: "Medium (10x10cm)", price: 140 }, { size: "Large (15x15cm)", price: 210 }] },
  { type: "Screen Print", sizes: [{ size: "Small", price: 45 }, { size: "Medium", price: 75 }, { size: "Large", price: 110 }] },
]

function useAiDescription() {
  const [status, setStatus] = useState<AiDescStatus>("idle")
  const [category, setCategory] = useState<string>("")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (text.length < 20) { setStatus("idle"); setCategory(""); return }
    setStatus("detecting")
    timerRef.current = setTimeout(() => {
      if (text.toLowerCase().includes("hoodie") || text.toLowerCase().includes("sweat")) {
        setCategory("Apparel > Hoodie")
      } else if (text.toLowerCase().includes("bag") || text.toLowerCase().includes("tote")) {
        setCategory("Accessories > Bag")
      } else if (text.toLowerCase().includes("shirt") || text.toLowerCase().includes("tee")) {
        setCategory("Apparel > T-Shirt")
      } else if (text.toLowerCase().includes("jacket")) {
        setCategory("Apparel > Jacket")
      } else {
        setCategory("Accessories > General")
      }
      setStatus("locked")
    }, 1800)
  }, [])

  return { status, category, handleChange }
}

function useImageScan() {
  const [status, setStatus] = useState<ImageScanStatus>("idle")
  const [fileName, setFileName] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setFileName(file.name)
    setStatus("scanning")
    const aiKeywords = ["ai", "generated", "midjourney", "dalle", "stable"]
    const isAi = aiKeywords.some((kw) => file.name.toLowerCase().includes(kw))
    setTimeout(() => setStatus(isAi ? "blocked" : "authentic"), 2200)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) handleFile(file)
  }, [handleFile])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  return { status, fileName, inputRef, handleDrop, handleInput }
}

export function AddProductTab() {
  const { status: descStatus, category, handleChange: handleDescChange } = useAiDescription()
  const { status: imgStatus, fileName, inputRef, handleDrop, handleInput } = useImageScan()
  const [variants, setVariants] = useState<Variant[]>([{ id: "v1", size: "M", color: "Black", stock: "" }])
  const [customEnabled, setCustomEnabled] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey | null>(null)
  const [basePrice, setBasePrice] = useState("")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")

  const addVariant = () => {
    setVariants((v) => [...v, { id: `v${Date.now()}`, size: "", color: "", stock: "" }])
  }

  const removeVariant = (id: string) => {
    setVariants((v) => v.filter((x) => x.id !== id))
  }

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setVariants((v) => v.map((x) => x.id === id ? { ...x, [field]: value } : x))
  }

  const isHoodie = category.toLowerCase().includes("hoodie")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Left column — main form */}
      <div className="lg:col-span-2 space-y-5">

        {/* Section: Basic Info */}
        <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 space-y-4">
          <h3 className="font-serif font-semibold text-[#2D2D2D] text-base">Product Information</h3>

          <div>
            <label className="block text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider mb-1.5">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Indigo Washed Hoodie"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#864227]/30 focus:border-[#864227]"
            />
          </div>

          {/* AI Description Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider">Description</label>
              {descStatus === "detecting" && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#864227] animate-pulse">
                  <Sparkles className="w-3 h-3" />
                  AI Detecting Category...
                </span>
              )}
              {descStatus === "locked" && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Category Locked: <strong className="ml-0.5">{category}</strong>
                </span>
              )}
            </div>
            <textarea
              placeholder="Describe your product in detail — fabric, fit, craftsmanship, inspiration. Our AI will auto-detect the category."
              rows={4}
              value={description}
              onChange={(e) => { setDescription(e.target.value); handleDescChange(e.target.value) }}
              className={`
                w-full px-3.5 py-2.5 text-sm bg-[#FAF8F6] border rounded-lg text-[#2D2D2D] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 transition-colors
                ${descStatus === "locked" ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-200" : "border-[#E8E4E0] focus:border-[#BC5439]"}
              `}
            />
            {descStatus === "locked" && (
              <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Automatically assigned to <strong>{category}</strong> based on your description.
              </div>
            )}
          </div>
        </div>

        {/* Section: AI Image Upload */}
        <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 space-y-3">
          <h3 className="font-serif font-semibold text-[#2D2D2D] text-base">Product Photos</h3>
          <p className="text-xs text-gray-500">Our AI scans each image for authenticity. Only original artisan photos are accepted.</p>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 overflow-hidden
              ${imgStatus === "authentic" ? "border-emerald-400 bg-emerald-50/40" :
                imgStatus === "blocked" ? "border-red-400 bg-red-50/40" :
                imgStatus === "scanning" ? "border-[#864227]/50 bg-[#864227]/5" :
                "border-[#E8E4E0] hover:border-[#864227]/40 hover:bg-gray-50"}
            `}
          >
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInput} />

            {/* Scanning laser animation */}
            {imgStatus === "scanning" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#864227] to-transparent animate-[scan_1.2s_ease-in-out_infinite]" />
              </div>
            )}

            {imgStatus === "idle" && (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#E8E4E0] flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#2D2D2D]">Drop images here or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB · AI authenticity check applied</p>
                </div>
              </>
            )}

            {imgStatus === "scanning" && (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#864227]/10 border border-[#864227]/30 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-[#864227] animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-[#864227]">Scanning image...</p>
                <p className="text-xs text-gray-500">{fileName}</p>
                <div className="flex justify-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#864227] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {imgStatus === "authentic" && (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-emerald-700">Verified: Authentic Artisan Photo</p>
                <p className="text-xs text-emerald-600">{fileName}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                  className="text-xs text-emerald-600 hover:underline mt-1"
                >
                  Upload another
                </button>
              </div>
            )}

            {imgStatus === "blocked" && (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-sm font-bold text-red-700">Upload Blocked: AI-Generated Content Detected</p>
                <p className="text-xs text-red-600">Please use original photographs of your product.</p>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                  className="text-xs text-red-600 hover:underline mt-1"
                >
                  Try a different image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section: Pricing & Variants */}
        <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 space-y-4">
          <h3 className="font-serif font-semibold text-[#2D2D2D] text-base">Pricing & Variants</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider mb-1.5">Base Price (EGP)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">EGP</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full pl-12 pr-3.5 py-2.5 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider mb-1.5">SKU / Product Code</label>
              <input
                type="text"
                placeholder="e.g. AS-HDY-001"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439]"
              />
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider">Variants</label>
              <button
                onClick={addVariant}
                className="flex items-center gap-1.5 text-xs text-[#864227] font-medium hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                Add variant
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 px-1">
                {["Size", "Color", "Stock", ""].map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</span>
                ))}
              </div>
              {variants.map((v) => (
                <div key={v.id} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-center">
                  <div className="relative">
                    <select
                      value={v.size}
                      onChange={(e) => updateVariant(v.id, "size", e.target.value)}
                      className="w-full appearance-none px-3 py-2 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439] pr-8"
                    >
                      {["XS", "S", "M", "L", "XL", "XXL", "One Size"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    placeholder="Black"
                    value={v.color}
                    onChange={(e) => updateVariant(v.id, "color", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439]"
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={v.stock}
                    onChange={(e) => updateVariant(v.id, "stock", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439] text-center"
                  />
                  <button
                    onClick={() => removeVariant(v.id)}
                    disabled={variants.length === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove variant"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Customization Engine */}
        <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold text-[#2D2D2D] text-base">Adaptive Customization Engine</h3>
              <p className="text-xs text-gray-500 mt-0.5">Allow customers to request embroidery or prints on specific locations.</p>
            </div>
            <button
              role="switch"
              aria-checked={customEnabled}
              onClick={() => setCustomEnabled((v) => !v)}
              className={`
                relative inline-flex w-10 h-5.5 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30
                ${customEnabled ? "bg-[#864227]" : "bg-[#E8E4E0]"}
              `}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${customEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {customEnabled && (
            <div className="space-y-4 pt-1">
              {isHoodie ? (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    2D Blueprint — {category} &nbsp;<span className="text-[#864227] font-normal normal-case tracking-normal">Click a hotspot to select placement</span>
                  </p>
                  {/* Blueprint SVG */}
                  <div className="relative w-full max-w-xs mx-auto aspect-[3/4] bg-gray-100 rounded-2xl border border-dashed border-[#E8E4E0] flex items-center justify-center">
                    {/* Garment silhouette */}
                    <svg viewBox="0 0 120 160" className="w-full h-full p-6 opacity-30 text-[#2D2D2D]" fill="currentColor" aria-hidden="true">
                      <path d="M30 10 L10 35 L25 38 L25 140 L95 140 L95 38 L110 35 L90 10 L75 20 Q60 28 45 20 Z" />
                      <path d="M10 35 L0 60 L18 63 L25 38 Z M110 35 L120 60 L102 63 L95 38 Z" />
                    </svg>
                    {/* Hotspot buttons */}
                    {HOTSPOTS.map(({ key, label, x, y }) => (
                      <button
                        key={key}
                        title={label}
                        aria-label={`Select ${label} placement`}
                        onClick={() => setActiveHotspot(activeHotspot === key ? null : key)}
                        style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                        className="absolute flex flex-col items-center gap-0.5 z-10 group"
                      >
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${activeHotspot === key
                            ? "bg-[#864227] border-[#864227] text-white scale-125"
                            : "bg-white border-[#864227]/50 text-[#864227] hover:scale-110 hover:border-[#864227]"}
                        `}>
                          <Scissors className="w-2.5 h-2.5" />
                        </div>
                        <span className={`
                          text-[9px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded transition-all
                          ${activeHotspot === key ? "text-[#864227]" : "text-gray-500 group-hover:text-[#2D2D2D]"}
                        `}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {activeHotspot && (
                    <div className="mt-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Placement selected: <strong>{HOTSPOTS.find((h) => h.key === activeHotspot)?.label}</strong>. Customers can choose print or embroidery here.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-3 text-center">
                  Complete the description above so AI can detect the category and enable the 2D Blueprint tool.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pb-2">
          
          <button className="px-6 py-2.5 text-sm font-semibold bg-[#864227] text-white rounded-lg hover:bg-[#6b341f] transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Submit for Review
          </button>
        </div>
      </div>

      {/* Right column — Price Reference sidebar */}
      <div className="space-y-5">
        {/* Customization Rates */}
        <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 sticky top-20">
          <h3 className="font-serif font-semibold text-[#2D2D2D] text-base mb-1">Price Reference</h3>
          <p className="text-xs text-gray-500 mb-4">Fixed system rates for customization services on Brandy.</p>
          <div className="space-y-4">
            {CUSTOMIZATION_RATES.map(({ type, sizes }) => (
              <div key={type}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-[#BC5439]/10 flex items-center justify-center">
                    <Scissors className="w-3 h-3 text-[#864227]" />
                  </div>
                  <p className="text-xs font-bold text-[#2D2D2D]">{type}</p>
                </div>
                <div className="space-y-1.5 pl-7">
                  {sizes.map(({ size, price }) => (
                    <div key={size} className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">{size}</span>
                      <span className="text-[11px] font-semibold text-[#2D2D2D]">EGP {price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8E4E0]">
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Rates are set by Brandy and applied automatically at checkout. No extra configuration required.
            </p>
          </div>
        </div>

        {/* Tips card */}
        <div className="bg-[#BC5439]/5 border border-[#BC5439]/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#864227]" />
            <h4 className="text-xs font-bold text-[#864227] uppercase tracking-wider">AI Review Tips</h4>
          </div>
          <ul className="space-y-2">
            {[
              "Use original photos shot in good lighting.",
              "Avoid watermarks or graphics overlaid on product shots.",
              "Include multiple angles for faster approval.",
              "Write detailed descriptions to improve category accuracy.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-[11px] text-[#2D2D2D]/70 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-[#864227] shrink-0 mt-1.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
