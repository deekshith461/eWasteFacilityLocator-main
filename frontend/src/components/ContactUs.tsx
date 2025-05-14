import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Footer from '../components/Footer'; 

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-black text-gray-200 flex flex-col">
            {/* Main Content */}
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="bg-znic py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
                        <p className="text-gray-400 text-center max-w-2xl mx-auto">
                            Have questions about e-waste recycling? We're here to help! Reach out to us through any of the channels below.
                        </p>
                    </div>
                </div>

                {/* Contact Information Cards */}
                <div className="container mx-auto px-4 ">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Email Card */}
                        <div className="bg-[#1E1E1E] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/20 cursor-pointer">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-[#4CAF50]/10 p-4 rounded-full mb-4">
                                    <Mail className="h-8 w-8 text-[#4CAF50]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                                <p className="text-gray-400">sudeepreddy0409@gmail.com</p>
                                <p className="text-gray-400">phaneeshmushetty@gmail.com</p>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-[#1E1E1E] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/20 cursor-pointer">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-[#4CAF50]/10 p-4 rounded-full mb-4">
                                    <Phone className="h-8 w-8 text-[#4CAF50]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                                <p className="text-gray-400">+91 9985987193</p>
                                <p className="text-gray-400">Mon-Sat: 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="bg-[#1E1E1E] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/20 cursor-pointer">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-[#4CAF50]/10 p-4 rounded-full mb-4">
                                    <MapPin className="h-8 w-8 text-[#4CAF50]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                                <p className="text-gray-400">Hyderabad</p>
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-[#1E1E1E] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/20 cursor-pointer">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-[#4CAF50]/10 p-4 rounded-full mb-4">
                                    <Clock className="h-8 w-8 text-[#4CAF50]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                                <p className="text-gray-400">Monday - Friday</p>
                                <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-8 rounded-xl">
                        <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition outline-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#3c9c1c]/60 text-white py-3 px-6 rounded-lg font-medium hover:bg-[#45a049] transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default ContactUs;
