import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            // Utiliser le fuseau horaire du Cameroun (Africa/Douala, UTC+1)
            const nowCameroon = new Date(
                new Date().toLocaleString('en-US', { timeZone: 'Africa/Douala' })
            );

            // Date cible : 28 février 2026 à minuit, heure du Cameroun
            const target = new Date('2026-02-28T00:00:00');
            const distance = target.getTime() - nowCameroon.getTime();

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) {
        return (
            <div className="glass-card" style={{ textAlign: 'center' }}>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #1a5276, #2980b9)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    🎉 C'EST LE JOUR J ! 🎉
                </h2>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#2c5272',
                    fontWeight: '600'
                }}>
                    Joyeux Anniversaire Maman ! On t'aime ! 💖
                </p>
            </div>
        );
    }

    return (
        <div className="glass-card">
            <p className="countdown-section-title">⏳ Le Compte à Rebours ⏳</p>
            <div className="countdown-grid">
                <div className="time-unit">
                    <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="time-label">Jours</span>
                </div>
                <div className="time-unit">
                    <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="time-label">Heures</span>
                </div>
                <div className="time-unit">
                    <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="time-label">Minutes</span>
                </div>
                <div className="time-unit">
                    <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="time-label">Secondes</span>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
