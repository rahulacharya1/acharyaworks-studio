import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CTA from '../components/CTA';
import { Helmet } from 'react-helmet';

const Home = () => {
    const featuredProducts = [
        {
            name: 'TechlancePrep',
            desc: 'A comprehensive interview preparation platform built for aspiring developers to master coding rounds.',
            features: ['React', 'Django', 'Preparation'],
            link: '/products'
        },
        {
            name: 'EduMarks',
            desc: 'A streamlined school result management system designed to eliminate manual data entry errors.',
            features: ['Automation', 'Management', 'Education'],
            link: '/products'
        },
        {
            name: 'BiharSeva',
            desc: 'A volunteer-driven platform connecting citizens for community cleanliness and social impact.',
            features: ['Social Impact', 'Community', 'Bihar'],
            link: '/products'
        }
    ];

    return (
        <main className="bg-black text-white min-h-screen">
            <Helmet>
                <title>AcharyaWorks | Digital Products with Real Impact</title>
                <meta name="description" content="AcharyaWorks builds scalable web apps and custom Django solutions. From Bihar to the world, we craft digital products like TechlancePrep and BiharSeva." />
                <meta name="keywords" content="AcharyaWorks, web development Bihar, digital product studio, software agency Purnea, edtech solutions, techlanceprep, edumarks, biharseva, coding interview prep, school result system, volunteer platform" />
            </Helmet>

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

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.name}
                                {...product}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 🔥 Values Section (What We Do) */}
            <section className="py-32 bg-white/[0.02] border-y border-white/5">
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
