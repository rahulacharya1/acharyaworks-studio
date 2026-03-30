import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' }
    ]

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 z-50">
            <nav className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex justify-between items-center h-20">
                    
                    {/* 🔥 BRAND LOGO */}
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
                    >
                        Acharya<span className="text-gray-500">Works</span>
                    </Link>

                    {/* 🔥 DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 ${
                                    isActive(item.path)
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>
                                )}
                            </Link>
                        ))}
                        
                        {/* CTA Button in Header */}
                        <Link 
                            to="/contact" 
                            className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Work With Us
                        </Link>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 🔥 MOBILE NAVIGATION MENU */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block text-lg font-medium ${
                                    isActive(item.path) ? 'text-white' : 'text-gray-400'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
