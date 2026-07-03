const ProductCard = ({ name, desc, features = [], link = "#" }) => {
    return (
        <div className="group relative">
            {/* 🔥 Hover Glow Effect (Background) */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-white rounded-[2rem] opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
            
            <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#0F0F0F]">
                
                <div>
                    {/* Top Row: Icon & Status */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold border border-gray-800 px-3 py-1 rounded-full">
                            Product
                        </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                        {name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {desc}
                    </p>

                    {/* Feature Tags (Small & Clean) */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {features.map((feature, index) => (
                            <span key={index} className="text-[11px] text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <a 
                        href={link} 
                        className="text-white text-sm font-semibold flex items-center gap-2 group/link"
                    >
                        Explore Product
                        <svg 
                            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
