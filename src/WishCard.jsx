import React from 'react';
import { motion } from 'framer-motion';

const WishCard = () => {
    const paragraphs = [
        "Ma chère Maman,",
        "En ce jour si spécial, je voulais te dire à quel point tu es précieuse pour moi. Ta force, ta tendresse et ton sourire illuminent chaque jour ma vie.",
        "Que cette nouvelle année soit remplie de joie, de rires et de moments merveilleux. Sache que je t'aime de tout mon cœur, aujourd'hui et pour toujours.",
        "Joyeux Anniversaire ! ❤️"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="wish-card-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Decorative top border */}
            <div className="wish-deco-top">✨🌸💖🌸✨</div>

            <motion.h2 className="wish-title" variants={itemVariants}>
                Mes Vœux pour Toi
            </motion.h2>

            <div className="wish-divider">
                <span className="wish-divider-line"></span>
                <span className="wish-divider-icon">💝</span>
                <span className="wish-divider-line"></span>
            </div>

            {paragraphs.map((paragraph, index) => (
                <motion.p
                    key={index}
                    className={`wish-text ${index === 0 ? 'wish-greeting' : ''} ${index === paragraphs.length - 1 ? 'wish-finale' : ''}`}
                    variants={itemVariants}
                >
                    {paragraph}
                </motion.p>
            ))}

            <motion.div className="wish-signature" variants={itemVariants}>
                <div className="wish-divider">
                    <span className="wish-divider-line"></span>
                    <span className="wish-divider-icon">💫</span>
                    <span className="wish-divider-line"></span>
                </div>
                <p>Avec tout mon amour,</p>
                <p className="wish-signature-name">Ton fils qui t'aime, Ravel ❤️</p>
            </motion.div>

            {/* Decorative bottom border */}
            <div className="wish-deco-bottom">🌹✨💖✨🌹</div>
        </motion.div>
    );
};

export default WishCard;
