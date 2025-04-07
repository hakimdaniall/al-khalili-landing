// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const header = document.querySelector('header');
    const menuItems = document.querySelectorAll('.nav-links a');

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Testimonial Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

    // Scroll Event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Menu Item
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            this.classList.add('active');
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

    // AOS Animation (you would need to include AOS library for this to work)
    // Uncomment if you add AOS library
    // AOS.init({
    //     duration: 800,
    //     easing: 'ease-in-out',
    //     once: true
    // });
}); 