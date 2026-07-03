import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* 🔥 Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
                <div className="bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-12 md:p-20 border border-white/10 shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
                        Have an idea or <br className="hidden md:block" /> 
                        <span className="text-gray-500 italic font-serif">need a website?</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
                        Let's build a digital product that scales. From concept to deployment, we've got you covered.
                    </p>

                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Work With Us
                        <svg 
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    {/* Quick Trust Indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                        <span>Fast Delivery</span>
                        <span>•</span>
                        <span>Scalable Tech</span>
                        <span>•</span>
                        <span>Social Impact</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA;
