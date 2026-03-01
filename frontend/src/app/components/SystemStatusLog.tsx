import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LogStep {
  id: number;
  label: string;
  status: "pending" | "processing" | "complete";
}

export function SystemStatusLog({ isProcessing }: { isProcessing: boolean }) {
  const [steps, setSteps] = useState<LogStep[]>([
    { id: 1, label: "Frame extraction", status: "pending" },
    { id: 2, label: "YOLO object detection", status: "pending" },
    { id: 3, label: "CLIP text matching", status: "pending" },
    { id: 4, label: "ByteTrack multi-object tracking", status: "pending" },
  ]);

  useEffect(() => {
    if (!isProcessing) {
      setSteps(steps.map(s => ({ ...s, status: "pending" })));
      return;
    }

    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSteps(prev => prev.map((step, idx) => {
          if (idx === i) return { ...step, status: "complete" };
          if (idx === i + 1) return { ...step, status: "processing" };
          return step;
        }));
      }
    };

    processSteps();
  }, [isProcessing]);

  return (
    <div className="mt-6 space-y-3">
      <div className="text-sm text-gray-400 mb-2">System Status</div>
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
            step.status === "complete"
              ? "bg-emerald-500/10 border-emerald-500/30"
              : step.status === "processing"
              ? "bg-[#00d4ff]/10 border-[#00d4ff]/30 pulse-glow"
              : "bg-white/5 border-white/10"
          }`}
        >
          {step.status === "complete" ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : step.status === "processing" ? (
            <Loader2 className="w-5 h-5 text-[#00d4ff] animate-spin" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
          )}
          <span
            className={`text-sm ${
              step.status === "complete"
                ? "text-emerald-400"
                : step.status === "processing"
                ? "text-[#00d4ff]"
                : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
