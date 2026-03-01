import { Link, useLocation } from "react-router";
import { ScanEye } from "lucide-react";
import { motion } from "motion/react";

export function Navigation() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Upload Footage" },
    { path: "/results", label: "Query Results" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <nav className="glass-panel-strong border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* not final logo*/} 
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center glow-blue">
              <ScanEye className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
              TextTrack
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 rounded-lg transition-colors"
                >
                  <span className={isActive ? "text-[#00d4ff]" : "text-gray-400 hover:text-white"}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff]"
                    : "bg-white/5 text-gray-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
