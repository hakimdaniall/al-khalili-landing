// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (!navLinks.classList.contains('show')) {
            // First make the menu visible but with 0 height
            navLinks.style.display = 'flex';
            
            // Force browser to recognize the display change before adding the show class
            setTimeout(() => {
                navLinks.classList.add('show');
            }, 10);
        } else {
            // When closing, we remove the show class first, then hide after animation completes
            navLinks.classList.remove('show');
            
            // Wait for the transition to finish before hiding the menu
            setTimeout(() => {
                if (!navLinks.classList.contains('show')) {
                    navLinks.style.display = 'none';
                }
            }, 400); // Match this with the CSS transition time
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('show');
            
            // Wait for the transition to finish before hiding the menu
            setTimeout(() => {
                if (!navLinks.classList.contains('show')) {
                    navLinks.style.display = 'none';
                }
            }, 400); // Match this with the CSS transition time
        });
    });
    
    // Navigation
    const header = document.querySelector('header');
    const menuItems = document.querySelectorAll('.nav-links a');

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Testimonial Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Scroll Event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate timeline items when they come into view
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                item.classList.add('animated');
            }
        });
    });

    // Active Menu Item
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add active class to current section in nav
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Testimonial Slider
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            testimonialDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would normally slide to the corresponding testimonial
            // For demonstration purposes, we're just changing the active dot
            // In a real implementation, you might use a slider library or
            // write custom logic to show the corresponding testimonial
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.style.borderColor = 'red';
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // In a real implementation, you would submit the form to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '#ddd';
                // In a real implementation, you would submit the form to a server
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add animation class to timeline items initially in view
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100) {
            item.classList.add('animated');
        }
    });
}); 