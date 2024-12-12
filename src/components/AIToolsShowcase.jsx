import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCog, Box, Terminal, PiIcon as PythonLogo } from 'lucide-react';

const tools = [
  { name: 'TensorFlow', icon: BrainCog, color: '#FF6F00', description: 'Open-source library for machine learning and artificial intelligence' },
  { name: 'YOLO', icon: Box, color: '#00FFFF', description: 'Real-time object detection system' },
  { name: 'Conda', icon: Terminal, color: '#43B02A', description: 'Package management system and environment management system' },
  { name: 'Python', icon: PythonLogo, color: '#3776AB', description: 'High-level programming language for general-purpose programming' },
];

export default function AIToolsShowcase() {
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Powerful AI Tools at Work
      </motion.h2>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="relative bg-gray-800 rounded-lg p-6 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredTool(tool.name)}
              onHoverEnd={() => setHoveredTool(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br"
                style={{ background: `linear-gradient(135deg, ${tool.color}22, ${tool.color}00)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredTool === tool.name ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <tool.icon size={48} color={tool.color} className="mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-400">{tool.description}</p>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredTool === tool.name ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 5}s infinite linear`,
            }}
          />
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
