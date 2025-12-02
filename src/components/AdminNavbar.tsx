"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function AdminNavbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-100 w-full px-6 py-4 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
    >
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Logo */}
        <Link href="/3d/Admin/AdminDashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            FS
          </div>
          <div>
            <div className="font-bold text-xl text-white">Admin Panel</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/3d/Admin/AdminDashboard" className="text-white hover:text-cyan-400 transition-colors font-medium">
            📊 Dashboard
          </Link>
          <Link href="/3d/Admin/UserManagement" className="text-white hover:text-cyan-400 transition-colors font-medium">
            👥 Users
          </Link>
          <Link href="/3d/Admin/CourseManagement" className="text-white hover:text-cyan-400 transition-colors font-medium">
            📚 Courses
          </Link>
          <Link href="/3d/Admin/ContentManagement" className="text-white hover:text-cyan-400 transition-colors font-medium">
            📝 Content
          </Link>
          <Link href="/3d/Admin/EnrollmentManagement" className="text-white hover:text-cyan-400 transition-colors font-medium">
            📋 Enrollments
          </Link>
          <Link href="/3d/Admin/QuizManagement" className="text-white hover:text-cyan-400 transition-colors font-medium">
            ✍️ Quizzes
          </Link>
          <Link href="/3d/Admin/Reports" className="text-white hover:text-cyan-400 transition-colors font-medium">
            📈 Reports
          </Link>
          <Link href="/3d/Admin/Settings" className="text-white hover:text-cyan-400 transition-colors font-medium">
            ⚙️ Settings
          </Link>
        </div>

        {/* User Profile & Logout */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-white font-semibold">Admin</span>
            <span className="text-white">▼</span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-white/10 overflow-hidden"
            >
              <Link href="/3d/Admin/Profile" className="block px-4 py-3 text-white hover:bg-white/10 transition-colors">
                👤 Profile
              </Link>
              <Link href="/3d/Admin/Settings" className="block px-4 py-3 text-white hover:bg-white/10 transition-colors">
                ⚙️ Settings
              </Link>
              <hr className="border-white/10" />
              <Link href="/3d/LogIn" className="block px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
                🚪 Logout
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
