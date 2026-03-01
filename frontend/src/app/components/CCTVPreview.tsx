import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface BoundingBox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  trackingId: string;
  confidence: number;
}

export function CCTVPreview({ isActive }: { isActive: boolean }) {
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Simulate detection of objects
      const mockBoxes: BoundingBox[] = [
        { id: 1, x: 20, y: 30, width: 15, height: 20, label: "Backpack", trackingId: "T001", confidence: 0.94 },
        { id: 2, x: 60, y: 45, width: 12, height: 18, label: "Person", trackingId: "T002", confidence: 0.89 },
      ];
      setBoxes(mockBoxes);
    } else {
      setBoxes([]);
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10">
      {/* Background Image when active */}
      {isActive && (
        <img
          src="https://images.unsplash.com/photo-1665848383782-1ea74efde68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZSUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzcyMjgyMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="CCTV Feed"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scanning Line */}
      {isActive && (
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Video Feed Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500">
            {isActive ? "Processing CCTV Feed..." : "Upload footage to begin analysis"}
          </p>
        </div>
      </div>

      {/* Bounding Boxes */}
      {boxes.map((box) => (
        <motion.div
          key={box.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute border-2 border-[#00d4ff] rounded-lg"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          {/* Label Tag */}
          <div className="absolute -top-8 left-0 px-2 py-1 bg-[#00d4ff] text-black text-xs font-semibold rounded">
            {box.label} #{box.trackingId} ({Math.round(box.confidence * 100)}%)
          </div>
        </motion.div>
      ))}

      {/* Top Bar - Camera Info */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#00d4ff] font-semibold">CAM-01</span>
            <span className="text-gray-400">Main Entrance</span>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
            )}
            <span className="text-gray-400">
              {timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Detection Count */}
      {isActive && boxes.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-4 text-xs">
            <div className="px-3 py-1 rounded bg-[#00d4ff]/20 border border-[#00d4ff]/40 text-[#00d4ff]">
              {boxes.length} Objects Detected
            </div>
            <div className="text-gray-400">YOLOv26 | CLIP | ByteTrack</div>
          </div>
        </div>
      )}
    </div>
  );
}