import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useSEO from '../hooks/useSEO';

const Products = () => {
    useSEO({
        title: "Our Products | Scalable Solutions by AcharyaWorks",
        description: "Explore AcharyaWorks' suite of products: TechlancePrep for coding interviews, EduMarks for school management, and BiharSeva for social impact.",
        keywords: "TechlancePrep, EduMarks, BiharSeva, school management system, interview prep tool, social impact apps, techlanceprep, edumarks, biharseva, coding platform, school management, volunteer app, bihar startup"
    });

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8000' 
            : 'https://api.acharyaworks.in';
            
        fetch(`${apiBase}/api/products/`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="bg-black min-h-screen pt-20">


            {/* 🔥 Page Header */}
            <section className="py-24 relative overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 animate-fade-in">
                        Our <span className="text-gray-500 italic font-serif">Products</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        From education to social impact, we build tools that solve problems and scale with the community.
                    </p>
                </div>
            </section>

            {/* 🔥 Product Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-700 border-t-white animate-spin"></div>
                            <span className="text-sm tracking-wide">Loading our products...</span>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id || product.name}
                                    {...product}
                                />
                            ))}
                            
                            {/* 🔥 COMING SOON PLACEHOLDER */}
                            <div className="border border-white/5 bg-white/1 rounded-4xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/3 transition-all duration-500 min-h-87.5">
                                <div className="w-12 h-12 rounded-full border border-dashed border-gray-700 flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-700">
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-600 mb-2 tracking-tight">More in Development</h3>
                                <p className="text-gray-700 text-sm max-w-50">
                                    We are currently crafting new solutions for Bihar's digital growth.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 🔥 Call to Action Sub-section */}
            <section className="py-20 border-t border-white/5 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Want us to build your product?</h2>
                    <p className="text-gray-500 mb-8">We specialize in turning complex ideas into scalable web applications.</p>
                    <a 
                        href="/contact" 
                        className="inline-block border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Start a Project
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Products;
