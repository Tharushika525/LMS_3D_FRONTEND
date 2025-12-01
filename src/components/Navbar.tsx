"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 bg-gray-900/95 backdrop-blur-sm shadow-lg"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            FS
          </div>
          <div>
            <div className="font-bold text-xl text-white">FutureSkills</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-cyan-400 transition-colors">HOME</Link>
          <Link href="/3d/About" className="text-white hover:text-cyan-400 transition-colors">ABOUT</Link>
          <a href="/#modules" className="text-white hover:text-cyan-400 transition-colors cursor-pointer">COURSES</a>
          <a href="/#features" className="text-white hover:text-cyan-400 transition-colors cursor-pointer">FEATURES</a>
          <Link href="/3d/Contact" className="text-white hover:text-cyan-400 transition-colors">CONTACT</Link>
          <Link href="/3d/LogIn">
            <button className="px-5 py-2 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-all">
              Login
            </button>
          </Link>
          <Link href="/3d/SignUp">
            <button className="px-5 py-2 rounded bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
