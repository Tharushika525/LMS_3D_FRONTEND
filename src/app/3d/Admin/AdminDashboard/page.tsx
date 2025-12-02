"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";

// Enhanced 3D Background with Amazing Floating Blobs
function DashboardBackground3D() {
  return (
    <>
      {/* Large Cyan Blob - Top Left */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2} position={[-8, 4, -6]}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.6}
            speed={1.8}
            roughness={0.1}
            metalness={0.9}
            opacity={0.7}
            transparent
          />
        </Sphere>
      </Float>

      {/* Medium Purple Blob - Right Side */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={2.5} position={[7, -1, -5]}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={2.2}
            roughness={0.1}
            metalness={1}
            opacity={0.8}
            transparent
          />
        </Sphere>
      </Float>

      {/* Green Blob - Top Center */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={3} position={[0, 5, -7]}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.7}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>

      {/* Orange Blob - Bottom Left */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.2} position={[-5, -4, -4]}>
        <Sphere args={[0.9, 64, 64]}>
          <MeshDistortMaterial
            color="#f59e0b"
            attach="material"
            distort={0.55}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            opacity={0.75}
            transparent
          />
        </Sphere>
      </Float>

      {/* Pink Blob - Center Right */}
      <Float speed={1.4} rotationIntensity={1.3} floatIntensity={2.8} position={[6, 2, -6]}>
        <Sphere args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.65}
            speed={1.9}
            roughness={0.15}
            metalness={0.95}
            opacity={0.7}
            transparent
          />
        </Sphere>
      </Float>

      {/* Small Blue Blob - Bottom Right */}
      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={3.2} position={[4, -5, -3]}>
        <Sphere args={[0.7, 64, 64]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.8}
            speed={2.8}
            roughness={0.1}
            metalness={1}
            opacity={0.8}
            transparent
          />
        </Sphere>
      </Float>

      {/* Ambient floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={Math.random() * 2}
          floatIntensity={2 + Math.random() * 2}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            -3 - Math.random() * 8
          ]}
        >
          <Sphere args={[0.1 + Math.random() * 0.2, 16, 16]}>
            <meshStandardMaterial
              color={`hsl(${Math.random() * 360}, 70%, 60%)`}
              emissive={`hsl(${Math.random() * 360}, 70%, 50%)`}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              opacity={0.4}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

export default function AdminDashboard() {
  // System Overview Stats
  const systemStats = [
    { label: "Total Students", value: "2,487", change: "+12%", icon: "🎓", color: "from-blue-500 to-cyan-600" },
    { label: "Total Trainers", value: "124", change: "+8%", icon: "👨‍🏫", color: "from-purple-500 to-pink-600" },
    { label: "Active Courses", value: "68", change: "+15%", icon: "📚", color: "from-green-500 to-emerald-600" },
    { label: "Total Revenue", value: "$48,500", change: "+23%", icon: "💰", color: "from-yellow-500 to-orange-600" },
    { label: "New Enrollments", value: "342", change: "+18%", icon: "📝", color: "from-pink-500 to-rose-600" },
    { label: "Completion Rate", value: "87%", change: "+5%", icon: "✅", color: "from-teal-500 to-cyan-600" }
  ];

  // Recent Activity
  const recentActivities = [
    { user: "John Smith", action: "Enrolled in", item: "Advanced React Course", time: "5 mins ago", icon: "📝" },
    { user: "Sarah Johnson", action: "Completed", item: "UI/UX Design Fundamentals", time: "12 mins ago", icon: "✅" },
    { user: "Mike Wilson", action: "Submitted assignment for", item: "JavaScript Basics", time: "30 mins ago", icon: "📄" },
    { user: "Emily Davis", action: "Started", item: "Python for Data Science", time: "1 hour ago", icon: "🚀" },
    { user: "Alex Brown", action: "Passed quiz in", item: "Database Management", time: "2 hours ago", icon: "✍️" }
  ];

  // Upcoming Sessions
  const upcomingSessions = [
    { title: "React Advanced Patterns", trainer: "Dr. James Wilson", date: "Dec 3, 2025", time: "10:00 AM", students: 45 },
    { title: "Python Machine Learning", trainer: "Prof. Sarah Chen", date: "Dec 3, 2025", time: "2:00 PM", students: 38 },
    { title: "Database Design Workshop", trainer: "Mike Johnson", date: "Dec 4, 2025", time: "11:00 AM", students: 52 },
    { title: "UI/UX Masterclass", trainer: "Emma Davis", date: "Dec 4, 2025", time: "3:00 PM", students: 41 }
  ];

  // Course Categories Performance
  const categoryData = [
    { name: "Web Development", courses: 24, students: 856, completion: 85, color: "bg-blue-500" },
    { name: "Data Science", courses: 18, students: 624, completion: 82, color: "bg-purple-500" },
    { name: "Design", courses: 12, students: 445, completion: 88, color: "bg-pink-500" },
    { name: "Mobile Development", courses: 10, students: 382, completion: 79, color: "bg-green-500" },
    { name: "Cloud Computing", courses: 8, students: 298, completion: 91, color: "bg-cyan-500" }
  ];

  // Quick Action Cards
  const quickActions = [
    { title: "User Management", desc: "Manage students, trainers & admins", icon: "👥", link: "/3d/Admin/UserManagement", color: "from-blue-500 to-cyan-600" },
    { title: "Course Management", desc: "Create & manage courses", icon: "📚", link: "/3d/Admin/CourseManagement", color: "from-purple-500 to-pink-600" },
    { title: "Content Builder", desc: "Add lessons, videos & quizzes", icon: "📝", link: "/3d/Admin/ContentManagement", color: "from-green-500 to-emerald-600" },
    { title: "Enrollments", desc: "Manage student enrollments", icon: "📋", link: "/3d/Admin/EnrollmentManagement", color: "from-orange-500 to-red-600" },
    { title: "Quiz Management", desc: "Create quizzes & assignments", icon: "✍️", link: "/3d/Admin/QuizManagement", color: "from-pink-500 to-rose-600" },
    { title: "Reviews & Feedback", desc: "Moderate course reviews", icon: "⭐", link: "/3d/Admin/Reviews", color: "from-yellow-500 to-orange-600" },
    { title: "Reports", desc: "View analytics & reports", icon: "📈", link: "/3d/Admin/Reports", color: "from-teal-500 to-cyan-600" },
    { title: "Settings", desc: "System & payment settings", icon: "⚙️", link: "/3d/Admin/Settings", color: "from-indigo-500 to-purple-600" }
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#10b981" />
          <DashboardBackground3D />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Navigation */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Welcome, Admin! Here's your LMS overview.
            </p>
          </motion.div>

          {/* System Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {systemStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-4xl shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-semibold text-green-400">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.link}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-linear-to-br ${action.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                  >
                    <div className="text-5xl mb-4">{action.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                    <p className="text-sm text-white/80">{action.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">⚡</span>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{activity.user}</p>
                      <p className="text-sm text-gray-400">
                        {activity.action} <span className="text-cyan-400">{activity.item}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-orange-400">📅</span>
                Upcoming Sessions
              </h2>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all border-l-4 border-orange-500"
                  >
                    <h4 className="text-white font-bold mb-2">{session.title}</h4>
                    <p className="text-sm text-gray-400 mb-1">👨‍🏫 {session.trainer}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      📅 {session.date} • 🕐 {session.time}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                        👥 {session.students} students
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Analytics Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Course Categories Performance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400">📊</span>
                Course Categories
              </h2>
              <div className="space-y-6">
                {categoryData.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <span className="text-cyan-400 font-bold">{category.completion}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-3">
                      <span>📚 {category.courses} courses</span>
                      <span>👥 {category.students} students</span>
                      <span>✅ {category.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.completion}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                        className={`h-full ${category.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enrollment Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📈</span>
                Enrollment Trends
              </h2>
              <div className="h-64 flex items-end justify-between gap-3">
                {[65, 82, 74, 91, 88, 95, 78, 85, 92, 87, 96, 89].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.8, delay: 1.1 + index * 0.05 }}
                    className="flex-1 bg-linear-to-t from-cyan-500 to-blue-500 rounded-t-lg"
                    style={{ minHeight: '20px' }}
                  ></motion.div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-3 mt-4 text-xs text-gray-400 text-center">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                  <span key={idx}>{month}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
