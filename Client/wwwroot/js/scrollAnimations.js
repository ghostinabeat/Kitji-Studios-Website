// Scroll animations for Blazor components - matches React/Framer Motion behavior

window.scrollAnimations = {
    // Initialize scroll-based animations
    initializeScrollAnimations: function() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.handleScroll(); // Initial call
    },

    // Handle scroll events and trigger animations
    handleScroll: function() {
        const scrollY = window.scrollY;
        
        // Animate elements based on scroll position (matching React version)
        this.animateOnScroll('.fade-on-scroll', scrollY);
        this.updateNavbar(scrollY);
        this.animateHeroElements(scrollY);
    },

    // Animate elements when they come into view
    animateOnScroll: function(selector, scrollY) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollY > elementTop - windowHeight + elementHeight / 4) {
                element.classList.add('animate-in');
            }
        });
    },

    // Update navbar appearance on scroll (matching React behavior)
    updateNavbar: function(scrollY) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('not-scrolled');
            } else {
                navbar.classList.add('not-scrolled');
                navbar.classList.remove('scrolled');
            }
        }
    },

    // Animate hero elements (matching React scroll transforms)
    animateHeroElements: function(scrollY) {
        // Transform section opacity and position based on scroll
        const transformSection = document.querySelector('.transform-on-scroll');
        if (transformSection) {
            // Matching React: starts fading in after 1700px, fully visible at 2100px
            const startScroll = 1700;
            const endScroll = 2100;
            
            if (scrollY >= startScroll) {
                const progress = Math.min((scrollY - startScroll) / (endScroll - startScroll), 1);
                const opacity = progress;
                const yOffset = 40 * (1 - progress);
                
                transformSection.style.opacity = opacity;
                transformSection.style.transform = `translateY(${yOffset}px)`;
            } else {
                transformSection.style.opacity = '0';
                transformSection.style.transform = 'translateY(40px)';
            }
        }
    },

    // Smooth scroll to element
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Initialize on page load
    initialize: function() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeScrollAnimations();
            });
        } else {
            this.initializeScrollAnimations();
        }
    }
};

// Auto-initialize
window.scrollAnimations.initialize();