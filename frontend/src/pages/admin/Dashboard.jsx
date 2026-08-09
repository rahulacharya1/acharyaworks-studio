import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

const Dashboard = () => {
    useSEO({
        title: "Admin Dashboard | AcharyaWorks",
        description: "Admin panel dashboard to manage products and inquiries."
    });

    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [activeEditType, setActiveEditType] = useState('product'); // 'product' | 'service'

    // Custom Delete Confirmation Modal states
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState(''); // 'product' | 'message' | 'service'
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState('');
    
    // Form fields
    const [prodName, setProdName] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodLink, setProdLink] = useState('#');
    const [servicePrice, setServicePrice] = useState('');
    const [prodFeatures, setProdFeatures] = useState('');
    const [prodIsFeatured, setProdIsFeatured] = useState(false);
    const [prodOrder, setProdOrder] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');
    const username = localStorage.getItem('admin_user') || 'Admin';

    const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8000' 
        : 'https://api.acharyaworks.in';

    // Check auth
    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        }
    }, [token, navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
    }, [navigate]);

    // Fetch lists
    const fetchData = useCallback(() => {
        if (!token) return;
        
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };

        // Fetch products
        const fetchProds = fetch(`${apiBase}/api/products/`).then(res => res.json());
        
        // Fetch services
        const fetchServices = fetch(`${apiBase}/api/services/`).then(res => res.json());
        
        // Fetch messages
        const fetchMsgs = fetch(`${apiBase}/api/admin/messages/`, { headers })
            .then(res => {
                if (res.status === 401) {
                    handleLogout();
                    throw new Error("Unauthorized token");
                }
                return res.json();
            });

        Promise.all([fetchProds, fetchMsgs, fetchServices])
            .then(([prods, msgs, servs]) => {
                setProducts(prods);
                setMessages(msgs);
                setServices(servs);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Fetch dashboard error:", err);
                setIsLoading(false);
            });
    }, [apiBase, handleLogout, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const triggerAlert = (type, text) => {
        setStatusMessage({ type, text });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    };

    // Open Create Modal for Product
    const openCreateProductModal = () => {
        setActiveEditType('product');
        setEditingProduct(null);
        setEditingService(null);
        setProdName('');
        setProdDesc('');
        setProdLink('#');
        setServicePrice('');
        setProdFeatures('');
        setProdIsFeatured(false);
        setProdOrder(0);
        setShowModal(true);
    };

    // Open Create Modal for Service
    const openCreateServiceModal = () => {
        setActiveEditType('service');
        setEditingProduct(null);
        setEditingService(null);
        setProdName('');
        setProdDesc('');
        setProdLink('');
        setServicePrice('₹2,999');
        setProdFeatures('');
        setProdIsFeatured(false);
        setProdOrder(0);
        setShowModal(true);
    };

    // Open Edit Modal for Product
    const openEditProductModal = (product) => {
        setActiveEditType('product');
        setEditingProduct(product);
        setEditingService(null);
        setProdName(product.name);
        setProdDesc(product.description || product.desc || '');
        setProdLink(product.link || '#');
        setProdFeatures(Array.isArray(product.features) ? product.features.join(', ') : '');
        setProdIsFeatured(product.is_featured || false);
        setProdOrder(product.order || 0);
        setShowModal(true);
    };

    // Open Edit Modal for Service
    const openEditServiceModal = (service) => {
        setActiveEditType('service');
        setEditingProduct(null);
        setEditingService(service);
        setProdName(service.title);
        setProdDesc(service.desc || service.description || '');
        setProdLink('');
        setServicePrice(service.price);
        setProdFeatures(Array.isArray(service.features) ? service.features.join(', ') : '');
        setProdIsFeatured(service.is_featured || false);
        setProdOrder(service.order || 0);
        setShowModal(true);
    };

    // Save Product or Service (Create or Update)
    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);

        const isProd = activeEditType === 'product';
        const payload = isProd ? {
            name: prodName,
            description: prodDesc,
            link: prodLink,
            features: prodFeatures.split(',').map(f => f.trim()).filter(Boolean),
            is_featured: prodIsFeatured,
            order: parseInt(prodOrder) || 0
        } : {
            title: prodName,
            desc: prodDesc,
            price: servicePrice,
            features: prodFeatures.split(',').map(f => f.trim()).filter(Boolean),
            is_featured: prodIsFeatured,
            order: parseInt(prodOrder) || 0
        };

        const targetId = isProd ? editingProduct?.id : editingService?.id;
        const baseEndpoint = isProd ? 'products' : 'services';
        const url = targetId 
            ? `${apiBase}/api/${baseEndpoint}/${targetId}/` 
            : `${apiBase}/api/${baseEndpoint}/`;
        
        const method = targetId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(async (res) => {
            if (res.ok) {
                triggerAlert('success', `${isProd ? 'Product' : 'Service'} ${targetId ? 'updated' : 'created'} successfully!`);
                setShowModal(false);
                fetchData();
            } else {
                const data = await res.json().catch(() => ({}));
                triggerAlert('error', data.detail || `Failed to save ${isProd ? 'product' : 'service'} details.`);
            }
        })
        .catch(err => {
            console.error("Save details failed:", err);
            triggerAlert('error', 'Network error, failed to save details.');
        })
        .finally(() => {
            setIsSaving(false);
        });
    };

    // Delete Requests Triggers
    const requestDeleteProduct = (product) => {
        setDeleteType('product');
        setDeleteId(product.id);
        setDeleteName(product.name);
        setShowDeleteConfirm(true);
    };

    const requestDeleteService = (service) => {
        setDeleteType('service');
        setDeleteId(service.id);
        setDeleteName(service.title);
        setShowDeleteConfirm(true);
    };

    const requestDeleteMessage = (message) => {
        setDeleteType('message');
        setDeleteId(message.id);
        setDeleteName(`Inquiry from ${message.name}`);
        setShowDeleteConfirm(true);
    };

    // Execute actual API DELETE call
    const executeDelete = () => {
        if (!deleteId) return;

        const url = deleteType === 'product'
            ? `${apiBase}/api/products/${deleteId}/`
            : deleteType === 'service'
            ? `${apiBase}/api/services/${deleteId}/`
            : `${apiBase}/api/admin/messages/${deleteId}/`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            if (res.ok) {
                triggerAlert('success', `${deleteType === 'product' ? 'Product' : 'Inquiry'} deleted successfully!`);
                fetchData();
            } else {
                triggerAlert('error', `Failed to delete ${deleteType}.`);
            }
        })
        .catch(err => {
            console.error(err);
            triggerAlert('error', 'Network error.');
        })
        .finally(() => {
            setShowDeleteConfirm(false);
            setDeleteId(null);
            setDeleteName('');
        });
    };

    if (!token) return null;

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                {/* Header row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
                            <span className="text-xs uppercase tracking-widest bg-cyan-950/40 text-cyan-400 border border-cyan-800/30 px-3 py-1 rounded-md font-semibold">
                                Live
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">Welcome back, <span className="text-gray-300 font-semibold">{username}</span></p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {activeTab === 'services' ? (
                            <button
                                onClick={openCreateServiceModal}
                                className="bg-cyan-500 text-black hover:bg-cyan-600 font-bold px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] w-full md:w-auto text-center"
                            >
                                + Add Service
                            </button>
                        ) : (
                            <button
                                onClick={openCreateProductModal}
                                className="bg-cyan-500 text-black hover:bg-cyan-600 font-bold px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] w-full md:w-auto text-center"
                            >
                                + Add Product
                            </button>
                        )}
                        <Link
                            to="/"
                            className="border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 font-bold px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] w-full md:w-auto text-center inline-flex items-center justify-center gap-1.5"
                        >
                            <i className="fa-solid fa-arrow-left text-xs"></i> View Site
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 font-bold px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] w-full md:w-auto text-center"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Status messages toast */}
                {statusMessage.text && (
                    <div className={`mb-8 p-4 rounded-xl text-sm font-semibold border text-center transition-all animate-fade-in ${
                        statusMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {statusMessage.text}
                    </div>
                )}

                {/* Main Tabs structure */}
                <div className="flex border-b border-white/5 mb-10 gap-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'dashboard' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'products' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Products ({products.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'services' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Services ({services.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'messages' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Inbox ({messages.length})
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-500 gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-gray-700 border-t-cyan-500 animate-spin"></div>
                        <span className="text-sm tracking-wide">Syncing data from backend...</span>
                    </div>
                ) : (
                    <div>
                        {/* Tab 1: Dashboard Overview */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-10">
                                <div className="grid sm:grid-cols-4 gap-6">
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
                                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Total Products</div>
                                        <div className="text-5xl font-extrabold text-white tracking-tight">{products.length}</div>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
                                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Total Services</div>
                                        <div className="text-5xl font-extrabold text-white tracking-tight">{services.length}</div>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
                                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Featured Elements</div>
                                        <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">
                                            {products.filter(p => p.is_featured).length + services.filter(s => s.is_featured).length}
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
                                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Inbox Enquiries</div>
                                        <div className="text-5xl font-extrabold text-white tracking-tight">{messages.length}</div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Quick list products */}
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-4xl p-8">
                                        <h3 className="text-lg font-bold mb-6">Recent Products</h3>
                                        {products.length === 0 ? (
                                            <p className="text-gray-600 text-sm">No products in database.</p>
                                        ) : (
                                            <div className="divide-y divide-white/5">
                                                {products.slice(0, 4).map(p => (
                                                    <div key={p.id} className="py-4 flex justify-between items-center">
                                                        <div>
                                                            <div className="font-semibold text-sm">{p.name}</div>
                                                            <div className="text-xs text-gray-500">{p.link}</div>
                                                        </div>
                                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${p.is_featured ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/30' : 'bg-white/5 text-gray-400'}`}>
                                                            {p.is_featured ? 'Featured' : 'Standard'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick list messages */}
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-4xl p-8">
                                        <h3 className="text-lg font-bold mb-6">Latest Enquiries</h3>
                                        {messages.length === 0 ? (
                                            <p className="text-gray-600 text-sm">No messages in inbox.</p>
                                        ) : (
                                            <div className="divide-y divide-white/5">
                                                {messages.slice(0, 4).map(m => (
                                                    <div key={m.id} className="py-4">
                                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                            <span className="font-bold text-gray-400">{m.name} ({m.email})</span>
                                                            <span>{new Date(m.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-300 line-clamp-1">{m.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Products CRUD Management */}
                        {activeTab === 'products' && (
                            <div className="bg-[#0A0A0A] border border-white/5 rounded-4xl overflow-hidden">
                                {products.length === 0 ? (
                                    <div className="p-10 text-center text-gray-500 text-sm">No products found. Add your first product using the button above!</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/1 text-xs font-bold uppercase tracking-widest text-gray-500">
                                                    <th className="py-6 px-8">Sort Order</th>
                                                    <th className="py-6 px-8">Product Name</th>
                                                    <th className="py-6 px-8">Status</th>
                                                    <th className="py-6 px-8">Tech Features</th>
                                                    <th className="py-6 px-8 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {products.map(p => (
                                                    <tr key={p.id} className="hover:bg-white/1 transition-colors">
                                                        <td className="py-5 px-8 font-mono text-sm text-cyan-400">{p.order}</td>
                                                        <td className="py-5 px-8">
                                                            <div className="font-bold text-sm text-white">{p.name}</div>
                                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">{p.link}</a>
                                                        </td>
                                                        <td className="py-5 px-8">
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                                                                p.is_featured 
                                                                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/30' 
                                                                : 'bg-white/5 text-gray-500 border-white/5'
                                                            }`}>
                                                                {p.is_featured ? 'Featured' : 'Standard'}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-8">
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {Array.isArray(p.features) && p.features.map(f => (
                                                                    <span key={f} className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-400">
                                                                        {f}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-8 text-right">
                                                            <div className="flex justify-end gap-3">
                                                                <button
                                                                    onClick={() => openEditProductModal(p)}
                                                                    className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => requestDeleteProduct(p)}
                                                                    className="text-xs font-bold text-red-500/80 hover:text-red-400 bg-red-500/5 px-3.5 py-2 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 2.5: Services CRUD Management */}
                        {activeTab === 'services' && (
                            <div className="bg-[#0A0A0A] border border-white/5 rounded-4xl overflow-hidden">
                                {services.length === 0 ? (
                                    <div className="p-10 text-center text-gray-500 text-sm">No services found. Add your first service using the button above!</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/1 text-xs font-bold uppercase tracking-widest text-gray-500">
                                                    <th className="py-6 px-8">Sort Order</th>
                                                    <th className="py-6 px-8">Service Title</th>
                                                    <th className="py-6 px-8">Price Package</th>
                                                    <th className="py-6 px-8">Featured</th>
                                                    <th className="py-6 px-8 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {services.map(s => (
                                                    <tr key={s.id} className="hover:bg-white/1 transition-colors">
                                                        <td className="py-5 px-8 font-mono text-sm text-cyan-400">{s.order}</td>
                                                        <td className="py-5 px-8">
                                                            <div className="font-bold text-sm text-white">{s.title}</div>
                                                            <div className="text-xs text-gray-500">{s.desc}</div>
                                                        </td>
                                                        <td className="py-5 px-8 font-mono text-sm text-white">{s.price}</td>
                                                        <td className="py-5 px-8">
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                                                                s.is_featured 
                                                                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/30' 
                                                                : 'bg-white/5 text-gray-500 border-white/5'
                                                            }`}>
                                                                {s.is_featured ? 'Yes' : 'No'}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-8 text-right">
                                                            <div className="flex justify-end gap-3">
                                                                <button
                                                                    onClick={() => openEditServiceModal(s)}
                                                                    className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => requestDeleteService(s)}
                                                                    className="text-xs font-bold text-red-500/80 hover:text-red-400 bg-red-500/5 px-3.5 py-2 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 3: Message Inbox */}
                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                {messages.length === 0 ? (
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-4xl p-10 text-center text-gray-500 text-sm">Your inbox is empty.</div>
                                ) : (
                                    messages.map(m => (
                                        <div key={m.id} className="bg-[#0A0A0A] border border-white/5 rounded-4xl p-8 hover:border-white/10 transition-all duration-300">
                                            <div className="flex justify-between items-start mb-6 gap-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-white mb-1">{m.name}</h3>
                                                    <p className="text-xs text-cyan-400 font-mono">{m.email}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        {new Date(m.created_at).toLocaleString()}
                                                    </span>
                                                    <button
                                                        onClick={() => requestDeleteMessage(m)}
                                                        className="text-xs font-bold text-red-500 hover:text-red-400 p-2 bg-red-500/5 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-white/2 border border-white/5 rounded-xl text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-light">
                                                {m.message}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 🔥 CREATE/EDIT PRODUCT/SERVICE MODAL POPUP */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
                            <h2 className="text-2xl font-bold">
                                {activeEditType === 'product'
                                    ? (editingProduct ? 'Edit Product' : 'Add New Product')
                                    : (editingService ? 'Edit Service' : 'Add New Service')
                                }
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        {activeEditType === 'product' ? 'Product Name' : 'Service Title'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={prodName}
                                        onChange={(e) => setProdName(e.target.value)}
                                        placeholder={activeEditType === 'product' ? 'e.g. EduMarks' : 'e.g. Web Development'}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/30 transition-all"
                                    />
                                </div>
                                <div>
                                    {activeEditType === 'product' ? (
                                        <>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                                Link URL
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={prodLink}
                                                onChange={(e) => setProdLink(e.target.value)}
                                                placeholder="e.g. https://..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/30 transition-all"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                                Price Package
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={servicePrice}
                                                onChange={(e) => setServicePrice(e.target.value)}
                                                placeholder="e.g. ₹2,999"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/30 transition-all"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={prodDesc}
                                    onChange={(e) => setProdDesc(e.target.value)}
                                    placeholder={activeEditType === 'product' ? 'Describe the product value proposition...' : 'Describe the service package deliverables...'}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/30 transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    {activeEditType === 'product' ? 'Features / Technologies' : 'Service Deliverables'}
                                </label>
                                <input
                                    type="text"
                                    value={prodFeatures}
                                    onChange={(e) => setProdFeatures(e.target.value)}
                                    placeholder="e.g. React, Django, Tailwind (comma separated)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/30 transition-all"
                                />
                                <span className="text-[10px] text-gray-600 mt-1 block">Separate tags with commas.</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={prodOrder}
                                        onChange={(e) => setProdOrder(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-500/30 transition-all"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-6 pt-6">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="is_featured"
                                            checked={prodIsFeatured}
                                            onChange={(e) => setProdIsFeatured(e.target.checked)}
                                            className="w-5 h-5 rounded bg-white/5 border border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                        />
                                        <label htmlFor="is_featured" className="text-sm font-bold text-gray-400 select-none cursor-pointer">
                                            {activeEditType === 'product' ? 'Feature on Homepage' : 'Mark as Best Value'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 border-t border-white/10 pt-6 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="border border-white/10 text-gray-400 hover:text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-cyan-500 text-black hover:bg-cyan-600 px-8 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                                >
                                    {isSaving ? 'Saving...' : (
                                        activeEditType === 'product'
                                            ? (editingProduct ? 'Update Product' : 'Save Product')
                                            : (editingService ? 'Update Service' : 'Save Service')
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 🔥 CUSTOM DELETE CONFIRMATION MODAL POPUP */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative text-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3">Confirm Deletion</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                            Are you sure you want to delete <span className="text-white font-semibold">{deleteName}</span>?<br />
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 border border-white/10 text-gray-400 hover:text-white py-4 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
                            >
                                Cancel
                              </button>
                              <button
                                  type="button"
                                  onClick={executeDelete}
                                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98] shadow-lg shadow-red-500/10"
                              >
                                  Delete
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
};

export default Dashboard;
