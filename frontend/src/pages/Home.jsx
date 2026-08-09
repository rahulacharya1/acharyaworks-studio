import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CTA from '../components/CTA';
import useSEO from '../hooks/useSEO';

const Home = () => {
    useSEO({
        title: "AcharyaWorks | Digital Products with Real Impact",
        description: "AcharyaWorks builds scalable web apps and custom Django solutions. From Bihar to the world, we craft digital products like TechlancePrep and BiharSeva.",
        keywords: "AcharyaWorks, web development Bihar, digital product studio, software agency Purnea, edtech solutions, techlanceprep, edumarks, biharseva, coding interview prep, school result system, volunteer platform"
    });

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8000' 
            : 'https://api.acharyaworks.in';
            
        fetch(`${apiBase}/api/products/`)
            .then(res => res.json())
            .then(data => {
                // Filter only featured products
                const featured = data.filter(product => product.is_featured);
                setFeaturedProducts(featured);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <main className="bg-black text-white min-h-screen">


            {/* 🔥 Hero Section */}
            <Hero />

            {/* 🔥 Featured Products Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 mb-4">
                                Our Portfolio
                            </h2>
                            <p className="text-4xl md:text-5xl font-bold tracking-tighter">
                                Digital solutions crafted <br /> 
                                <span className="text-gray-500 italic font-serif">for real-world impact.</span>
                            </p>
                        </div>
                        <Link 
                            to="/products" 
                            className="text-white hover:text-gray-400 transition-colors flex items-center gap-2 font-medium border-b border-white/20 pb-1"
                        >
                            View all products
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-4">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-700 border-t-white animate-spin"></div>
                            <span className="text-xs tracking-wide">Loading featured products...</span>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id || product.name}
                                    {...product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 🔥 Values Section (What We Do) */}
            <section className="py-32 bg-white/2 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <div className="text-white font-mono text-xs mb-6 opacity-40">01 / CAPABILITIES</div>
                            <h3 className="text-2xl font-bold tracking-tight">Scalable Web Apps</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                We build robust architectures using React and Django that grow as your user base expands.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-white font-mono text-xs mb-6 opacity-40">02 / MISSION</div>
                            <h3 className="text-2xl font-bold tracking-tight">Social Impact</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Technology should serve people. Our platforms like BiharSeva are built to drive community change.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-white font-mono text-xs mb-6 opacity-40">03 / SPECIALIZATION</div>
                            <h3 className="text-2xl font-bold tracking-tight">Ed-Tech Solutions</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                From result management to prep tools, we specialize in making education accessible through tech.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 Final CTA */}
            <CTA />
        </main>
    );
};

export default Home;
