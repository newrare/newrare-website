'use strict';

// Global language state
let currentLang = 'en';

// Lightning Generation Functions
function generateLightningPath(width, height) {
    const segments = 10 + Math.floor(Math.random() * 8);
    const points = [];

    const startX = width * 0.3 + Math.random() * width * 0.4;
    points.push({ x: startX, y: 0 });

    for (let i = 1; i < segments; i++) {
        const y = (height / segments) * i;
        const xDeviation = (Math.random() - 0.5) * width * 1.2;
        const x = startX + xDeviation + (Math.random() - 0.5) * width * 0.3;
        points.push({ x, y });
    }

    const endX = startX + (Math.random() - 0.5) * width * 0.8;
    points.push({ x: endX, y: height });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
    }

    return path;
}

function createLightning() {
    const lightning = document.createElement('div');
    lightning.className = 'lightning-bolt';

    const leftPosition = Math.random() * 100;
    const width = 80 + Math.random() * 120;
    const height = window.innerHeight * 0.85 + Math.random() * window.innerHeight * 0.15;
    const rotation = -30 + Math.random() * 50;

    lightning.style.left = `${leftPosition}%`;
    lightning.style.width = `${width}px`;
    lightning.style.height = `${height}px`;
    lightning.style.transform = `rotate(${rotation}deg)`;

    const path = generateLightningPath(width, height);
    lightning.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <path d="${path}" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    lightning.style.animation = 'lightningFlash 0.4s ease-out';

    const container = document.getElementById('lightningContainer');
    if (container) {
        container.appendChild(lightning);
        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.remove();
            }
        }, 400);
    }
}

function startLightning() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            createLightning();

            if (Math.random() < 0.3) {
                setTimeout(() => createLightning(), 50);
            }

            if (Math.random() < 0.2) {
                setTimeout(() => createLightning(), 100);
            }
        }
    }, 500);
}

// Internationalization Functions
function initializeContent() {
    updateContent();
}

function updateContent() {
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
        const text = currentLang === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    updateContent();
    
    // Update language button text
    const langButton = document.getElementById('langToggle');
    if (langButton) {
        langButton.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    }
}

// UI Toggle Functions
function toggleTerms() {
    const termsContent = document.querySelector('.terms-content');
    if (termsContent) {
        termsContent.classList.toggle('active');
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize content
    initializeContent();
    
    // Open terms by default
    const termsContent = document.querySelector('.terms-content');
    if (termsContent) {
        termsContent.classList.add('active');
    }
    
    // Start lightning effects
    startLightning();    // Parallax effect setup for app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, index * 300);
    });
});

// Scroll effects
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (nav) {
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.08)';
        }
    }

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrollTop * 0.5 + 'px';
    }

    // Fade in cards on scroll
    const cards = document.querySelectorAll('.app-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });

    // Parallax effect for section titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const titleTop = title.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (titleTop < windowHeight * 0.9) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
        
        // Parallax effect when title is visible
        if (titleTop < windowHeight && titleTop > -title.offsetHeight) {
            const translateY = (titleTop - windowHeight * 0.5) * 0.1;
            title.style.transform = `translateY(${translateY}px)`;
        }
    });

    lastScrollTop = scrollTop;
});
