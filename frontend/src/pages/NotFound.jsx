import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const NotFound = () => {
    useSEO({
        title: "Page Not Found | 404 | AcharyaWorks",
        description: "The requested page was not found. Return to AcharyaWorks home."
    });

    return (
        <div className="bg-black min-h-[80vh] flex items-center justify-center pt-28 pb-20 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-md w-full px-6 text-center relative z-10 space-y-8 animate-fade-in">
                {/* 404 Tech Text */}
                <div className="space-y-3">
                    <p className="text-cyan-500 font-mono tracking-[0.3em] uppercase text-xs font-semibold">
                        // Error 404
                    </p>
                    <h1 className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter">
                        Lost <span className="text-gray-500 italic font-serif">Space</span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                    The destination you requested does not exist, has been moved, or is temporarily unavailable. Let's redirect you back to base.
                </p>

                {/* Action CTA */}
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-block bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg active:scale-[0.98]"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
