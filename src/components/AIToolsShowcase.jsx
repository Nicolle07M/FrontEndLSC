import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const technologies = [
  {
    name: 'TensorFlow',
    description: 'An open-source platform for machine learning and AI.',
  },
  {
    name: 'YOLO',
    description: 'A real-time object detection system.',
  },
  {
    name: 'Python',
    description: 'A versatile programming language for various applications.',
  },
  {
    name: 'Anaconda',
    description: 'A distribution for scientific computing and data science.',
  },
  {
    name: 'Jupyter',
    description: 'An interactive web-based notebook for computational workflows.',
  },
];

function Button({ variant, size, className, onClick, children }) {
  const buttonClass = `${className} ${variant === 'ghost' ? 'bg-transparent border' : ''} ${size === 'icon' ? 'p-2' : ''}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default function TechCarousel() {
  const [current, setCurrent] = useState(2);

  const next = () => setCurrent((c) => (c + 1) % technologies.length);
  const prev = () => setCurrent((c) => (c - 1 + technologies.length) % technologies.length);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/50 text-blue-400 hover:text-blue-300"
          onClick={prev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Título agregado */}
        <h2 className="text-white text-5xl md:text-6xl font-bold text-center mb-16">
          Herramientas usadas
        </h2>

        <div className="w-full py-32 mt-56 ">
          <div 
            className="flex items-center justify-center"
            style={{ perspective: '1500px' }}
          >
            {technologies.map((tech, index) => {
              const distance = ((index - current + technologies.length) % technologies.length);
              const normalizedDistance = distance > technologies.length / 2 
                ? distance - technologies.length 
                : distance;
              const isCenter = distance === 0;
              const absDistance = Math.abs(normalizedDistance);
              
              return (
                <div
                  key={tech.name}
                  className="absolute w-[300px] md:w-[400px] aspect-[3/4] transition-all duration-500"
                  style={{
                    transform: `
                      translateX(${normalizedDistance * 60}%) 
                      translateZ(${-Math.abs(normalizedDistance) * 100}px)
                      rotateY(${normalizedDistance * 25}deg)
                      scale(${1 - absDistance * 0.15})
                    `,
                    zIndex: technologies.length - absDistance,
                    opacity: 1 - absDistance * 0.3,
                  }}
                >
                  <div 
                    className={`
                      w-full h-[350px] rounded-xl transition-all duration-500
                      ${isCenter ? 'bg-black shadow-[0_0_50px_10px_rgba(59,130,246,0.5)]' : 'bg-gray-900'}
                      border-2 border-blue-500/30
                    `}
                  >
                    <div className={`
                      absolute inset-[2px] rounded-xl
                      ${isCenter ? 'bg-gradient-to-br from-blue-500/20 to-transparent' : 'bg-black/50'}
                      backdrop-blur-sm
                      h-full
                    `}>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-4">{tech.name}</h3>
                        <p className="text-lg text-blue-400 font-semibold">{tech.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/50 text-blue-400 hover:text-blue-300"
          onClick={next}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-3">
          {technologies.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'bg-blue-400 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)]' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
