'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      <Hero />
      <Features />

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-yellow-500/20 rounded-[40px] blur-2xl rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
              <div className="relative aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-[35px] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1551525212-a1dc18871d4a?auto=format&fit=crop&q=80&w=1200"
                  alt="SwiftCab Service"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-8 right-8 glass p-6 rounded-3xl shadow-2xl border border-white/20"
                >
                  <p className="text-4xl font-black text-yellow-500">14+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Experience</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                 <span className="text-yellow-500 font-black tracking-[0.2em] uppercase text-sm">About SwiftCab</span>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
                  Providing <span className="text-gradient">Reliable Transport</span> Since 2010
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                   SwiftCab was founded with a simple mission: to make urban transportation safe, affordable, and accessible for everyone. Today, we are proud to be the leading taxi service in the region.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Award size={20} />, title: "Best Service", desc: "Award winning travel" },
                  { icon: <Users size={20} />, title: "Expert Drivers", desc: "Professional & verified" },
                  { icon: <Globe size={20} />, title: "Global Reach", desc: "Covers all major cities" },
                  { icon: <CheckCircle2 size={20} />, title: "Secure Ride", desc: "24/7 Live monitoring" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-600">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-black text-gray-900 dark:text-gray-100">{item.title}</h5>
                      <p className="text-sm font-medium text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="yellow-gradient text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-yellow-500/30"
              >
                READ OUR FULL STORY
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-yellow-500/20 text-9xl font-serif absolute -top-10 left-0"
          >"</motion.div>
          <h4 className="text-3xl md:text-5xl font-black text-white italic leading-tight tracking-tight">
            "We don't just drive you from point A to B; we move you with comfort, style, and total peace of mind."
          </h4>
          <div className="flex flex-col items-center">
            <div className="w-16 h-1 bg-yellow-500 mb-4 rounded-full"></div>
             <p className="font-black text-yellow-500 uppercase tracking-widest text-sm">Alex M. - Founder</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
