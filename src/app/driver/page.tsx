'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, User, CheckCircle2, Loader2, Navigation, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DriverDashboard() {
    const [rides, setRides] = useState<Array<Record<string, unknown>>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (data.success) {
                setRides(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch rides', error);
        } finally {
            setIsLoading(false);
        }
    };

    const acceptRide = async (trackingId: string) => {
        try {
            await fetch(`/api/bookings/${trackingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'confirmed', driverId: 'DRV-001' }),
            });
            fetchRides();
        } catch (error) {
            console.error('Failed to accept ride', error);
        }
    };

    const completeRide = async (trackingId: string) => {
        try {
            await fetch(`/api/bookings/${trackingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' }),
            });
            fetchRides();
        } catch (error) {
            console.error('Failed to complete ride', error);
        }
    };

    const availableRides = rides.filter((r) => r.status === 'pending');
    const myRides = rides.filter((r) => r.driverId === 'DRV-001' || r.status === 'confirmed');
    const completedRides = rides.filter((r) => r.status === 'completed');

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full text-yellow-600 dark:text-yellow-400 font-bold text-sm">
                        <ShieldCheck size={16} />
                        <span>DRIVER DASHBOARD</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight">Driver <span className="text-yellow-500">Panel</span></h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your rides and accept bookings</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {[
                        { key: 'available', label: 'Available', count: availableRides.length },
                        { key: 'active', label: 'My Active', count: myRides.length },
                        { key: 'completed', label: 'Completed', count: completedRides.length },
                    ].map((tab) => (
                        <motion.button
                            key={tab.key}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === tab.key
                                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                {tab.count}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                        <p className="text-gray-500">Loading rides...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(activeTab === 'available' ? availableRides : activeTab === 'active' ? myRides : completedRides).map((ride: any, i) => (
                            <motion.div
                                key={ride._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white dark:bg-gray-900 rounded-[30px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-500"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                                            ride.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                            ride.status === 'confirmed' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                            'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30'
                                        }`}>
                                            {ride.status}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-2 font-mono">{ride.trackingId}</p>
                                    </div>
                                    <p className="text-2xl font-black text-yellow-600">${ride.estimatedFare}</p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <User size={18} className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Customer</p>
                                            <p className="font-medium text-sm">{ride.customerName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Phone size={18} className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                                            <p className="font-medium text-sm">{ride.customerPhone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <MapPin size={18} className="text-green-500 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Pickup</p>
                                            <p className="font-medium text-sm">{ride.pickupAddress}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <MapPin size={18} className="text-red-500 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Drop-off</p>
                                            <p className="font-medium text-sm">{ride.dropoffAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                {activeTab === 'available' && (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => acceptRide(ride.trackingId)}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <CheckCircle2 size={18} />
                                        <span>Accept Ride</span>
                                    </motion.button>
                                )}

                                {activeTab === 'active' && (
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                                                    <Navigation className="text-yellow-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase">OTP</p>
                                                    <p className="font-black text-lg tracking-widest">{ride.otp}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">Share with customer</span>
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => completeRide(ride.trackingId)}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <CheckCircle2 size={18} />
                                            <span>Complete Ride</span>
                                        </motion.button>
                                    </div>
                                )}

                                {activeTab === 'completed' && (
                                    <div className="flex items-center justify-center space-x-1 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={18} fill="currentColor" />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
