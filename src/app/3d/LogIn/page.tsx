"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Torus, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";

/**
 * Beautiful Login Page - Matching Skilled Theme
 * Features 3D animated background with glassmorphism design
 */

/* -------------------- 3D Components -------------------- */

// Animated 3D Background Sphere
function AnimatedSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * speed) * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Rotating Box
function RotatingBox({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.6;
  });

  return (
    <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </Box>
  );
}

// Floating Torus
function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.5;
  });

  return (
    <Float speed={3} rotationIntensity={0.8}>
      <Torus ref={meshRef} args={[0.6, 0.2, 16, 32]} position={position}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </Torus>
    </Float>
  );
}

/* -------------------- Main Component -------------------- */

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      console.log("Login attempt:", { email, password, rememberMe });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
          
          <AnimatedSphere position={[-3, 2, -2]} color="#06b6d4" speed={0.5} />
          <AnimatedSphere position={[3, -1, -3]} color="#fbbf24" speed={0.3} />
          <RotatingBox position={[-2, -2, -1]} color="#8b5cf6" />
          <FloatingTorus position={[2, 2, -2]} color="#ec4899" />
          <RotatingBox position={[0, 0, -4]} color="#10b981" />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-50"
      >
        <Link href="/">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all shadow-lg">
            <span className="text-xl">←</span>
            <span>Back</span>
          </button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Message */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white hidden md:block"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Welcome Back to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                skilled
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Continue your learning journey and unlock your potential with expert-led courses.
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">1000+ Courses</h3>
                  <p className="text-gray-400 text-sm">Learn at your own pace</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Instructors</h3>
                  <p className="text-gray-400 text-sm">Learn from industry leaders</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Certificates</h3>
                  <p className="text-gray-400 text-sm">Earn recognized credentials</p>
                </div>
              </div>
            </div>

            {/* 3D Interactive Element */}
            <div className="mt-8 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
              <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 3, 3]} intensity={0.8} />
                <Float speed={2} rotationIntensity={0.5}>
                  <Box args={[1.5, 1.5, 1.5]}>
                    <meshStandardMaterial 
                      color="#06b6d4" 
                      roughness={0.2}
                      metalness={0.8}
                      emissive="#06b6d4"
                      emissiveIntensity={0.3}
                    />
                  </Box>
                </Float>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
              </Canvas>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Log in to access your courses</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </motion.button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-300">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                    </svg>
                  </motion.button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Don't have an account?{" "}
                  <Link href="/3d/SignUp" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </main>
  );
}
