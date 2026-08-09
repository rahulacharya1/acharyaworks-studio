import { useRef, useState } from 'react';
import useSEO from '../hooks/useSEO';

const Contact = () => {
    useSEO({
        title: "Contact AcharyaWorks | Start Your Project Today",
        description: "Ready to build your next digital product? Get in touch with AcharyaWorks. We specialize in React, Django, and custom full-stack solutions."
    });
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        const formData = new FormData(form.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8000' 
            : '';

        fetch(`${apiBase}/api/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(async (res) => {
            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                form.current.reset();
            } else {
                const errData = await res.json().catch(() => ({}));
                const errMsg = errData.email ? "Please provide a valid email address." : "Something went wrong. Please try WhatsApp instead.";
                setStatus({ type: 'error', message: errMsg });
            }
        })
        .catch((error) => {
            console.error("API error:", error);
            setStatus({ type: 'error', message: 'Network error. Please try WhatsApp instead.' });
        })
        .finally(() => {
            setIsSending(false);
            // Clear message after 5 seconds
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        });
    };

    return (
        <div className="bg-black min-h-screen pt-20">


            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8">
                        Let's <span className="text-gray-500 italic font-serif">Talk</span>
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                        
                        {/* 🔥 Status Message Notification */}
                        {status.message && (
                            <div className={`mb-8 p-4 rounded-xl text-sm font-medium text-center ${
                                status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                                {status.message}
                            </div>
                        )}

                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name={"name"}
                                    placeholder="Name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                />
                                <input
                                    type="email"
                                    name={"email"}
                                    placeholder="Email Address"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                />
                            </div>
                            <textarea
                                name={"message"}
                                rows="5"
                                placeholder="Tell us about your project..."
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all resize-none"
                            />
                            
                            <button
                                type="submit"
                                disabled={isSending}
                                className={`w-full bg-white text-black font-bold py-5 rounded-2xl transition-all active:scale-[0.98] ${
                                    isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                                }`}
                            >
                                {isSending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        {/* WhatsApp Alternative */}
                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-gray-500 text-sm mb-4">Prefer instant chat?</p>
                            <a 
                                href="https://wa.me/917061638189" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white font-semibold hover:opacity-70 transition-opacity"
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
