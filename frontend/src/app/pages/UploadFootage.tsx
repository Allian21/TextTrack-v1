import { useState } from "react";
import { motion } from "motion/react";
import { Upload, FileVideo, X, CheckCircle2, Film, Search, AlertCircle } from "lucide-react";
import { SystemStatusLog } from "../components/SystemStatusLog";
import { useNavigate } from "react-router";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "queued" | "complete";
}

export function UploadFootage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const hasFiles = files.length > 0;

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("video/")
    );
    addFiles(dropped);
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    addFiles(selected);
  };

  const addFiles = (newFiles: File[]) => {
    const mapped: UploadedFile[] = newFiles.map((f) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: formatSize(f.size),
      status: "queued",
    }));
    setFiles((prev) => [...prev, ...mapped]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAnalyze = () => {
    if (!description.trim() || !hasFiles) return;
    setIsAnalyzing(true);
    // Navigate to results after the status log animation completes
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/results");
    }, 6500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 lg:p-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Upload CCTV Footage</h1>
          <p className="text-gray-400">
            Upload your video footage and describe the lost item for AI-powered analysis
          </p>
        </motion.div>

        {/* Notice banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 mb-6"
        >
          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-300">
            The AI model is currently in the fine-tuning phase. File uploads and analysis are not yet connected to a live backend — this interface is a UI preview only.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-8 lg:p-12 mb-6"
        >
          <label
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 lg:p-16 transition-all cursor-pointer flex flex-col items-center justify-center ${
              isDragging
                ? "border-[#00d4ff] bg-[#00d4ff]/5 scale-[1.02]"
                : "border-white/20 hover:border-white/30 hover:bg-white/5"
            }`}
          >
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleBrowse}
            />
            <motion.div
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center glow-blue"
            >
              <Upload className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-center">
              {isDragging ? "Drop files here" : "Drop video files or click to browse"}
            </h3>
            <p className="text-gray-400 mb-4 text-center">
              Supports MP4, AVI, MOV, MKV (Max N GB per file)
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4" />
                <span>Multiple files</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <FileVideo className="w-4 h-4" />
                <span>Batch processing</span>
              </div>
            </div>
          </label>
        </motion.div>

        {/* File List */}
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-6 mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">
              Selected Files ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 border border-white/10 rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                    <FileVideo className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-400">{file.size}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Queued</span>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Describe Lost Item */}
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[#00d4ff]" />
              <h3 className="text-xl font-semibold">Describe the Lost Item</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Use natural language to describe what you're looking for. Be as specific as possible — include color, shape, size, and any distinctive features.
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A black backpack with red straps, left near the main entrance around 2pm..."
              rows={4}
              className="w-full px-4 py-3 bg-[#1a1f2e] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all resize-none"
            />

            <button
              onClick={handleAnalyze}
              disabled={!description.trim() || isAnalyzing}
              className="w-full mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isAnalyzing ? "Analyzing Footage..." : "Analyze with AI"}
            </button>

            {isAnalyzing && (
              <div className="mt-4">
                <SystemStatusLog isProcessing={isAnalyzing} />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
