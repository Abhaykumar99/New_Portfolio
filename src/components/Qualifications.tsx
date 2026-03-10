import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Award, BookOpen, Hexagon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
    {
        id: 1,
        title: "Bachelor of Technology in Computer Science & Engineering",
        institution: "Shobhit Institute of Engineering & Technology",
        year: "2023 - 2027",
        description: "Studying core computer science subjects including Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development, and Database Management.",
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Full Stack Development",
        institution: "Self Learning",
        year: "2024 - Present",
        description: "Learning modern web technologies including React, JavaScript, Node.js, and backend development through hands-on projects.",
        icon: <Hexagon className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Cyber Security & Ethical Hacking",
        institution: "Practical Learning",
        year: "2025 - Present",
        description: "Practicing penetration testing, networking, Linux security tools, and vulnerability scanning using Kali Linux.",
        icon: <Award className="w-6 h-6" />
    }
];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const { vibe } = useTheme();

    const bgClass = vibe === 'light' ? 'bg-gray-200' : 'bg-[#050505]';
    const cardBgClass = vibe === 'light' ? 'bg-white border-gray-300 hover:border-black' : 'bg-[#111111] border-gray-800 hover:border-gray-500';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const textMutedClass = vibe === 'light' ? 'text-gray-600' : 'text-gray-400';
    const textMutedDarkerClass = vibe === 'light' ? 'text-gray-500' : 'text-gray-500';

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            if (cardsRef.current) {
                const cards = Array.from(cardsRef.current.children);
                cards.forEach((el) => {
                    gsap.fromTo(
                        el,
                        { opacity: 0, y: 100, scale: 0.8, rotationY: 15, transformPerspective: 1000 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotationY: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 85%",
                                toggleActions: "play reverse play reverse",
                            }
                        }
                    );
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={`py-24 px-6 md:px-12 lg:px-24 w-full relative z-30 transition-colors duration-500 ${bgClass} ${textColorClass}`}>
            <div className="text-center mb-16 md:mb-24 qual-header">
                <p className={`uppercase tracking-widest text-sm mb-4 font-semibold ${textMutedClass}`}>Education & Certifications</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif italic">Qualifications</h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualifications.map((item) => (
                    <div
                        key={item.id}
                        className={`interactable p-8 rounded-2xl border transition-colors duration-500 group relative overflow-hidden ${cardBgClass}`}
                    >
                        {/* Subtle gradient glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${vibe === 'light' ? 'bg-black/5 text-gray-500 group-hover:text-black' : 'bg-white/10 text-gray-300 group-hover:text-white'}`}>
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic">
                            <span className={textMutedClass}>{item.institution}</span>
                            <span className={textMutedDarkerClass}>{item.year}</span>
                        </div>
                        <p className={`leading-relaxed text-sm ${textMutedClass}`}>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
