'use client';

import { motion } from 'framer-motion';
import BookingForm from './BookingForm';
import { Car, MapPin, Shield, Star, Clock, Navigation } from 'lucide-react';

export default function Hero() {
    return (
        <section id="booking-section" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_50%)]">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-600 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full text-yellow-600 dark:text-yellow-400 font-bold text-sm tracking-wide">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            PREMIUM TAXI SERVICE
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
                            Your Ride, <br />
                            <span className="text-gradient drop-shadow-sm">Reimagined.</span>
                        </h1>

                        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
                            Experience the gold standard in urban travel. Professional, punctual, and premium.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                { icon: <Shield size={20} />, text: "Safe & Secure" },
                                { icon: <Clock size={20} />, text: "24/7 Available" },
                                { icon: <Star size={20} />, text: "Top Rated" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                                >
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-yellow-500">
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" alt="User" />
                                ))}
                            </div>
                            <div>
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-sm font-bold text-gray-500">Joined by 10k+ happy users</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-yellow-500/20 rounded-[40px] blur-2xl z-0"></div>
                        <BookingForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

