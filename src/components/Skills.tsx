import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Layout, Database, BrainCircuit, ShieldAlert, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const skillCategories = [
    {
        title: "Languages",
        icon: <Code2 className="w-6 h-6" />,
        skills: ["JavaScript", "TypeScript", "Python", "C", "C++", "PHP", "Dart"]
    },
    {
        title: "Frontend Development",
        icon: <Layout className="w-6 h-6" />,
        skills: ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Next.js", "Webflow"]
    },
    {
        title: "Backend & Database",
        icon: <Database className="w-6 h-6" />,
        skills: ["Node.js", "REST APIs", "Auth", "MongoDB", "MySQL"]
    },
    {
        title: "AI & Data Science",
        icon: <BrainCircuit className="w-6 h-6" />,
        skills: ["NumPy", "Pandas", "Matplotlib", "OpenCV", "Speech Recognition", "pyttsx3"]
    },
    {
        title: "Cyber Security & Networks",
        icon: <ShieldAlert className="w-6 h-6" />,
        skills: ["Kali Linux", "Penetration Testing", "Network Security", "Vulnerability Scanning", "Wireshark"]
    },
    {
        title: "Tools & Core Concepts",
        icon: <Wrench className="w-6 h-6" />,
        skills: ["Git", "GitHub", "VS Code", "Jupyter", "DSA", "OOP", "OS", "DBMS"]
    }
];

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            className={`relative overflow-hidden rounded-[2rem] border border-gray-800 bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:border-gray-500 hover:shadow-white/5 interactable ${className}`}
            onMouseMove={handleMouseMove}
            onFocus={() => { setIsFocused(true); setOpacity(1); }}
            onBlur={() => { setIsFocused(false); setOpacity(0); }}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.08), transparent 40%)`,
                }}
            />
            <div className="relative z-10 p-8 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const { vibe } = useTheme();

    const bgClass = vibe === 'light' ? 'bg-gray-100' : 'bg-[#020202]';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const borderColorClass = vibe === 'light' ? 'border-gray-300' : 'border-gray-900';

    return (
        <section ref={sectionRef} className={`py-24 md:py-32 px-4 md:px-12 lg:px-24 w-full relative z-30 border-t overflow-hidden transition-colors duration-500 ${bgClass} ${textColorClass} ${borderColorClass}`}>
            {/* Ambient Background Gradient */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center text-center mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-white/5 backdrop-blur-sm mb-6"
                >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-gray-300 uppercase tracking-widest text-xs font-semibold">Technical Arsenal</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif italic max-w-4xl drop-shadow-2xl leading-tight"
                >
                    My Expertise & Capabilities
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-10">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, y: 80, rotateZ: index % 2 === 0 ? -6 : 6, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: index * 0.1 }}
                        className="w-full"
                    >
                        <SpotlightCard className="h-full">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-white shadow-inner border border-gray-700/50">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-white/90">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pb-4 md:pb-0">
                                {category.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
