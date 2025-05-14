import React, { useState, useEffect } from 'react';
import { Users, Package, Clock, TrendingUp } from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

// Modal Component
const Modal = ({ message, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-zinc-800 p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-lg font-bold mb-4">Pickup Approved</h2>
        <p>{message}</p>
        <div className="mt-4 text-right">
          <Button size="sm" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Animated Counter Component
const AnimatedCounter = ({ endValue }) => {
  const controls = useAnimation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    controls.start({
      value: endValue,
      transition: { duration: 1.2, ease: 'easeOut' },
    });
  }, [controls, endValue]);

  return (
    <motion.span
      animate={controls}
      onUpdate={(latest) => setValue(Math.floor(latest.value))}
      className="text-3xl font-bold"
    >
      {value}
    </motion.span>
  );
};

const BusinessDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(
    JSON.parse(localStorage.getItem('isModalOpen')) || false
  );
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('isModalOpen', JSON.stringify(isModalOpen));
  }, [isModalOpen]);

  const handleApprove = (pickupId) => {
    setModalMessage(`Pickup request ${pickupId} approved`);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const metrics = [
    { icon: Users, label: 'Total Users', value: 847, color: 'blue' },
    { icon: Package, label: 'Items Processed', value: 1392, color: 'green' },
    { icon: Clock, label: 'Pending Requests', value: 12, color: 'yellow' },
    { icon: TrendingUp, label: 'Monthly Growth', value: 24, suffix: '%', color: 'purple' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-zinc-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Business Dashboard</h1>
          <p className="mt-2 text-gray-400">EcoRecycle Solutions Center</p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              className={`bg-zinc-900 p-6 rounded-xl shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <item.icon className={`h-8 w-8 text-${item.color}-400 mb-4`} />
              <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
              <AnimatedCounter endValue={item.value} />
              {item.suffix && <span className="text-3xl font-bold">{item.suffix}</span>}
            </motion.div>
          ))}
        </div>

        {/* Two-Column Layout: Pending Pickups and Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Pickups */}
          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Pending Pickups</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-4 bg-[#121212] rounded-lg"
                >
                  <div className="flex items-start space-x-4">
                    <Package className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Pickup Request #{i}234</p>
                      <p className="text-sm text-gray-400">2 laptops, 1 printer</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleApprove(`#${i}234`)}>Approve</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-zinc-800 rounded-lg">
                  <Users className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">User #{i}521 recycled items</p>
                    <p className="text-sm text-gray-400">150 points awarded</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default BusinessDashboard;