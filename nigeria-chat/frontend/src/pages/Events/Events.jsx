import React, { useState } from 'react';
import { formatNaira } from '../../utils/formatters';

export const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 'e1',
      title: 'Lagos Tech Fest 2026 💻',
      date: 'Sat, Nov 14, 2026 • 9:00 AM',
      venue: 'Landmark Centre, Victoria Island, Lagos',
      price: 0,
      attendees: 3400,
      banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
      rsvpd: true
    },
    {
      id: 'e2',
      title: 'Felabration 2026: Afrobeat Lives Forever 🎷',
      date: 'Fri, Oct 16, 2026 • 7:00 PM',
      venue: 'New Afrika Shrine, Ikeja, Lagos',
      price: 5000,
      attendees: 12000,
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
      rsvpd: false
    },
    {
      id: 'e3',
      title: 'Abuja International Cultural Expo 🇳🇬',
      date: 'Sat, Dec 5, 2026 • 10:00 AM',
      venue: 'Eagle Square, Central Business District, Abuja',
      price: 2500,
      attendees: 5800,
      banner: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
      rsvpd: false
    }
  ]);

  const toggleRsvp = (id) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return {
          ...ev,
          rsvpd: !ev.rsvpd,
          attendees: ev.rsvpd ? ev.attendees - 1 : ev.attendees + 1
        };
      }
      return ev;
    }));
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Events & Meetups 📅</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Discover tech festivals, cultural celebrations, and social parties across Nigeria
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((ev) => (
            <div key={ev.id} className="card" style={{ overflow: 'hidden' }}>
              <img
                src={ev.banner}
                alt={ev.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                      {ev.date}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, marginTop: '2px' }}>
                      {ev.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      📍 {ev.venue}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                      {ev.price === 0 ? 'FREE' : formatNaira(ev.price)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {ev.attendees.toLocaleString()} Going
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => toggleRsvp(ev.id)}
                    className={ev.rsvpd ? 'btn btn-outline' : 'btn btn-primary'}
                    style={{ fontSize: '13px', padding: '8px 20px' }}
                  >
                    {ev.rsvpd ? '✓ Registered' : 'RSVP / Get Ticket'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
