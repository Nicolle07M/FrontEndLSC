import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const technologies = [
  {
    name: 'TensorFlow',
    description: 'An open-source platform for machine learning and AI.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg'
  },
  {
    name: 'YOLO',
    description: 'A real-time object detection system.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/YOLO_logo.png'
  },
  {
    name: 'Python',
    description: 'A versatile programming language for various applications.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
  },
  {
    name: 'Anaconda',
    description: 'A distribution for scientific computing and data science.',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Anaconda_Logo.png'
  },
  {
    name: 'Jupyter',
    description: 'An interactive web-based notebook for computational workflows.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg'
  },
];

function Button({ className, onClick, children }) {
  return (
    <button
      className={`h-12 w-12 rounded-full bg-black/50 text-blue-400 hover:text-blue-300 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function TechCarousel() {
  const [current, setCurrent] = useState(2);

  const next = () => setCurrent((c) => (c + 1) % technologies.length);
  const prev = () => setCurrent((c) => (c - 1 + technologies.length) % technologies.length);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      <div className="relative w-full flex items-center justify-center" style={{ perspective: '1500px' }}>
        <Button className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30" onClick={prev}>
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div className="relative w-full py-32 flex items-center justify-center">
          {technologies.map((tech, index) => {
            const distance = ((index - current + technologies.length) % technologies.length);
            const normalizedDistance = distance > technologies.length / 2 ? distance - technologies.length : distance;
            const isCenter = distance === 0;
            const absDistance = Math.abs(normalizedDistance);

            return (
              <div
                key={tech.name}
                className="absolute w-[300px] md:w-[400px] aspect-[3/4] transition-all duration-500"
                style={{
                  transform: `
                    translateX(${normalizedDistance * 60}%)
                    translateZ(${-absDistance * 100}px)
                    rotateY(${normalizedDistance * 25}deg)
                    scale(${1 - absDistance * 0.15})
                  `,
                  zIndex: technologies.length - absDistance,
                  opacity: 1 - absDistance * 0.3,
                }}
              >
                <div
                  className={`
                    w-full h-[350px] rounded-xl transition-all duration-500 relative overflow-hidden border-2
                    ${isCenter ? 'bg-black shadow-[0_0_50px_10px_rgba(59,130,246,0.5)] border-blue-500/50' : 'bg-gray-900 border-gray-700'}
                    hover:shadow-[0_0_50px_10px_rgba(59,130,246,0.7)]
                    hover:border-blue-400/70
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl transition-all duration-500"></div>
                  <div className="p-6 relative z-10 flex flex-col items-center">
                    <img src={tech.image} alt={tech.name} className="w-24 h-24 mb-4 object-contain" />
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{tech.name}</h3>
                    <p className="text-lg text-blue-400 font-semibold text-center">{tech.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30" onClick={next}>
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

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
  );
}
