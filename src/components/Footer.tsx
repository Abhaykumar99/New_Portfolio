import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const leftPaneRef = useRef<HTMLDivElement>(null);
    const rightPaneRef = useRef<HTMLDivElement>(null);
    const { vibe } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftPaneRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(rightPaneRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        // GET YOUR FREE ACCESS KEY FROM https://web3forms.com/
        formData.append("access_key", "fa1678e2-7a43-4792-9c7b-a819ec92c551");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });
            const data = await res.json();

            if (data.success) {
                setSubmitStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setSubmitStatus('idle'), 5000); // Reset status after 5s
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Dynamic classes based on selected vibe
    const bgClass = vibe === 'light' ? 'bg-gray-100 text-black' : 'bg-black text-white';
    const inputClass = vibe === 'light' ? 'border-gray-400 focus:border-black text-black' : 'border-gray-700 focus:border-white text-white';
    const btnClass = vibe === 'light' ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#3b82f6] text-white hover:bg-blue-600';
    const mutedTextClass = vibe === 'light' ? 'text-gray-600' : 'text-gray-400';

    return (
        <footer ref={footerRef} className={`pt-24 pb-12 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden transition-colors duration-500 ${bgClass}`}>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-24">

                {/* Left Pane - Info & Vibe */}
                <div ref={leftPaneRef} className="w-full lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] interactable mb-16 flex flex-wrap items-center">
                            Let's work <br /> together <ArrowUpRight className="inline-block w-16 h-16 ml-4" />
                        </h2>

                        <div className="flex items-center gap-6 mb-16">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 p-1">
                                <img src="/sequence/s1/abhay.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-1">Abhay Kumar</h3>
                                <p className={`text-lg transition-colors ${mutedTextClass}`}>abhaygupta90069@gmail.com</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Pane - Form */}
                <div ref={rightPaneRef} className="w-full lg:w-5/12">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="name" className="text-2xl font-bold">What's your name?</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                className={`bg-transparent border-b pb-4 text-xl outline-none transition-colors w-full placeholder:opacity-50 ${inputClass}`}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label htmlFor="email" className="text-2xl font-bold">What's your email?</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@mail.com"
                                required
                                className={`bg-transparent border-b pb-4 text-xl outline-none transition-colors w-full placeholder:opacity-50 ${inputClass}`}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label htmlFor="services" className="text-2xl font-bold">What services are you looking for?</label>
                            <input
                                type="text"
                                id="services"
                                name="services"
                                placeholder="Web Development, Cyber Security..."
                                required
                                className={`bg-transparent border-b pb-4 text-xl outline-none transition-colors w-full placeholder:opacity-50 ${inputClass}`}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 sm:items-center mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-12 py-5 rounded-full text-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg relative disabled:opacity-70 disabled:hover:scale-100 ${btnClass}`}
                            >
                                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Submit'}
                            </button>
                            <div className="flex flex-col">
                                {submitStatus === 'success' && (
                                    <span className="text-green-500 font-semibold mb-1">✓ Message sent successfully!</span>
                                )}
                                {submitStatus === 'error' && (
                                    <span className="text-red-500 font-semibold mb-1">✗ Failed to send. Try again.</span>
                                )}
                                <p className={`text-sm ${mutedTextClass} max-w-xs`}>
                                    By clicking Submit, you agree to <a href="#" className="underline font-semibold hover:text-current">Privacy Policy</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Bottom Links */}
            <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${vibe === 'light' ? 'border-gray-300' : 'border-neutral-800'}`}>
                <div className="flex flex-wrap gap-8 mb-6 md:mb-0">
                    <a href="https://x.com/Abhay_Kumar_012" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>Twitter</a>
                    <a href="https://www.linkedin.com/in/abhay-012-prvt/" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>LinkedIn</a>
                    <a href="https://www.instagram.com/abhi_kumar_012" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>Instagram</a>
                    <a href="https://github.com/Abhaykumar99" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>GitHub</a>
                    <a href="https://leetcode.com/u/abhay012prvt/" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>LeetCode</a>
                    <a href="https://www.geeksforgeeks.org/profile/abhay012prvt" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity text-sm font-semibold uppercase tracking-wider ${vibe === 'light' ? 'text-black' : 'text-white'}`}>GeeksForGeeks</a>
                </div>

                <div className="flex items-center gap-8">
                    <p className={`text-sm ${mutedTextClass}`}>© {new Date().getFullYear()} Abhay Kumar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
