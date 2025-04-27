// import React, { useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';

// const BreakingNewsTicker = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const controls = useAnimation();
  
//   const messages = [
//     "🚗 Wanna book a ride? Get a look on SS Rides 🚗",
//     "🚖 Need a taxi? Check out SS Rides today 🚖",
//     "💨 Fast, reliable rides with SS Rides 💨",
//     "📍 Going somewhere? SS Rides has you covered 📍"
//   ];

//   return (
//     <div 
//       className="overflow-hidden bg-black text-white py-3"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <motion.div
//         className="flex whitespace-nowrap"
//         animate={controls}
//         initial={{ x: "0%" }}
//         onAnimationComplete={() => {
//           if (!isHovered) {
//             controls.start({
//               x: "-100%",
//               transition: {
//                 duration: 20,
//                 ease: "linear"
//               }
//             });
//           }
//         }}
//       >
//         {[...Array(8)].map((_, i) => (
//           <span key={i} className="mx-4 text-lg font-semibold">
//             {messages[i % messages.length]}
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default BreakingNewsTicker



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const RevolvingTextTicker = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const messages = [
//     "🚗 Wanna book a ride? Get a look on SS Rides 🚗",
//     "🚖 Need a taxi? Check out SS Rides today 🚖",
//     "💨 Fast, reliable rides with SS Rides 💨",
//     "📍 Going somewhere? SS Rides has you covered 📍"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % messages.length);
//     }, 3000); // Rotate every 3 seconds

//     return () => clearInterval(interval);
//   }, [messages.length]);

//   return (
//     <div className="overflow-hidden bg-black text-white py-3 px-4 rounded-md">
//       <div className="relative h-8 flex items-center justify-center">
//         <AnimatePresence mode="wait">
//           <motion.span
//             key={activeIndex}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -20, opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="absolute text-lg font-semibold whitespace-nowrap"
//           >
//             {messages[activeIndex]}
//           </motion.span>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default RevolvingTextTicker;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumRevolvingTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Enhanced messages with emojis
  const messages = [
    { text: "Wanna book a ride?", emoji: "🚗", color: "text-blue-400" },
    { text: "Need a taxi?", emoji: "🚖", color: "text-green-400" },
    { text: "Fast, reliable rides!", emoji: "💨", color: "text-yellow-400" },
    { text: "Going somewhere?", emoji: "📍", color: "text-pink-400" }
  ];

  // Rotation effect with pause on hover
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, 2500); // Faster rotation (2.5 seconds)
    
    return () => clearInterval(interval);
  }, [isHovered, messages.length]);

  // Spring animation for bouncy effect
  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100
  };

  return (
    <div 
      className="overflow-hidden bg-gradient-to-r from-black to-gray-900 py-2 px-6 rounded-xl shadow-lg border border-gray-800 max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ y: 30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 1.2 }}
            transition={spring}
            className="absolute flex items-center gap-3"
          >
            <span className="text-2xl">{messages[activeIndex].emoji}</span>
            <span className={`text-xl font-bold ${messages[activeIndex].color}`}>
              {messages[activeIndex].text} <span className="text-white">SS Rides</span>
            </span>
            <span className="text-2xl transform rotate-90">➤</span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {messages.map((_, index) => (
          <button 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-white w-4' : 'bg-gray-600'}`}
            aria-label={`Go to message ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumRevolvingTicker;