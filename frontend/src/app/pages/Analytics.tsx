import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";

export function Analytics() {
  return (
    <div className="min-h-[calc(100vh-80px)] p-4 lg:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Performance Analytics</h1>
          <p className="text-gray-400">
            System evaluation metrics based on ISO 25010 standards
          </p>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-12 lg:p-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <BarChart3 className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-gray-300">No Metrics Available</h2>
          <p className="text-gray-500 max-w-md">
            Performance data will be displayed here once the models are trained and the system has processed real footage. Metrics will include YOLO precision and recall, CLIP accuracy, ByteTrack MOTA, and overall system statistics.
          </p>
          <p className="text-xs text-gray-600 mt-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            ISO 25010 evaluation — pending model integration
          </p>
        </motion.div>
      </div>
    </div>
  );
}
