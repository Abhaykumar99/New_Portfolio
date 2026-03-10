import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Hostel Management System",
        category: "React - Node.js - MongoDB - Tailwind CSS",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2669&auto=format&fit=crop",
        year: "2025",
        github: "https://github.com/Abhaykumar99/hostel-management"
    },
    {
        id: 2,
        title: "Secure Kernel Boot Verification",
        category: "Python - Linux - System Security",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
        year: "2025",
        github: "https://github.com/Abhaykumar99/Secure-Kernel-Boot-Verification-System"
    },
    {
        id: 3,
        title: "Vehicle Rental Management System",
        category: "Python - Database - Logic",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop",
        year: "2025",
        github: "https://github.com/Abhaykumar99/Vehicle-Rental-Management-System-Project-main"
    }
];

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const { vibe } = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            if (headerRef.current) {
                const headerElements = Array.from(headerRef.current.children);
                // Also target the inner text div children specifically so the small text and main text stagger
                const innerTextDiv = headerElements[0] as HTMLDivElement;
                const innerTextElements = Array.from(innerTextDiv.children);
                const buttonElement = headerElements[1] as HTMLButtonElement;

                const allHeaderItems = [...innerTextElements, buttonElement];

                gsap.fromTo(allHeaderItems,
                    { y: 50, x: -30, opacity: 0, filter: "blur(10px)" },
                    {
                        y: 0,
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        stagger: 0.2, // This staggers the animations
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            toggleActions: "play reverse play reverse",
                        }
                    }
                );
            }

            // Projects animation
            if (projectsRef.current) {
                const projectElements = Array.from(projectsRef.current.children);
                projectElements.forEach((el, index) => {
                    const isOdd = index % 2 !== 0;
                    gsap.fromTo(el,
                        {
                            opacity: 0,
                            y: 100,
                            scale: 0.9,
                            rotationY: isOdd ? 10 : -10,
                            rotationX: 5,
                            transformPerspective: 1500
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotationY: 0,
                            rotationX: 0,
                            duration: 1.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 80%",
                                toggleActions: "play reverse play reverse",
                            }
                        }
                    );
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const bgClass = vibe === 'light' ? 'bg-gray-100' : 'bg-black';
    const textColorClass = vibe === 'light' ? 'text-black' : 'text-white';
    const borderColorClass = vibe === 'light' ? 'border-black' : 'border-white';
    const textHoverClass = vibe === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-300';

    return (
        <section ref={sectionRef} className={`py-24 px-6 md:px-12 lg:px-24 w-full relative z-30 transition-colors duration-500 ${bgClass} ${textColorClass}`}>
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
                <div>
                    <p className="text-gray-400 uppercase tracking-widest text-sm mb-4 font-semibold">Selected Work</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold italic font-serif tracking-tight">Featured<br />Projects</h2>
                </div>
                <button className={`interactable mt-8 md:mt-0 group flex items-center gap-3 text-lg border-b pb-1 transition-colors ${borderColorClass} ${textHoverClass}`}>
                    View All Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            <div ref={projectsRef} className="flex flex-col gap-16 md:gap-32">
                {projects.map((project, index) => (
                    <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-col-reverse lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group interactable cursor-pointer`}>
                        <div className="w-full lg:w-3/5 overflow-hidden rounded-xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                            />
                        </div>
                        <div className="w-full lg:w-2/5 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-400 tracking-wider text-sm">{project.category}</span>
                                <span className="text-gray-500 font-serif italic">{project.year}</span>
                            </div>
                            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-colors ${textHoverClass}`}>{project.title}</h3>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center transition-all ${vibe === 'light' ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'}`}>
                                <ArrowUpRight className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
