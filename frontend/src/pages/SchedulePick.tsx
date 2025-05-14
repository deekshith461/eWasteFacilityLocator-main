import React, { useState } from 'react';
import { Calendar, Clock, Upload, Truck, Zap } from 'lucide-react';
import Footer from '../components/Footer';

const SchedulePickup = () => {
    const [selectedService, setSelectedService] = useState<'express' | 'normal'>('normal');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 flex flex-col">
            {/* Main Content */}
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="bg-zinc-900 py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Schedule a Pickup</h1>
                        <p className="text-gray-400 text-center max-w-2xl mx-auto">
                            Let us help you responsibly dispose of your e-waste. Schedule a pickup at your convenience.
                        </p>
                    </div>
                </div>

                {/* Schedule Form Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto bg-[#1E1E1E] p-8 rounded-xl">
                        <form className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                            placeholder="Your Mobile Number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                                        Pickup Address
                                    </label>
                                    <textarea
                                        id="address"
                                        rows={3}
                                        className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                        placeholder="Complete Address"
                                    />
                                </div>
                            </div>

                            {/* Service Type Selection */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold mb-4">Service Type</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div
                                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                            selectedService === 'express'
                                                ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                                                : 'border-gray-700 hover:border-[#4CAF50]/50'
                                        }`}
                                        onClick={() => setSelectedService('express')}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#4CAF50]/10 p-3 rounded-full">
                                                <Zap className="h-6 w-6 text-[#4CAF50]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Express Pickup</h3>
                                                <p className="text-gray-400">Same day pickup service</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                            selectedService === 'normal'
                                                ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                                                : 'border-gray-700 hover:border-[#4CAF50]/50'
                                        }`}
                                        onClick={() => setSelectedService('normal')}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#4CAF50]/10 p-3 rounded-full">
                                                <Truck className="h-6 w-6 text-[#4CAF50]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Normal Pickup</h3>
                                                <p className="text-gray-400">Schedule within 3 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date and Time Selection */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold mb-4">Pickup Schedule</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>Preferred Date</span>
                                            </div>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span>Preferred Time</span>
                                            </div>
                                        </label>
                                        <select
                                            className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                        >
                                            <option value="">Select Time Slot</option>
                                            <option value="morning">9:00 AM - 12:00 PM</option>
                                            <option value="afternoon">12:00 PM - 3:00 PM</option>
                                            <option value="evening">3:00 PM - 6:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold mb-4">E-Waste Images</h2>
                                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#4CAF50]/10 p-4 rounded-full mb-4">
                                            <Upload className="h-8 w-8 text-[#4CAF50]" />
                                        </div>
                                        <p className="text-center mb-4">
                                            <span className="text-[#4CAF50]">Click to upload</span> or drag and drop
                                            <br />
                                            images of your e-waste items
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="image-upload"
                                            onChange={handleImageUpload}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="bg-[#2A2A2A] text-gray-300 py-2 px-4 rounded-lg cursor-pointer hover:bg-[#353535] transition"
                                        >
                                            Select Images
                                        </label>
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-48 rounded-lg mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#3c9c1c]/60 text-white py-4 px-6 rounded-lg font-medium hover:bg-[#45a049] transition"
                            >
                                Schedule Pickup
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SchedulePickup;