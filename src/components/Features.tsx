'use client';

import { Shield, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Safety First',
        description: 'All our drivers are background-checked and vehicles are sanitized regularly.',
        icon: Shield,
        color: 'bg-blue-500/10 text-blue-500'
    },
    {
        title: 'On Time',
        description: 'We pride ourselves on punctuality. Your driver will be there exactly when needed.',
        icon: Clock,
        color: 'bg-yellow-500/10 text-yellow-500'
    },
    {
        title: 'GPS Tracking',
        description: 'Follow your ride in real-time. Share your trip status with friends and family.',
        icon: MapPin,
        color: 'bg-green-500/10 text-green-500'
    },
    {
        title: 'Easy Payment',
        description: 'Pay with cash or card. Secure online payments available for all bookings.',
        icon: CreditCard,
        color: 'bg-purple-500/10 text-purple-500'
    }
];

export default function Features() {
    return (
        <section id="services" className="py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-yellow-500 font-black tracking-[0.2em] uppercase text-sm"
                    >
                        Features & Services
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tight leading-tight"
                    >
                        Experience The <span className="text-gradient">Best Ride</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -15 }}
                            className="group relative bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[30px] border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 overflow-hidden"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12 scale-150">
                                <f.icon size={100} />
                            </div>

                            <div className={`w-20 h-20 rounded-2xl ${f.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/5`}>
                                <f.icon size={40} />
                            </div>

                            <h4 className="text-2xl font-black mb-4 group-hover:text-yellow-500 transition-colors">{f.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                {f.description}
                            </p>

                            <div className="flex items-center text-sm font-bold text-yellow-600 group-hover:translate-x-2 transition-transform duration-300">
                                LEARN MORE <ArrowRight size={16} className="ml-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
