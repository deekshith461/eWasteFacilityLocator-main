import React from 'react';
import Footer from '../components/Footer'; 
const Waste = () => {
    return (
        <div className="bg-black text-white py-20 px-6 md:px-12">
            {/* Hero Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Circular Economy Services</h1>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    At Eco-Spark, we believe in creating a sustainable future by embracing circular economy practices. Our services aim to promote waste reduction, resource optimization, and environmental conservation.
                </p>
            </section>

            {/* Services Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-xl font-semibold text-[#3c9c1c] mb-3">E-Waste Collection</h2>
                    <p className="text-gray-300">
                        We collect electronic waste from your home or business, ensuring responsible recycling and disposal of hazardous materials.
                    </p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-xl font-semibold text-[#3c9c1c] mb-3">Recycling & Reuse</h2>
                    <p className="text-gray-300">
                        Our specialized recycling services help transform e-waste into reusable materials, reducing landfill waste and conserving resources.
                    </p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-xl font-semibold text-[#3c9c1c] mb-3">Sustainability Consulting</h2>
                    <p className="text-gray-300">
                        We provide consulting services to businesses and individuals looking to reduce their carbon footprint and adopt sustainable practices.
                    </p>
                </div>
            </section>

            {/* Impact Section */}
            <section className="mt-16 text-center bg-zinc-900 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-[#3c9c1c] mb-4">Our Impact</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    By partnering with us, you are contributing to a greener planet. Together, we can reduce e-waste, promote recycling, and support a sustainable future for generations to come.
                </p>
            </section>

            {/* Call to Action */}
            <section className="text-center mt-16 mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Get Involved</h2>
                <p className="text-lg text-gray-400 mb-6">Join us in making a positive impact on the environment by recycling your e-waste with Eco-Spark today!</p>
                <button className="bg-[#3c9c1c] text-white py-2 px-6 rounded-lg hover:bg-[#3c9c1c] transition-all">
                    Contact Us to Learn More
                </button>
            </section>
            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Waste;
