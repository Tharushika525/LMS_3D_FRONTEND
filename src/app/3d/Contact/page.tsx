"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Enhanced 3D Background with more elements
function EnhancedBackground3D() {
  return (
    <>
      {/* Animated Spheres */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5} position={[-6, 3, -4]}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0}
            metalness={0.8}
            opacity={0.7}
            transparent
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[6, 2, -5]}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color="#8b5cf6"
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

      {/* Rotating Boxes */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} position={[-5, -2, -3]}>
        <Box args={[1.2, 1.2, 1.2]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.3}
            speed={1.8}
            roughness={0}
            metalness={0.9}
            opacity={0.6}
            transparent
          />
        </Box>
      </Float>

      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={2.2} position={[5, -3, -4]}>
        <Box args={[0.9, 0.9, 0.9]}>
          <MeshDistortMaterial
            color="#fbbf24"
            attach="material"
            distort={0.35}
            speed={2.2}
            roughness={0}
            metalness={0.8}
            opacity={0.5}
            transparent
          />
        </Box>
      </Float>

      {/* Torus rings */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[0, 0, -6]}>
        <Torus args={[1.5, 0.4, 16, 32]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.25}
            speed={1.5}
            roughness={0}
            metalness={0.9}
            opacity={0.4}
            transparent
          />
        </Torus>
      </Float>

      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.6} position={[-3, -4, -3]}>
        <Torus args={[0.7, 0.25, 16, 32]}>
          <MeshDistortMaterial
            color="#f59e0b"
            attach="material"
            distort={0.2}
            speed={1.6}
            roughness={0}
            metalness={0.8}
            opacity={0.5}
            transparent
          />
        </Torus>
      </Float>
    </>
  );
}

// Animated Icon Component
function AnimatedIcon({ icon, delay }: { icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      className="text-4xl"
    >
      {icon}
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <EnhancedBackground3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl md:text-9xl font-extrabold mb-6 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              We're here to help you succeed. Reach out to us and let's start a conversation about your learning journey.
            </motion.p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center group hover:bg-white/15 transition-all"
            >
              <div className="w-20 h-20 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <AnimatedIcon icon="📧" delay={0.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Email Us</h3>
              <p className="text-gray-300 mb-4">We respond within 24 hours</p>
              <a href="mailto:info@futureskills.com" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors text-lg">
                info@futureskills.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center group hover:bg-white/15 transition-all"
            >
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <AnimatedIcon icon="📞" delay={0.6} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Call Us</h3>
              <p className="text-gray-300 mb-4">Mon-Fri, 8am to 6pm</p>
              <a href="tel:+94112345678" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors text-lg">
                +94 11 234 5678
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center group hover:bg-white/15 transition-all"
            >
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <AnimatedIcon icon="📍" delay={0.7} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Visit Us</h3>
              <p className="text-gray-300 mb-4">Come say hello</p>
              <p className="text-cyan-400 font-semibold text-lg">
                123 Main Street<br/>Colombo, Sri Lanka
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/30"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600 mb-4 text-center"
            >
              Send Us a Message
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-center mb-10 text-lg"
            >
              Fill out the form below and we'll get back to you within 24 hours
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all bg-white"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all bg-white"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all bg-white"
                    placeholder="+94 77 123 4567"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="course-inquiry">Course Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all resize-none bg-white"
                  placeholder="Tell us more about your inquiry..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-xl font-bold text-xl text-white shadow-xl transition-all ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-2xl"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  "Send Message 🚀"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Quick answers to common inquiries
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How long does it take to get a response?",
                answer: "We typically respond within 24 hours during business days. For urgent inquiries, please call us directly."
              },
              {
                question: "Do you offer personalized course recommendations?",
                answer: "Yes! Our team can help you choose the best courses based on your goals and experience level. Just mention it in your message."
              },
              {
                question: "Can I schedule a demo or consultation?",
                answer: "Absolutely! Select 'Course Inquiry' as the subject and mention you'd like to schedule a demo in your message."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards, PayPal, and bank transfers. Contact us for enterprise payment options."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)" }}
                className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-cyan-400">Q:</span> {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
