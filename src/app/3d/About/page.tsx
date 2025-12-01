"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Torus, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * About Page - LMS Platform Information
 * Showcases project details, features, and development timeline
 */

/* -------------------- 3D Components -------------------- */

// Animated Floating Cube
function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </Box>
    </Float>
  );
}

// Advanced 3D Background Elements for CTA
function CTABackground3D() {
  return (
    <>
      {/* Floating Spheres */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -3]}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[4, -1, -3]}>
        <Sphere args={[0.7, 32, 32]}>
          <MeshDistortMaterial
            color="#60a5fa"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
            opacity={0.5}
            transparent
          />
        </Sphere>
      </Float>

      {/* Rotating Torus */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} position={[0, 0, -4]}>
        <Torus args={[1, 0.3, 16, 32]}>
          <MeshDistortMaterial
            color="#fbbf24"
            attach="material"
            distort={0.2}
            speed={1.8}
            roughness={0}
            opacity={0.4}
            transparent
          />
        </Torus>
      </Float>

      {/* Floating Boxes */}
      <Float speed={2.2} rotationIntensity={1.5} floatIntensity={2} position={[-3, -2, -2]}>
        <Box args={[0.8, 0.8, 0.8]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.25}
            speed={2}
            roughness={0}
            opacity={0.5}
            transparent
          />
        </Box>
      </Float>

      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.6} position={[3, 2, -2]}>
        <Box args={[0.6, 0.6, 0.6]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.3}
            speed={1.6}
            roughness={0}
            opacity={0.5}
            transparent
          />
        </Box>
      </Float>
    </>
  );
}

// Feature Module Interface
interface FeatureModule {
  title: string;
  features: string[];
  time: string;
  icon: string;
  color: string;
}

/* -------------------- Main Component -------------------- */

export default function AboutPage() {
  const features: FeatureModule[] = [
    {
      title: "Interactive Learning Experience",
      features: [
        "Engaging 3D visualizations and animations",
        "Immersive course content delivery",
        "Real-time interactive elements",
        "Modern user interface design"
      ],
      time: "Expert-level",
      icon: "🎯",
      color: "#06b6d4"
    },
    {
      title: "Comprehensive Course Library",
      features: [
        "1000+ expert-led courses",
        "Multiple subject areas and specializations",
        "Updated content regularly",
        "Industry-recognized certifications"
      ],
      time: "Always Growing",
      icon: "📚",
      color: "#8b5cf6"
    },
    {
      title: "Personalized Learning Paths",
      features: [
        "AI-powered course recommendations",
        "Track your progress and achievements",
        "Customized learning goals",
        "Adaptive difficulty levels"
      ],
      time: "Tailored for You",
      icon: "🎓",
      color: "#10b981"
    },
    {
      title: "Expert Instructors",
      features: [
        "Learn from industry professionals",
        "Real-world project experience",
        "One-on-one mentorship available",
        "24/7 community support"
      ],
      time: "Top Tier",
      icon: "👨‍🏫",
      color: "#f59e0b"
    },
    {
      title: "Flexible Learning",
      features: [
        "Learn at your own pace",
        "Access courses anytime, anywhere",
        "Mobile and desktop compatible",
        "Offline download options"
      ],
      time: "Your Schedule",
      icon: "⏰",
      color: "#ef4444"
    },
    {
      title: "Career Development",
      features: [
        "Job placement assistance",
        "Resume and portfolio building",
        "Interview preparation support",
        "Industry networking opportunities"
      ],
      time: "Lifetime Support",
      icon: "💼",
      color: "#ec4899"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <FloatingCube position={[-3, 1, -2]} color="#06b6d4" />
            <FloatingCube position={[3, -1, -3]} color="#fbbf24" />
            <FloatingCube position={[0, 2, -2]} color="#8b5cf6" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white">
              About Our
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Learning Management System
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Empowering learners worldwide with cutting-edge technology, expert instructors, 
              and a comprehensive learning platform designed for success in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-cyan-400">1000+</div>
                <div className="text-sm text-gray-300">Courses Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-yellow-400">28,000+</div>
                <div className="text-sm text-gray-300">Active Learners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              About FutureSkills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in online learning and skill development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-cyan-500"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Vision:</strong> Transforming education through technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Platform:</strong> Next-generation learning experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Community:</strong> 28,000+ active learners worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Experience:</strong> 5+ years in online education</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Interactive 3D learning experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Expert-led courses across all subjects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Personalized learning paths with AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Industry-recognized certifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>24/7 global learning community</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                style={{ borderLeftColor: module.color, borderLeftWidth: '6px' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                    style={{ backgroundColor: `${module.color}20` }}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{module.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        ⏱️ {module.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-600 mt-0.5 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              Experience learning like never before with our innovative approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Industry-Relevant</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Real-world project experience</li>
                <li>Updated curriculum regularly</li>
                <li>Job-ready skills training</li>
                <li>Industry expert instructors</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
              <ul className="space-y-2 text-gray-700">
                <li>3D visualization tools</li>
                <li>Live coding sessions</li>
                <li>Interactive quizzes</li>
                <li>Hands-on projects</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                💼
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Career Support</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Resume building workshops</li>
                <li>Interview preparation</li>
                <li>Job placement assistance</li>
                <li>Networking opportunities</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* 3D Background Layer */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <CTABackground3D />
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.9,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
            className="text-center bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl p-16 shadow-2xl backdrop-blur-sm border border-white/20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are transforming their careers and achieving their goals with FutureSkills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/3d/LogIn">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white rounded-xl text-cyan-600 font-bold text-lg shadow-xl hover:bg-gray-100 transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-transparent border-2 border-white rounded-xl text-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
