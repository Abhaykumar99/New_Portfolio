import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "Project Developer",
        company: "Secure Kernel Boot Verification System",
        period: "2025",
        description: "Developed a security-based system that verifies the integrity of the system kernel during the boot process to enhance system security.",
    },
    {
        id: 2,
        role: "Software Developer",
        company: "Vehicle Rental Management System",
        period: "2025",
        description: "Created a management system to handle vehicle rentals, booking records, and customer data efficiently.",
    },
    {
        id: 3,
        role: "Full Stack Developer",
        company: "Hostel Management System",
        period: "2025",
        description: "Built a hostel management dashboard to manage rooms, students, and hostel operations with an interactive UI.",
    }
];

export default function Experiences() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const { vibe } = useTheme();

    const bgClass = vibe === 'light' ? 'bg-gray-100' : 'bg-black';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const borderColorClass = vibe === 'light' ? 'border-gray-300' : 'border-gray-900';
    const itemBorderClass = vibe === 'light' ? 'border-gray-300' : 'border-gray-800';
    const textHoverClass = vibe === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-300';
    const textMutedClass = vibe === 'light' ? 'text-gray-600' : 'text-gray-400';
    const textMutedHoverClass = vibe === 'light' ? 'group-hover:text-black hover:text-black' : 'group-hover:text-white hover:text-white';

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-header",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            if (listRef.current) {
                const items = Array.from(listRef.current.children);
                items.forEach((el) => {
                    gsap.fromTo(el,
                        { opacity: 0, y: 50, scale: 0.9, rotationX: -15, transformPerspective: 1000 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotationX: 0,
                            duration: 1,
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
        <section ref={sectionRef} className={`py-24 px-6 md:px-12 lg:px-24 w-full relative z-30 border-t transition-colors duration-500 ${bgClass} ${textColorClass} ${borderColorClass}`}>
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">

                <div className="w-full lg:w-1/3 exp-header">
                    <p className={`uppercase tracking-widest text-sm mb-4 font-semibold ${textMutedClass}`}>Career</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif italic mb-8">Work<br />Experience</h2>
                    <p className={`leading-relaxed text-lg max-w-sm ${textMutedClass}`}>
                        A timeline of my professional journey, building tools and experiences for millions of users worldwide.
                    </p>
                </div>

                <div ref={listRef} className="w-full lg:w-2/3 flex flex-col pt-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`flex flex-col md:flex-row gap-4 md:gap-12 py-10 interactable group cursor-pointer ${index !== experiences.length - 1 ? `border-b ${itemBorderClass}` : ''}`}
                        >
                            <div className="md:w-1/4 pt-1">
                                <span className={`font-serif italic text-lg ${textMutedClass}`}>{exp.period}</span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 transition-colors ${textHoverClass}`}>{exp.role}</h3>
                                <h4 className={`text-xl mb-6 transition-colors ${textMutedClass} ${textMutedHoverClass}`}>{exp.company}</h4>
                                <p className={`leading-relaxed max-w-2xl transition-colors ${textMutedClass} ${textMutedHoverClass}`}>
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
