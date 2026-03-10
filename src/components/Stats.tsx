import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: "10+", label: "Projects Built" },
    { number: "300+", label: "Coding Problems Practiced" },
    { number: "5+", label: "Hackathons Participated" },
    { number: "2+", label: "Years of Development Experience" }
];

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { vibe } = useTheme();

    // Theming logic
    const bgClass = vibe === 'light' ? 'bg-gray-100' : 'bg-[#050505]';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const subTextColorClass = vibe === 'light' ? 'text-gray-600' : 'text-gray-400';
    const gradientClass = vibe === 'light' ? 'from-black to-gray-500' : 'from-white to-gray-500';

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current.children,
                    { opacity: 0, y: 50, scale: 0.5, rotationY: 45, transformPerspective: 800 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationY: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            toggleActions: "play reverse play reverse",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={`py-20 px-6 md:px-12 lg:px-24 w-full relative z-30 transition-colors duration-500 ${bgClass} ${textColorClass}`}>
            <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <h3 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-b ${gradientClass}`}>
                            {stat.number}
                        </h3>
                        <p className={`font-serif italic text-lg md:text-xl ${subTextColorClass}`}>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
