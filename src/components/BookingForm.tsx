'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, User, Phone, Mail, CheckCircle2, Loader2, Star, Navigation, ArrowRight, Tag, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const vehicles = [
    { id: 'standard', name: 'Standard', price: '$1.5/km', icon: '🚗', image: 'https://images.unsplash.com/photo-1549463286-621e25e17197?auto=format&fit=crop&q=80&w=400' },
    { id: 'premium', name: 'Premium', price: '$3.5/km', icon: '💎', image: 'https://images.unsplash.com/photo-1621210179871-b8fc3ca83792?auto=format&fit=crop&q=80&w=400' },
    { id: 'van', name: 'Luxury Van', price: '$5.0/km', icon: '🚐', image: 'https://images.unsplash.com/photo-1542456075-812046835158?auto=format&fit=crop&q=80&w=400' }
];

export default function BookingForm() {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pickupAddress: '',
        dropoffAddress: '',
        pickupDate: '',
        pickupTime: '',
        vehicleType: 'standard',
        promoCode: '',
        stops: [] as string[],
        distance: 5,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [promoData, setPromoData] = useState<any>(null);
    const [newStop, setNewStop] = useState('');
    const router = useRouter();

    const ratePerKm = formData.vehicleType === 'premium' ? 3.5 : formData.vehicleType === 'van' ? 5.0 : 1.5;
    const distanceFare = ratePerKm * (formData.distance || 5);
    const discount = promoData?.discount || 0;
    const estimatedFare = Math.round(distanceFare - discount);

    useEffect(() => {
        setPromoApplied(false);
        setPromoData(null);
        setPromoError('');
    }, [formData.vehicleType, formData.distance]);

    const validatePromo = async () => {
        if (!formData.promoCode) return;
        setPromoError('');
        setPromoApplied(false);
        try {
            const res = await fetch('/api/promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: formData.promoCode, vehicleType: formData.vehicleType, distance: formData.distance }),
            });
            const data = await res.json();
            if (data.success) {
                setPromoApplied(true);
                setPromoData(data.data);
            } else {
                setPromoError(data.error || 'Invalid promo code');
            }
        } catch (error) {
            setPromoError('Failed to validate promo code');
        }
    };

    const addStop = () => {
        if (newStop.trim()) {
            setFormData({ ...formData, stops: [...formData.stops, newStop.trim()] });
            setNewStop('');
        }
    };

    const removeStop = (index: number) => {
        setFormData({ ...formData, stops: formData.stops.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                router.push(`/checkout/${result.data.trackingId}`);
            } else {
                alert('Booking failed: ' + result.error);
            }
        } catch (error) {
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl border border-white/20 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 yellow-gradient opacity-5 rounded-bl-[100px]"></div>

            <div className="relative z-10 space-y-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black tracking-tight">Book Your <span className="text-yellow-500">Ride</span></h2>
                    <p className="text-gray-500 font-medium text-sm">Fill in the details to schedule your trip.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { label: 'Full Name', icon: <User size={16} />, type: 'text', key: 'customerName', placeholder: 'John Doe' },
                            { label: 'Email', icon: <Mail size={16} />, type: 'email', key: 'customerEmail', placeholder: 'john@example.com' },
                            { label: 'Phone', icon: <Phone size={16} />, type: 'tel', key: 'customerPhone', placeholder: '+1 (555) 000-0000' },
                            { label: 'Date', icon: <Calendar size={16} />, type: 'date', key: 'pickupDate' },
                            { label: 'Time', icon: <Clock size={16} />, type: 'time', key: 'pickupTime' },
                            { label: 'Pickup', icon: <MapPin size={16} />, type: 'text', key: 'pickupAddress', placeholder: '123 Pick-up St' }
                        ].map((field) => (
                            <motion.div
                                key={field.key}
                                whileFocus={{ scale: 1.02 }}
                                className="space-y-2"
                            >
                                <label className="flex items-center text-xs font-black uppercase tracking-widest text-gray-400">
                                    <span className="text-yellow-500 mr-2">{field.icon}</span> {field.label}
                                </label>
                                <input
                                    required
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 outline-none transition-all font-bold text-sm"
                                    value={(formData as any)[field.key]}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                />
                            </motion.div>
                        ))}

                        <div className="md:col-span-2 space-y-2">
                            <label className="flex items-center text-xs font-black uppercase tracking-widest text-gray-400">
                                <span className="text-yellow-500 mr-2"><Navigation size={16} /></span> Drop-off Location
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Enter destination address"
                                className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 outline-none transition-all font-bold text-sm"
                                value={formData.dropoffAddress}
                                onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="flex items-center text-xs font-black uppercase tracking-widest text-gray-400">
                                <span className="text-yellow-500 mr-2"><Plus size={16} /></span> Waypoints (Optional)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a stop along the route"
                                    className="flex-1 bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 outline-none transition-all font-bold text-sm"
                                    value={newStop}
                                    onChange={(e) => setNewStop(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStop())}
                                />
                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={addStop}
                                    className="bg-yellow-500 text-white px-4 rounded-2xl font-bold hover:bg-yellow-600 transition-colors"
                                >
                                    <Plus size={20} />
                                </motion.button>
                            </div>
                            <AnimatePresence>
                                {formData.stops.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        {formData.stops.map((stop, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-xl"
                                            >
                                                <span className="text-sm font-medium">{stop}</span>
                                                <button type="button" onClick={() => removeStop(i)} className="text-red-500 hover:text-red-700">
                                                    <X size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Estimated Distance (km)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.distance}
                                    onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                                    className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Select Vehicle Class</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {vehicles.map((v: any) => (
                                <motion.div
                                    key={v.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormData({ ...formData, vehicleType: v.id })}
                                    className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all relative ${formData.vehicleType === v.id
                                        ? 'border-yellow-500 bg-yellow-500/5'
                                        : 'border-gray-100 dark:border-gray-800 hover:border-yellow-200'
                                        }`}
                                >
                                    <div className="h-28 w-full bg-gray-50 dark:bg-gray-800/50 relative p-4 flex items-center justify-center">
                                        <img src={v.image} alt={v.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform group-hover:scale-110" />
                                        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-900/90 rounded-lg p-1 text-sm shadow-sm border border-gray-100 dark:border-gray-800">
                                            {v.icon}
                                        </div>
                                        {formData.vehicleType === v.id && (
                                            <div className="absolute inset-0 bg-yellow-500/10 backdrop-blur-[1px] flex items-center justify-center">
                                                <div className="bg-yellow-500 rounded-full p-1 shadow-lg">
                                                    <CheckCircle2 className="text-white" size={24} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 text-center border-t border-gray-100 dark:border-gray-800">
                                        <div className="font-black text-sm uppercase tracking-tight text-gray-900 dark:text-white whitespace-nowrap">{v.name}</div>
                                        <div className="text-xs text-yellow-600 font-black mt-1">{v.price}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Promo Code</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 pl-10 outline-none transition-all font-bold text-sm uppercase"
                                    value={formData.promoCode}
                                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                onClick={validatePromo}
                                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 rounded-2xl font-black text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                            >
                                Apply
                            </motion.button>
                        </div>
                        {promoError && <p className="text-red-500 text-xs font-bold">{promoError}</p>}
                        {promoApplied && promoData && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-2xl flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-green-700 dark:text-green-400 font-black text-sm">PROMO APPLIED!</p>
                                    <p className="text-green-600 dark:text-green-500 text-xs font-medium">{promoData.code} - {promoData.discountPercent}% OFF</p>
                                </div>
                                <span className="text-green-600 dark:text-green-400 font-black text-lg">-${promoData.discount}</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-bold">Base Fare</span>
                            <span className="font-black">${distanceFare.toFixed(2)}</span>
                        </div>
                        {promoApplied && (
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-bold">Discount</span>
                                <span className="font-black text-green-600">-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t dark:border-gray-700 pt-3 flex justify-between items-center">
                            <span className="text-gray-900 dark:text-white font-black">Estimated Total</span>
                            <span className="text-2xl font-black text-yellow-600">${estimatedFare.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium text-center">Final fare may vary based on route and traffic</p>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full yellow-gradient text-white font-black py-5 rounded-2xl shadow-2xl shadow-yellow-500/40 transition-all flex justify-center items-center space-x-3 uppercase tracking-tighter text-lg"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                <span>Complete Booking</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

