import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLHeadingElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Counter animation
        let currentProgress = { val: 0 };

        const tl = gsap.timeline({
            onComplete: () => {
                // Exit Animation
                gsap.to(loaderRef.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.2, // Short pause at 100%
                    onComplete: onComplete
                });
            }
        });

        // Intro text fade in
        tl.fromTo(textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
            // Progress counter running up to 100
            .to(currentProgress, {
                val: 100,
                duration: 2.5,
                ease: "expo.out",
                onUpdate: () => {
                    setProgress(Math.floor(currentProgress.val));
                }
            }, "-=0.2");

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[100] bg-[#0c0c0c] text-white flex flex-col justify-center items-center overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6">
                <div ref={textRef} className="mb-12 opacity-0">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-center text-gray-300">
                        Your experience is loading...
                    </h2>
                </div>

                <div className="absolute bottom-12 md:bottom-24 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0">
                    <h1 ref={counterRef} className="text-[120px] md:text-[200px] lg:text-[250px] font-bold tracking-tighter leading-none text-white/90">
                        {progress}
                    </h1>
                </div>
            </div>

            {/* Progress bar line at top */}
            <div
                className="absolute top-0 left-0 h-1 bg-white transition-all duration-[2.5s] ease-out z-20"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
