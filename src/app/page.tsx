"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sphere, Box, Torus } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";

interface LMSModule {
  title: string;
  features: string[];
  days: number;
  icon: string;
  color: string;
  gradient: string;
}

/* -------------------- Hooks -------------------- */

function useTypewriter(words: string[], speed = 80, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (forward) {
      if (subIndex < words[index].length) {
        const timeout = setTimeout(() => setSubIndex((s) => s + 1), speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setForward(false), pause);
        return () => clearTimeout(timeout);
      }
    } else {
      if (subIndex > 0) {
        const timeout = setTimeout(() => setSubIndex((s) => s - 1), speed / 2);
        return () => clearTimeout(timeout);
      } else {
        setIndex((index + 1) % words.length);
        setForward(true);
      }
    }
  }, [subIndex, forward, index, words, speed, pause]);

  return { text: words[index].slice(0, subIndex), blink };
}

/* -------------------- 3D Components -------------------- */

// Module Card 3D Icon
function ModuleIcon({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/* -------------------- React Components -------------------- */

// Module Feature Card
function ModuleCard({ module, index }: { module: LMSModule; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100, rotateY: isEven ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 3) * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: isEven ? 5 : -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        transition: { duration: 0.3 }
      }}
      className={`relative bg-white/90 backdrop-blur-lg border-2 border-l-8 border-t-2 shadow-2xl rounded-2xl p-6 transform-gpu hover:shadow-3xl`}
      style={{ transformStyle: 'preserve-3d', borderLeftColor: module.color, borderTopColor: `${module.color}40` }}
    >
      {/* 3D Icon */}
      <div className="absolute top-4 right-4 w-20 h-20">
        <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <ModuleIcon color={module.color} />
        </Canvas>
      </div>

      {/* Icon emoji */}
      <div className="text-5xl mb-4">{module.icon}</div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{module.title}</h3>
      
      <ul className="space-y-2 mb-4">
        {module.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-2 text-gray-700"
          >
            <span className="text-emerald-600 mt-1 font-bold">✓</span>
            <span className="text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Active learners badge */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-700 font-medium">Active Learners</span>
        </div>
        <span className="text-lg font-bold text-gray-900">{module.days.toLocaleString()}+</span>
      </div>
    </motion.div>
  );
}

// Timeline Item
function TimelineItem({ phase, description, days, index, total }: { 
  phase: string; 
  description: string; 
  days: number; 
  index: number;
  total: number;
}) {
  const percentage = (days / total) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Timeline dot */}
        <div className="relative shrink-0">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg"
          >
            {index + 1}
          </motion.div>
          {index < 5 && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-24 bg-linear-to-b from-blue-500/50 to-transparent"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-16">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{phase}</h4>
          <p className="text-gray-700 mb-4">{description}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
              className="h-full bg-linear-to-r from-blue-500 to-purple-600 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 font-medium">Estimated time: {days} day{days > 1 ? 's' : ''}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------- Main Page Component -------------------- */

export default function Home() {
  const words = ["Interactive Learning", "Skill Development", "Career Growth", "Expert Instructors", "Flexible Learning"];
  const { text, blink } = useTypewriter(words, 70, 1200);

  // Learning Features for Students
  const lmsModules: LMSModule[] = [
    {
      title: "Interactive Video Lessons",
      features: [
        "HD quality video lectures from experts",
        "Pause, rewind, and replay anytime",
        "Closed captions and transcripts",
        "Watch on any device, anywhere"
      ],
      days: 1000,
      icon: "🎥",
      color: "#3b82f6",
      gradient: "from-blue-500/80 to-blue-700/80"
    },
    {
      title: "Live Classes & Workshops",
      features: [
        "Real-time interaction with instructors",
        "Q&A sessions and group discussions",
        "Hands-on projects and activities",
        "Schedule-friendly timings"
      ],
      days: 500,
      icon: "📹",
      color: "#8b5cf6",
      gradient: "from-purple-500/80 to-purple-700/80"
    },
    {
      title: "Personalized Learning Path",
      features: [
        "AI-powered course recommendations",
        "Track your progress and milestones",
        "Customized learning goals",
        "Adaptive difficulty levels"
      ],
      days: 2000,
      icon: "🎯",
      color: "#06b6d4",
      gradient: "from-cyan-500/80 to-cyan-700/80"
    },
    {
      title: "Expert Instructors",
      features: [
        "Learn from industry professionals",
        "Real-world project experience",
        "Mentorship and career guidance",
        "24/7 support and feedback"
      ],
      days: 3000,
      icon: "👨‍🏫",
      color: "#10b981",
      gradient: "from-emerald-500/80 to-emerald-700/80"
    },
    {
      title: "Practice & Assessments",
      features: [
        "Interactive quizzes and exercises",
        "Instant feedback on submissions",
        "Mock tests and challenges",
        "Unlimited practice attempts"
      ],
      days: 1500,
      icon: "✍️",
      color: "#f59e0b",
      gradient: "from-amber-500/80 to-orange-600/80"
    },
    {
      title: "Community & Collaboration",
      features: [
        "Connect with fellow learners",
        "Discussion forums and study groups",
        "Share projects and get feedback",
        "Network with professionals"
      ],
      days: 5000,
      icon: "🤝",
      color: "#ef4444",
      gradient: "from-rose-500/80 to-red-600/80"
    },
    {
      title: "Mobile Learning App",
      features: [
        "Learn on the go with mobile app",
        "Offline course downloads",
        "Push notifications for updates",
        "Seamless sync across devices"
      ],
      days: 4000,
      icon: "📱",
      color: "#ec4899",
      gradient: "from-pink-500/80 to-pink-700/80"
    },
    {
      title: "Certificates & Achievements",
      features: [
        "Industry-recognized certificates",
        "Shareable digital badges",
        "LinkedIn profile integration",
        "Career-boosting credentials"
      ],
      days: 10000,
      icon: "🏆",
      color: "#14b8a6",
      gradient: "from-teal-500/80 to-emerald-600/80"
    }
  ];

  // Learning Journey Stats
  const totalDays = 28000; // Total active learners

  const timeline = [
    { phase: "Start Your Journey", description: "Sign up and explore 1000+ courses across various subjects", days: 1 },
    { phase: "Choose Your Path", description: "Select courses that match your career goals and interests", days: 2 },
    { phase: "Learn & Practice", description: "Engage with interactive content, quizzes, and hands-on projects", days: 30 },
    { phase: "Get Certified", description: "Complete assessments and earn industry-recognized certificates", days: 90 },
    { phase: "Advance Your Career", description: "Showcase your skills and connect with job opportunities", days: 180 },
    { phase: "Keep Growing", description: "Continue learning with lifetime access to updated content", days: 365 },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 w-full px-6 py-4 bg-gray-900/95 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              FS
            </div>
            <div>
              <div className="font-bold text-xl text-white">FutureSkills</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-cyan-400 transition-colors">HOME</a>
            <a href="/3d/About" className="text-white hover:text-cyan-400 transition-colors">ABOUT</a>
            <a href="#courses" className="text-white hover:text-cyan-400 transition-colors">COURSES</a>
            <a href="#features" className="text-white hover:text-cyan-400 transition-colors">PAGES</a>
            <a href="/3d/Contact" className="text-white hover:text-cyan-400 transition-colors">CONTACT</a>
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

      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-900/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
                OWN YOUR FUTURE BY
                <br />
                <span className="text-white">LEARNING SKILLS</span>
              </h1>

              <div className="mb-8">
                <p className="text-xl text-gray-300 mb-4">
                  Get the most dedicated consultation for your life-changing course.
                </p>
                <div className="flex items-center gap-3 text-2xl font-semibold">
                  <span className="text-cyan-400">{text}</span>
                  <span className="text-cyan-400">{blink ? "│" : " "}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white rounded text-white font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all"
                >
                  VIEW ALL COURSES
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cyan-500 rounded text-white font-semibold text-lg hover:bg-cyan-600 transition-all"
                >
                  SIGN UP NOW
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </section>

      {/* Key Features with Circular Icons */}
      <section id="features" className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 - Online Courses */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                {/* Outer cyan ring */}
                <div className="w-40 h-40 rounded-full border-8 border-cyan-400 flex items-center justify-center mx-auto relative">
                  {/* Inner white circle */}
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.8} />
                      <Float speed={2} rotationIntensity={0.3}>
                        <Box args={[0.6, 0.4, 0.1]}>
                          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.7} />
                        </Box>
                      </Float>
                    </Canvas>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ONLINE COURSES</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you stay with us for one week or one year, we will make sure you have the time of your life.
              </p>
            </motion.div>

            {/* Feature 2 - Books & Library */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full border-8 border-yellow-400 flex items-center justify-center mx-auto relative">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.8} />
                      <Float speed={2} rotationIntensity={0.3}>
                        <Box args={[0.5, 0.7, 0.15]}>
                          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
                        </Box>
                      </Float>
                    </Canvas>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">BOOKS & LIBRARY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover free online courses from a top 180 universities, and functionality of Canvas, the trust makes teaching.
              </p>
            </motion.div>

            {/* Feature 3 - Great Teachers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full border-8 border-cyan-400 flex items-center justify-center mx-auto relative">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.8} />
                      <Float speed={2} rotationIntensity={0.3}>
                        <Sphere args={[0.35, 32, 32]}>
                          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.7} />
                        </Sphere>
                        <Sphere args={[0.15, 16, 16]} position={[-0.3, 0, 0.3]}>
                          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.7} />
                        </Sphere>
                      </Float>
                    </Canvas>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">GREAT TEACHERS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                While other platforms offer only a subset of online teaching tools, network provides all the ease.
              </p>
            </motion.div>

            {/* Feature 4 - Certification */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full border-8 border-yellow-400 flex items-center justify-center mx-auto relative">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.8} />
                      <Float speed={2} rotationIntensity={0.3}>
                        <Box args={[0.7, 0.5, 0.1]}>
                          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
                        </Box>
                      </Float>
                    </Canvas>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CERTIFICATION</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you stay with us for one week or one year, we will make sure you have the time of your life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LMS Modules Section */}
      <section id="modules" className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Why Learners Love Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lmsModules.map((module, index) => (
            <ModuleCard key={index} module={module} index={index} />
          ))}
        </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section id="timeline" className="relative bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600">
            From beginner to expert in just a few steps
          </p>
        </motion.div>

        <div className="relative">
          {timeline.map((item, index) => (
            <TimelineItem 
              key={index}
              phase={item.phase}
              description={item.description}
              days={item.days}
              index={index}
              total={totalDays}
            />
          ))}
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl p-16 shadow-2xl"
          >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers. Start learning today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white rounded text-cyan-600 font-bold text-lg shadow-xl hover:bg-gray-100"
            >
             Get Started
           
            </motion.button>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <div className="font-bold text-xl text-white">FutureSkills</div>
                  <div className="text-sm text-gray-400">Learn. Grow. Succeed.</div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering learners worldwide with high-quality education. Master new skills, advance your career, and achieve your goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Browse Courses</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Become an Instructor</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex items-center justify-between text-gray-400">
            <div>© 2025 skilled. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

