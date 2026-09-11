import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-yellow-500 p-2 rounded-lg">
                                <Car className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Swift<span className="text-yellow-500">Cab</span></span>
                        </Link>
                        <p className="text-gray-400">
                            Reliable, safe and premium taxi service at your doorstep. Professional drivers and well-maintained vehicles for a comfortable ride.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-yellow-500 transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-yellow-500 transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-yellow-500 transition-colors"><Instagram size={20} /></Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                                <li><Link href="#services" className="hover:text-yellow-500 transition-colors">Services</Link></li>
                                <li><Link href="/history" className="hover:text-yellow-500 transition-colors">Ride History</Link></li>
                                <li><Link href="/driver" className="hover:text-yellow-500 transition-colors">Driver Dashboard</Link></li>
                                <li><Link href="/admin" className="hover:text-yellow-500 transition-colors">Admin Dashboard</Link></li>
                            </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6">Our Services</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li>Airport Transfer</li>
                            <li>City Transport</li>
                            <li>Business Travel</li>
                            <li>Wedding Events</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-yellow-500" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-yellow-500" />
                                <span>support@swiftcab.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin size={18} className="text-yellow-500" />
                                <span>123 Taxi Street, New York, NY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} SwiftCab. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
