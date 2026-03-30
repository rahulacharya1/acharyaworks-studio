import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Services = () => {
    const services = [
        {
            title: 'Web Development',
            desc: 'High-performance static and dynamic websites tailored for your brand.',
            price: '₹2,999',
            features: ['Responsive UI/UX', 'Tailwind CSS Styling', 'SEO Optimization', '10-Day Delivery']
        },
        {
            title: 'Django Backend',
            desc: 'Robust server-side logic with secure APIs and custom admin panels.',
            price: '₹5,999',
            features: ['Secure JWT Auth', 'Custom Admin Dashboard', 'Database Design', 'REST APIs']
        },
        {
            title: 'Custom Solutions',
            desc: 'Full-scale platforms for schools, NGOs, and growing startups.',
            price: '₹9,999+',
            features: ['End-to-End Development', 'Scalable Cloud Architecture', 'Priority Support', 'Custom Integrations']
        }
    ];

    return (
        <div className="bg-black min-h-screen pt-20">
            <Helmet>
                <title>Web Development Services | Affordable Packages from ₹2,999</title>
                <meta name="description" content="Professional web development and Django backend services starting at ₹2,999. Scalable architecture and fast delivery by AcharyaWorks." />
                <meta name="keywords" content="hire web developer, django development price, affordable website bihar, custom software services" />
            </Helmet>

            {/* 🔥 Page Header */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 animate-fade-in">
                        Our <span className="text-gray-500 italic font-serif">Services</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Professional digital craftsmanship at startup-friendly rates. We build solutions that scale.
                    </p>
                </div>
            </section>

            {/* 🔥 Pricing/Services Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={service.title} 
                                className={`relative group p-1 rounded-[2.5rem] transition-all duration-500 ${
                                    index === 1 ? 'bg-gradient-to-b from-white/20 to-transparent' : 'bg-white/5'
                                }`}
                            >
                                <div className="bg-[#0A0A0A] rounded-[2.4rem] p-10 h-full flex flex-col border border-white/5 group-hover:border-white/20 transition-colors">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-bold text-white">{service.price}</span>
                                        <span className="text-gray-600 text-sm">/ project</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-gray-300">
                                                <svg className="w-4 h-4 text-white mr-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to="/contact"
                                        className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                                            index === 1 
                                            ? 'bg-white text-black hover:bg-gray-200' 
                                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🔥 Why Us / Process */}
            <section className="py-32 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 tracking-tight">The AcharyaWorks Process</h2>
                    <div className="grid md:grid-cols-3 gap-16 relative">
                        {/* Process Step 1 */}
                        <div className="relative text-center">
                            <div className="text-8xl font-bold text-white/[0.03] absolute -top-12 left-1/2 -translate-x-1/2 select-none">01</div>
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">Discovery</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">We analyze your requirements and map out the system architecture.</p>
                        </div>
                        {/* Process Step 2 */}
                        <div className="relative text-center">
                            <div className="text-8xl font-bold text-white/[0.03] absolute -top-12 left-1/2 -translate-x-1/2 select-none">02</div>
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">Development</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Agile coding using React & Django with regular updates on progress.</p>
                        </div>
                        {/* Process Step 3 */}
                        <div className="relative text-center">
                            <div className="text-8xl font-bold text-white/[0.03] absolute -top-12 left-1/2 -translate-x-1/2 select-none">03</div>
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">Deployment</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Launch on your custom domain with optimized server configurations.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
