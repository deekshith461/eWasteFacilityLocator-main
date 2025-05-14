import React, { useState, useEffect } from 'react';
import { Award, Package, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Custom hook for number animation
const useCountAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, start]);
  
  return count;
};

// Animated stat card component
const StatCard = ({ icon: Icon, title, value, color, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const animatedValue = useCountAnimation(isVisible ? value : 0, 2000);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="bg-zinc-900 p-6 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <Icon className={`h-8 w-8 ${color} mb-4 transition-transform hover:rotate-12`} />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>
        {animatedValue.toLocaleString()}
      </p>
    </div>
  );
};

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRedeemMessage(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-background') closeModal();
  };

  const handleRedeem = (gift) => {
    const giftId = Math.floor(1000 + Math.random() * 9000);
    setRedeemMessage(`Gift Card ID: ${giftId} - Redeemed "${gift}" successfully!`);
  };

  const scrollToRecentActivity = () => {
    document.getElementById('recent-activity').scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    {
      icon: Award,
      title: "Eco Points",
      value: 1250,
      color: "text-green-400",
      onClick: openModal
    },
    {
      icon: Package,
      title: "Items Recycled",
      value: 27,
      color: "text-blue-400",
      onClick: scrollToRecentActivity
    },
    {
      icon: Clock,
      title: "Pending Pickups",
      value: 2,
      color: "text-purple-400",
      onClick: () => {}
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 bg-black text-white">
      <div className="bg-zinc-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-400">Welcome back, John Doe</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              onClick={stat.onClick}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div id="recent-activity" className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-zinc-800 rounded-lg">
                  <Package className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">Recycled 2 laptops</p>
                    <p className="text-sm text-gray-400">March {i + 10}, 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Nearby Centers</h3>
              <Link to="/centers">
                <Button variant="outline" size="sm">View Map</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-zinc-800 rounded-lg">
                  <MapPin className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">EcoRecycle Center {i}</p>
                    <p className="text-sm text-gray-400">2.{i} miles away</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-[#121212] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Redeem Gift Coupons</h2>
            <p className="text-gray-400 mb-4">Choose a gift coupon to redeem with your points:</p>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-zinc-800 shadow rounded-lg">
                <span>10% Off Next Purchase (100 Points)</span>
                <Button size="sm" onClick={() => handleRedeem('10% Off Next Purchase')}>Redeem</Button>
              </li>
              <li className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span>$5 Discount Voucher (200 Points)</span>
                <Button size="sm" onClick={() => handleRedeem('$5 Discount Voucher')}>Redeem</Button>
              </li>
              <li className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span>Free Eco Tote Bag (150 Points)</span>
                <Button size="sm" onClick={() => handleRedeem('Free Eco Tote Bag')}>Redeem</Button>
              </li>
            </ul>
            {redeemMessage && (
              <p className="mt-4 text-green-400 text-sm">{redeemMessage}</p>
            )}
            <button
              className="mt-4 w-full text-center text-sm text-gray-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;