"use client";

import { useState, useCallback } from "react";
import { X, FileText, Sparkles, Loader2, Building2, User, Hash, CreditCard, Package, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SlimScrollArea } from "@/components/ui/SlimScrollArea";

interface InvoiceExtractDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExtractionStatus = "idle" | "loading" | "done" | "error";
type ActiveTab = "invoice" | "extracted";

interface LineItem {
  description: string;
  quantity: number;
  rate: string;
  amount: string;
}

interface InvoiceData {
  vendor: { name: string; address: string; email: string; phone: string; gstin: string };
  billed_to: { name: string; address: string; email: string };
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  payment_status: string;
  line_items: LineItem[];
  subtotal: string;
  tax: string;
  discount: string;
  total_due: string;
  payment_terms: string;
  bank: { bank_name: string; account_name: string; account_number: string; ifsc: string };
}

function FieldRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-3 py-2 border-b border-white/5 last:border-0">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider shrink-0 w-28">{label}</span>
      <span className={`text-xs text-right font-medium ${highlight ? "text-cyan-400" : "text-gray-200"}`}>{value}</span>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/8 rounded-xl p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function ExtractionPanel({ status, data, error }: { status: ExtractionStatus; data: InvoiceData | null; error: string | null }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Extracted Data</span>
        {status === "done" && (
          <span className="text-[9px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Extraction complete
          </span>
        )}
      </div>

      {status === "idle" && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm font-medium mb-1">Ready to extract</p>
            <p className="text-gray-600 text-xs max-w-48">Click the button below. AI will read the invoice and return structured data.</p>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-violet-400 animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm font-medium mb-1">Analyzing invoice...</p>
            <p className="text-gray-600 text-xs">Gemini Vision is reading every field</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-red-400 text-sm">Extraction failed</p>
          <p className="text-gray-600 text-xs">{error}</p>
        </div>
      )}

      {status === "done" && data && (
        <div>
          <Section icon={Building2} title="Vendor">
            <FieldRow label="Company" value={data.vendor.name} />
            <FieldRow label="Address" value={data.vendor.address} />
            <FieldRow label="Email" value={data.vendor.email} />
            <FieldRow label="Phone" value={data.vendor.phone} />
            <FieldRow label="GSTIN" value={data.vendor.gstin} />
          </Section>

          <Section icon={User} title="Billed To">
            <FieldRow label="Company" value={data.billed_to.name} />
            <FieldRow label="Address" value={data.billed_to.address} />
            <FieldRow label="Email" value={data.billed_to.email} />
          </Section>

          <Section icon={Hash} title="Invoice Details">
            <FieldRow label="Number" value={data.invoice_number} />
            <FieldRow label="Date" value={data.invoice_date} />
            <FieldRow label="Due Date" value={data.due_date} />
            <FieldRow label="Status" value={data.payment_status} highlight />
            <FieldRow label="Terms" value={data.payment_terms} />
          </Section>

          <Section icon={Package} title="Line Items">
            {data.line_items.map((item, i) => (
              <div key={i} className="py-2 border-b border-white/5 last:border-0">
                <p className="text-xs text-gray-200 font-medium mb-1">{item.description}</p>
                <div className="flex gap-4 text-[10px] text-gray-500">
                  <span>Qty: {item.quantity}</span>
                  <span>Rate: {item.rate}</span>
                  <span className="text-cyan-400 font-medium">Amount: {item.amount}</span>
                </div>
              </div>
            ))}
          </Section>

          <Section icon={CreditCard} title="Financials">
            <FieldRow label="Subtotal" value={data.subtotal} />
            <FieldRow label="Tax (GST)" value={data.tax} />
            <FieldRow label="Discount" value={data.discount} />
            <FieldRow label="Total Due" value={data.total_due} highlight />
          </Section>

          <Section icon={Banknote} title="Payment Info">
            <FieldRow label="Bank" value={data.bank.bank_name} />
            <FieldRow label="Account" value={data.bank.account_name} />
            <FieldRow label="Acc No." value={data.bank.account_number} />
            <FieldRow label="IFSC" value={data.bank.ifsc} />
          </Section>
        </div>
      )}
    </>
  );
}

export function InvoiceExtractDemo({ isOpen, onClose }: InvoiceExtractDemoProps) {
  const [status, setStatus] = useState<ExtractionStatus>("idle");
  const [data, setData] = useState<InvoiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("invoice");

  const handleExtract = useCallback(async () => {
    setStatus("loading");
    setData(null);
    setError(null);

    try {
      const res = await fetch("/api/extract-invoice", { method: "POST" });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setData(json.data);
      setStatus("done");
      setActiveTab("extracted"); // auto-switch on mobile
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
      setStatus("error");
      setActiveTab("extracted"); // show error tab
    }
  }, []);

  const handleClose = useCallback(() => {
    setStatus("idle");
    setData(null);
    setError(null);
    setActiveTab("invoice");
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">Invoice Data Extraction</h3>
                  <p className="text-gray-500 text-[11px] md:text-xs hidden sm:block">AI reads any invoice and extracts structured data instantly</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Mobile tab bar — hidden on md+ */}
            <div className="flex md:hidden shrink-0 border-b border-white/5 px-4 pt-3 gap-1 bg-white/[0.01]">
              <button
                onClick={() => setActiveTab("invoice")}
                className={`relative flex-1 pb-3 text-xs font-semibold transition-colors ${
                  activeTab === "invoice" ? "text-violet-400" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Invoice
                {activeTab === "invoice" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("extracted")}
                className={`relative flex-1 pb-3 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === "extracted" ? "text-violet-400" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Extracted
                {status === "done" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                )}
                {status === "loading" && (
                  <Loader2 className="w-3 h-3 animate-spin text-violet-400" />
                )}
                {activeTab === "extracted" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400 rounded-full" />
                )}
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

              {/* ── MOBILE: single-panel tab view ── */}
              {/* Invoice tab panel */}
              <SlimScrollArea className={`${activeTab === "invoice" ? "flex" : "hidden"} md:hidden flex-col w-full p-4`}>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
                  <img src="/invoice-demo.svg" alt="Sample invoice" className="w-full h-auto" />
                </div>
              </SlimScrollArea>

              {/* Extracted tab panel */}
              <SlimScrollArea className={`${activeTab === "extracted" ? "flex" : "hidden"} md:hidden flex-col w-full p-4`}>
                <ExtractionPanel status={status} data={data} error={error} />
              </SlimScrollArea>

              {/* ── DESKTOP: side-by-side ── */}
              {/* Left — Invoice preview */}
              <SlimScrollArea className="hidden md:block w-1/2 shrink-0 border-r border-white/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Invoice Preview</span>
                  <span className="text-[9px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">Sample Invoice</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
                  <img src="/invoice-demo.svg" alt="Sample invoice" className="w-full h-auto" />
                </div>
              </SlimScrollArea>

              {/* Right — Extraction panel */}
              <SlimScrollArea className="hidden md:block flex-1 p-5">
                <ExtractionPanel status={status} data={data} error={error} />
              </SlimScrollArea>
            </div>

            {/* Footer + CTA */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0 gap-3">
              <p className="text-gray-600 text-[10px] md:text-[11px] hidden sm:block">
                Powered by Gemini Vision · Works with PDFs, images, and scanned docs
              </p>
              <button
                onClick={handleExtract}
                disabled={status === "loading"}
                className="ml-auto flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait disabled:hover:scale-100"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {status === "done" ? "Extract Again" : "Extract Data"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
