import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const { vibe, setVibe } = useTheme();
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000); // Check every second to be precise when the minute rolls over

        return () => clearInterval(timer);
    }, []);

    // Theming logic
    const isLight = vibe === 'light';
    const textColorClass = isLight ? 'text-black' : 'text-white';
    const borderColorClass = isLight ? 'border-black/20' : 'border-white/20';
    const bgGlassClass = isLight ? 'bg-white/50 backdrop-blur-md' : 'bg-black/20 backdrop-blur-md';
    const btnClass = isLight
        ? 'border-black text-black hover:bg-black hover:text-white'
        : 'border-white text-white hover:bg-white hover:text-black';


    useEffect(() => {
        // Simple entrance animation for navbar
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
        );
    }, []);

    const scrollToFooter = () => {
        const footer = document.querySelector('footer');
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: footerTop,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav ref={navRef} className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-4 transition-colors duration-500 border-b ${bgGlassClass} ${isLight ? 'border-black/10' : 'border-white/5'}`}>

            {/* Left - Profile/Logo */}
            <div className={`relative z-10 hidden md:flex items-center gap-4 ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} pr-6 pl-2 py-2 rounded-full backdrop-blur-md interactable cursor-pointer`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className={`w-10 h-10 rounded-full border ${borderColorClass} p-0.5 relative`}>
                    <img src="/sequence/s1/abhay1.jpeg" alt="Abhay Kumar" className="w-full h-full object-cover rounded-full" />
                    {/* Active green dot */}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black z-20 translate-x-1/4 translate-y-1/4"></div>
                </div>
                <span className={`font-bold tracking-wide ${textColorClass}`}>Abhay Kumar</span>
            </div>

            {/* Mobile Logo Name */}
            <div className={`md:hidden relative z-10 font-bold text-lg interactable ${textColorClass}`}>
                Abhay Kumar
            </div>

            {/* Center - Location/Time (Optional / Hidden on mobile) */}
            <div className={`relative z-10 hidden lg:flex flex-col text-center text-sm font-medium ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                <span>Meerut, IN</span>
                <span>{time}</span>
            </div>

            {/* Right - Let's Talk CTA & Theme Toggle */}
            <div className="relative z-10 flex items-center gap-4">
                <button
                    onClick={() => setVibe(isLight ? 'dark' : 'light')}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 shadow-sm interactable ${isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'}`}
                    aria-label="Toggle Theme"
                >
                    {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>

                <button
                    onClick={scrollToFooter}
                    className={`flex items-center gap-2 bg-transparent font-semibold py-2 px-6 rounded-full border transition-all duration-300 interactable group ${btnClass}`}
                >
                    Let's talk
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </nav>
    );
}
