"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Enhanced 3D Background
function DashboardBackground3D() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={[-6, 2, -4]}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.8}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} position={[5, -2, -3]}>
        <Box args={[1, 1, 1]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.3}
            speed={1.8}
            roughness={0}
            metalness={0.9}
            opacity={0.7}
            transparent
          />
        </Box>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={2} position={[0, 3, -5]}>
        <Torus args={[1.2, 0.4, 16, 32]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.25}
            speed={1.5}
            roughness={0}
            metalness={0.8}
            opacity={0.5}
            transparent
          />
        </Torus>
      </Float>

      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.6} position={[-4, -3, -2]}>
        <Sphere args={[0.6, 32, 32]}>
          <MeshDistortMaterial
            color="#f59e0b"
            attach="material"
            distort={0.35}
            speed={2.2}
            roughness={0}
            metalness={0.8}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Dashboard Statistics
  const stats = [
    { label: "Total Users", value: "200", change: "+12%", icon: "👥", color: "from-cyan-500 to-blue-600" },
    { label: "Active Courses", value: "45", change: "+8%", icon: "📚", color: "from-purple-500 to-pink-600" },
    { label: "Completion Rate", value: "87%", change: "+5%", icon: "🎯", color: "from-green-500 to-emerald-600" },
    { label: "Certificates Issued", value: "156", change: "+15%", icon: "🏆", color: "from-yellow-500 to-orange-600" }
  ];

  // Recent Activity
  const recentActivity = [
    { user: "John Doe", action: "Completed", course: "Web Development", time: "2 hours ago" },
    { user: "Jane Smith", action: "Enrolled in", course: "Data Science", time: "4 hours ago" },
    { user: "Mike Johnson", action: "Started", course: "Mobile Development", time: "5 hours ago" },
    { user: "Sarah Williams", action: "Completed", course: "UI/UX Design", time: "1 day ago" }
  ];

  // Course Performance
  const coursePerformance = [
    { name: "Web Development", enrolled: 45, completed: 38, progress: 84 },
    { name: "Data Science", enrolled: 32, completed: 28, progress: 87 },
    { name: "Mobile Development", enrolled: 28, completed: 22, progress: 79 },
    { name: "UI/UX Design", enrolled: 38, completed: 35, progress: 92 }
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <DashboardBackground3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Welcome back, Admin! Here's your LMS overview
            </p>
          </motion.div>

          {/* Period Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 mb-8"
          >
            {["week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedPeriod === period
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className="text-green-400 font-semibold text-sm">{stat.change}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Course Performance */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">📊</span>
                Course Performance
              </h2>
              <div className="space-y-6">
                {coursePerformance.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                      <span className="text-cyan-400 font-bold text-lg">{course.progress}%</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400 mb-3">
                      <span>👥 {course.enrolled} enrolled</span>
                      <span>✅ {course.completed} completed</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                        className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400">⚡</span>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all border-l-4 border-cyan-500"
                  >
                    <p className="text-white font-semibold mb-1">{activity.user}</p>
                    <p className="text-sm text-gray-400 mb-2">
                      {activity.action} <span className="text-cyan-400">{activity.course}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-green-400">🚀</span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "User Management", icon: "👥", color: "from-cyan-500 to-blue-600", link: "/3d/Admin/UserManagement" },
                { label: "Course Management", icon: "📚", color: "from-purple-500 to-pink-600", link: "/3d/Admin/CourseManagement" },
                { label: "Analytics", icon: "📈", color: "from-green-500 to-emerald-600", link: "/3d/Admin/Analytics" },
                { label: "Certificates", icon: "🏆", color: "from-yellow-500 to-orange-600", link: "/3d/Admin/Certificates" }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-linear-to-br ${action.color} rounded-2xl p-6 text-white font-bold text-center shadow-xl hover:shadow-2xl transition-all`}
                >
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <div className="text-sm">{action.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Management Modules */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Authentication & User Management",
                icon: "🔐",
                features: ["Secure login/logout", "Role-based access", "Password reset", "User import (CSV/Excel)"],
                color: "from-cyan-500 to-blue-600",
                time: "5 days"
              },
              {
                title: "Progress Tracking & Reports",
                icon: "📊",
                features: ["Individual & course progress", "Completion %", "Exportable reports (CSV/PDF)", "Admin analytics"],
                color: "from-purple-500 to-pink-600",
                time: "9 days"
              },
              {
                title: "Notifications & Alerts",
                icon: "🔔",
                features: ["Email reminders", "In-app notifications", "Course/deadline alerts"],
                color: "from-green-500 to-emerald-600",
                time: "4 days"
              },
              {
                title: "Certificate Generation",
                icon: "📜",
                features: ["Auto-generate certificates", "Dynamic details", "Download & email options"],
                color: "from-yellow-500 to-orange-600",
                time: "3 days"
              },
              {
                title: "Quiz & Assessment",
                icon: "✍️",
                features: ["Create quizzes (MCQ, T/F)", "Timed assessments", "Auto grading", "Review/reattempt"],
                color: "from-pink-500 to-rose-600",
                time: "8 days"
              },
              {
                title: "Staff Dashboard",
                icon: "👨‍💼",
                features: ["Personalized course list", "Progress tracker", "Deadline notifications", "Certificates section"],
                color: "from-indigo-500 to-purple-600",
                time: "6 days"
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:bg-white/15 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${module.color} flex items-center justify-center text-4xl mb-4 shadow-lg`}>
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{module.title}</h3>
                <ul className="space-y-2 mb-6">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-400">Est. Development</span>
                  <span className="text-sm font-semibold text-cyan-400">{module.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
