import React, { useState } from 'react';
import { formatNaira } from '../../utils/formatters';
import { NIGERIAN_STATES } from '../../utils/constants';

export const Marketplace = () => {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [items, setItems] = useState([
    {
      id: 'm1',
      title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)',
      category: 'Phones & Gadgets',
      price_naira: 1450000,
      location_state: 'Lagos',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      seller: 'Lagos iStore NG'
    },
    {
      id: 'm2',
      title: 'Toyota Camry 2020 (Lagos Cleared, Clean Title)',
      category: 'Vehicles',
      price_naira: 16800000,
      location_state: 'Lagos',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      seller: 'AutoMobiles Nigeria'
    },
    {
      id: 'm3',
      title: '3-Bedroom Luxury Terrace Duplex in Guzape',
      category: 'Real Estate',
      price_naira: 95000000,
      location_state: 'FCT Abuja',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      seller: 'Abuja Prime Properties'
    },
    {
      id: 'm4',
      title: 'Handmade Nigerian Agbada & Aso-Oke Attire',
      category: 'Fashion',
      price_naira: 85000,
      location_state: 'Oyo',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
      seller: 'Ibadan Classic Tailors'
    },
    {
      id: 'm5',
      title: 'Clean Sony PlayStation 5 Console with 2 DualSense Pads',
      category: 'Electronics',
      price_naira: 650000,
      location_state: 'Rivers',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      seller: 'PH Game City'
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Phones & Gadgets',
    price_naira: '',
    location_state: 'Lagos',
    image: ''
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([
      {
        id: 'm_' + Date.now(),
        ...newItem,
        price_naira: Number(newItem.price_naira),
        image: newItem.image || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        seller: 'Eleojo Cafe'
      },
      ...items
    ]);
    setShowAddModal(false);
  };

  const filtered = items.filter(item => {
    const matchState = selectedState === 'All' || item.location_state === selectedState;
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchState && matchCat;
  });

  return (
    <div className="main-layout">
      <main className="content-area" style={{ maxWidth: '1000px' }}>
        {/* Marketplace Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Naija Marketplace 🛍️</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Buy and sell safely in Nigerian Naira (₦) across all 36 States
            </p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ fontSize: '13px' }}>
            + List an Item
          </button>
        </div>

        {/* Filters */}
        <div className="card" style={{ padding: '12px 16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginRight: '6px' }}>
              State:
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '13px' }}
            >
              <option value="All">All States (Nigeria)</option>
              {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginRight: '6px' }}>
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '13px' }}
            >
              <option value="All">All Categories</option>
              <option value="Phones & Gadgets">Phones & Gadgets</option>
              <option value="Electronics">Electronics</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {filtered.map((item) => (
            <div key={item.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                    {formatNaira(item.price_naira)}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <div>📍 {item.location_state} State</div>
                  <div>👤 {item.seller}</div>
                </div>

                <button
                  onClick={() => alert(`Contacting ${item.seller} for "${item.title}"...`)}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '10px', fontSize: '12px', padding: '6px' }}
                >
                  Contact Seller 💬
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
                List an Item for Sale 🛍️
              </h3>

              <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Item Title"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                />

                <input
                  type="number"
                  placeholder="Price in Naira (₦)"
                  required
                  value={newItem.price_naira}
                  onChange={(e) => setNewItem({ ...newItem, price_naira: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                />

                <select
                  value={newItem.location_state}
                  onChange={(e) => setNewItem({ ...newItem, location_state: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                >
                  {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s} State</option>)}
                </select>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ fontSize: '13px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ fontSize: '13px' }}>
                    Publish Listing ₦
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
