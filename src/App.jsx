import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
    const [activePage, setActivePage] = useState('home')

    return (
        <div className="min-h-screen bg-white">
            <Header activePage={activePage} setActivePage={setActivePage} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default App
