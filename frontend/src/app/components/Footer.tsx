import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
              TextTrack
            </h3>
            <p className="text-sm text-gray-400">
              AI-powered CCTV analysis system using YOLOv26, CLIP, and ByteTrack for intelligent lost item retrieval.
            </p>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="font-semibold mb-3">Technology</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>YOLOv26 Object Detection</li>
              <li>CLIP Text-Image Matching</li>
              <li>ByteTrack Multi-Object Tracking</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © 2026 TextTrack. Advanced multimodal deep learning system for security operations.
        </div>
      </div>
    </footer>
  );
}
