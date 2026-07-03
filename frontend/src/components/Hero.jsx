import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-40">
            
            {/* 🔥 BACKGROUND MESH & GRID */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Brand Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium tracking-widest uppercase mb-10 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Based in Bihar • Open for Projects
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9] mb-10">
                        Building digital products <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 italic font-serif py-2">
                            with real impact.
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
                        From education tools to social platforms — we craft high-performance web applications designed to solve real-world problems.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            to="/products"
                            className="group relative px-12 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                            <span className="relative z-10">View Our Products</span>
                            <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>
                        
                        <Link
                            to="/contact"
                            className="px-12 py-5 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 transition-all hover:border-white/40 active:scale-95 w-full sm:w-auto"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-24 animate-bounce hidden md:block">
                        <svg className="w-6 h-6 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
