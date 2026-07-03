import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-bold tracking-tighter">
                            Acharya<span className="text-gray-500">Works</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Building scalable digital products that solve real-world problems. 
                            From Bihar to the world, we focus on education and social impact.
                        </p>
                    </div>

                    {/* Products Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Products</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/products" className="hover:text-white transition-colors">TechlancePrep</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">EduMarks</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">BiharSeva</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Services</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Django Backend</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Custom SaaS Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Contact/Connect */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Connect</h4>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p>Purnea, Bihar, India</p>
                            <a href="mailto:rahulkumaracharya199@gmail.com" className="block hover:text-white transition-colors">
                                rahulkumaracharya199@gmail.com
                            </a>
                            <a 
                                href="https://wa.me/917061638189" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>© {currentYear} AcharyaWorks. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Crafted with <span className="text-red-500">❤️</span> in Bihar
                    </p>
                    <div className="flex gap-6">
                        <a href="https://github.com/rahulkumaracharya" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
                        <a href="https://linkedin.com/in/rahulkumaracharya" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
