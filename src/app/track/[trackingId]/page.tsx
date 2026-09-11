'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { MapPin, Phone, MessageSquare, Star, Loader2, Navigation, Clock, ShieldCheck, Siren } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackingPage() {
    const { trackingId } = useParams();
    const [booking, setBooking] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        const fetchBooking = async () => {
            const res = await fetch(`/api/bookings/${trackingId}`);
            const data = await res.json();
            if (data.success) {
                setBooking(data.data);
            }
        };
        fetchBooking();
    }, [trackingId]);

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
            </div>
        );
    }

    const b = booking as any;

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />
            <div className="pt-20 grid grid-cols-1 lg:grid-cols-3 min-h-screen">

                {/* Left Side: Map Simulation */}
                <div className="lg:col-span-2 relative bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="w-full h-full grid grid-cols-12 gap-1 border-gray-400">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <div key={i} className="border border-gray-300 h-24"></div>
                            ))}
                        </div>
                    </div>

                    {/* Simulated Route Line */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 px-20 py-20">
                        <motion.path
                            d="M 100 100 Q 400 300 800 500"
                            stroke="#f59e0b"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="1000"
                            initial={{ strokeDashoffset: 1000 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>

                    {/* Pickup Point */}
                    <div className="absolute top-[10%] left-[10%] text-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute -top-1 -left-1 opacity-75"></div>
                        <div className="w-4 h-4 bg-green-600 rounded-full relative"></div>
                        <span className="text-xs font-bold mt-2 block">Pickup</span>
                    </div>

                    {/* Dropoff Point */}
                    <div className="absolute bottom-[20%] right-[10%] text-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute -top-1 -left-1 opacity-75"></div>
                        <div className="w-4 h-4 bg-red-600 rounded-full relative"></div>
                        <span className="text-xs font-bold mt-2 block">Destination</span>
                    </div>

                    {/* Animated Car Icon */}
                    <motion.div
                        className="absolute z-20"
                        initial={{ left: '10%', top: '10%' }}
                        animate={{
                            left: ['10%', '30%', '50%', '70%', '80%'],
                            top: ['10%', '20%', '35%', '45%', '70%'],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="bg-yellow-500 p-3 rounded-full shadow-2xl shadow-yellow-500/50 flex items-center justify-center transform rotate-45">
                            <Navigation className="text-white fill-current" size={24} />
                        </div>
                        <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-[10px] font-bold shadow-md mt-2 whitespace-nowrap">
                            Driver: Alex (2 mins away)
                        </div>
                    </motion.div>

                    <div className="absolute top-8 left-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Security</p>
                                <p className="text-xs font-bold">Ride Securely Monitored</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Ride Info */}
                <div className="bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 p-8 flex flex-col h-full overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-3xl font-bold">Tracking Ride</h2>
                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                            En Route
                        </div>
                    </div>

                    {/* Driver Card */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=alex" alt="Driver" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Alex Rodriguez</h3>
                                <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                                    <Star size={14} fill="currentColor" />
                                    <span className="font-bold">4.9</span>
                                    <span className="text-gray-400 font-normal">(1,240 rides)</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-bold text-sm hover:shadow-md transition-all">
                                <Phone size={18} />
                                <span>Call Alex</span>
                            </button>
                            <button className="flex items-center justify-center space-x-2 bg-yellow-500 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                                <MessageSquare size={18} />
                                <span>Message</span>
                            </button>
                        </div>
                    </div>

                    {/* Ride Details */}
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-yellow-600">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Estimated Arrival</p>
                                    <p className="font-bold text-xl">8 Minutes</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Pickup From</p>
                                    <p className="font-medium text-sm line-clamp-1">{b.pickupAddress}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t dark:border-gray-800 pt-6 space-y-4">
                            <h4 className="font-bold uppercase text-xs text-gray-400">Vehicle Info</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Vehicle Type</span>
                                <span className="font-bold italic uppercase">{b.vehicleType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Plate Number</span>
                                <span className="font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">NY-556-XY</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center space-x-2"
                        >
                            <Siren size={18} />
                            <span>Emergency SOS</span>
                        </motion.button>
                        <button className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold text-sm hover:bg-red-100 transition-all">
                            Cancel Ride
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
