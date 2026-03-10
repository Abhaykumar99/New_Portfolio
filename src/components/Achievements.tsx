import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
    {
        title: "1st Rank – Project Expo 2025",
        description: "Won first place at Shobhit University Innovation & Showcase for Secure Kernel Boot Verification System.",
        date: "2025"
    },
    {
        title: "Second Place – Chess Competition",
        description: "Achieved second place in Chess at the Inter-University Sports Meet.",
        date: "Sports Meet"
    },
    {
        title: "Smart India Hackathon Internal Winner",
        description: "Won Internal Smart India Hackathon 2024 and 2025 by developing an Indian Sign Language learning platform.",
        date: "2024 & 2025"
    },
    {
        title: "Top 5 – Tech Udyam 2024",
        description: "Recognized among the top teams for delivering a high-impact technical solution.",
        date: "2024"
    },
    {
        title: "Top 10 – Hack Heist 2024",
        description: "Selected among the top teams in the hackathon organized by Google Developer Group.",
        date: "2024"
    }

];

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { vibe } = useTheme();

    const bgClass = vibe === 'light' ? 'bg-gray-100' : 'bg-[#020202]';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const borderColorClass = vibe === 'light' ? 'border-gray-200' : 'border-gray-900';
    const cardBgClass = vibe === 'light' ? 'bg-white border-gray-300' : 'bg-[#0a0a0a] border-gray-800';
    const textMutedClass = vibe === 'light' ? 'text-gray-600' : 'text-gray-400';
    const textMutedDarkerClass = vibe === 'light' ? 'text-gray-500' : 'text-gray-500';

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % achievements.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".ach-header",
                { opacity: 0, filter: "blur(10px)", y: 50 },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={`py-24 md:py-32 px-4 md:px-12 lg:px-24 w-full relative z-30 border-t overflow-hidden min-h-[100vh] flex flex-col justify-center pb-40 transition-colors duration-500 ${bgClass} ${textColorClass} ${borderColorClass}`}>

            {/* Background Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none ${vibe === 'light' ? 'bg-black/5' : 'bg-white/5'}`} />

            <div className="flex flex-col items-center text-center mb-20 ach-header relative z-10">
                <p className={`uppercase tracking-widest text-sm mb-4 font-semibold ${textMutedClass}`}>Milestones</p>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif italic max-w-3xl drop-shadow-lg">Achievements</h2>
            </div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center perspective-[1200px]">

                <AnimatePresence mode="popLayout">
                    {achievements.map((ach, index) => {
                        const isActive = index === activeIndex;
                        const isPrev = index === (activeIndex - 1 + achievements.length) % achievements.length;
                        const isNext = index === (activeIndex + 1) % achievements.length;
                        const isHidden = !isActive && !isPrev && !isNext;

                        // Calculate Z-index based on position
                        let zIndex = 0;
                        if (isActive) zIndex = 30;
                        else if (isPrev || isNext) zIndex = 20;

                        if (isHidden) return null;

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 0.8, x: isActive ? 0 : (isNext ? 200 : -200) }}
                                animate={{
                                    opacity: isActive ? 1 : 0.4,
                                    scale: isActive ? 1 : 0.8,
                                    x: isActive ? 0 : (isNext ? "60%" : "-60%"),
                                    rotateY: isActive ? 0 : (isNext ? -25 : 25),
                                    z: isActive ? 100 : 0
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className={`absolute top-0 bottom-0 m-auto h-[350px] w-full max-w-sm rounded-[2rem] border backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl transition-colors duration-500 ${cardBgClass}`}
                                style={{
                                    zIndex,
                                    boxShadow: isActive ? "0 25px 50px -12px rgba(255,255,255,0.05)" : "none",
                                    transformStyle: "preserve-3d"
                                }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                    <Trophy className="w-32 h-32" style={{ transform: "translateZ(-20px)" }} />
                                </div>

                                <div style={{ transform: "translateZ(30px)" }}>
                                    <Trophy className={`w-10 h-10 mb-6 ${isActive ? 'text-yellow-400' : textMutedClass} transition-colors duration-500`} />
                                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isActive ? textColorClass : textMutedClass} transition-colors duration-500`}>
                                        {ach.title}
                                    </h3>
                                </div>

                                <div style={{ transform: "translateZ(40px)" }}>
                                    <p className={`text-lg font-serif italic ${isActive ? (vibe === 'light' ? 'text-gray-800' : 'text-gray-300') : textMutedClass} leading-relaxed transition-colors duration-500`}>
                                        "{ach.description}"
                                    </p>
                                    <p className={`mt-4 text-sm tracking-widest uppercase font-semibold ${textMutedDarkerClass}`}>
                                        {ach.date}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-[-60px] flex gap-6 items-center z-40">
                    <button
                        onClick={handlePrev}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${vibe === 'light' ? 'border-gray-300 hover:bg-black hover:text-white' : 'border-gray-700 hover:bg-white hover:text-black'}`}
                        aria-label="Previous Achievement"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                        {achievements.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? (vibe === 'light' ? 'w-8 bg-black' : 'w-8 bg-white') : (vibe === 'light' ? 'w-2 bg-gray-300 cursor-pointer' : 'w-2 bg-gray-700 cursor-pointer')}`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${vibe === 'light' ? 'border-gray-300 hover:bg-black hover:text-white' : 'border-gray-700 hover:bg-white hover:text-black'}`}
                        aria-label="Next Achievement"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </section>
    );
}
