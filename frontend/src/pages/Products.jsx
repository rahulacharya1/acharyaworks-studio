import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet'

const Products = () => {
    const products = [
        {
            name: 'TechlancePrep',
            desc: 'A premium interview preparation platform designed to help developers master technical rounds with topic-wise curation.',
            features: ['Topic-wise questions', 'Practice tests', 'Detailed Analytics'],
            link: 'https://techlanceprep.acharyaworks.in'
        },
        {
            name: 'EduMarks',
            desc: 'A sophisticated school result management system that automates grade calculation and report generation.',
            features: ['Class-wise results', 'Admin Dashboard', 'Parent Portal'],
            link: '#'
        },
        {
            name: 'BiharSeva',
            desc: 'A social impact initiative allowing citizens to report civic issues and coordinate volunteer cleanup efforts.',
            features: ['Image Evidence', 'Volunteer System', 'Location Tracking'],
            link: '#'
        }
    ];

    return (
        <div className="bg-black min-h-screen pt-20">
            <Helmet>
                <title>Our Products | Scalable Solutions by AcharyaWorks</title>
                <meta name="description" content="Explore AcharyaWorks' suite of products: TechlancePrep for coding interviews, EduMarks for school management, and BiharSeva for social impact." />
                <meta name="keywords" content="TechlancePrep, EduMarks, BiharSeva, school management system, interview prep tool, social impact apps, techlanceprep, edumarks, biharseva, coding platform, school management, volunteer app, bihar startup" />
            </Helmet>

            {/* 🔥 Page Header */}
            <section className="py-24 relative overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <ProductCard
                                key={product.name}
                                {...product}
                            />
                        ))}
                        
                        {/* 🔥 COMING SOON PLACEHOLDER */}
                        <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-all duration-500 min-h-[350px]">
                            <div className="w-12 h-12 rounded-full border border-dashed border-gray-700 flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-700">
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2 tracking-tight">More in Development</h3>
                            <p className="text-gray-700 text-sm max-w-[200px]">
                                We are currently crafting new solutions for Bihar's digital growth.
                            </p>
                        </div>
                    </div>
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
