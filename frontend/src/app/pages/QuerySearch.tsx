import { motion } from "motion/react";
import { ScanSearch, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function QuerySearch() {
  return (
    <div className="min-h-[calc(100vh-80px)] p-4 lg:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Query Results</h1>
          <p className="text-gray-400">
            Results will appear here once the AI model has processed your footage.
          </p>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-12 lg:p-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <ScanSearch className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-gray-300">No Results Yet</h2>
          <p className="text-gray-500 max-w-md mb-2">
            The AI detection model is still being trained. Once integrated, matched objects from your footage will appear here with tracking IDs, confidence scores, camera info, and frame timelines.
          </p>
          <p className="text-xs text-gray-600 mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            YOLOv26 · CLIP · ByteTrack — model integration in progress
          </p>
        </motion.div>
      </div>
    </div>
  );
}
