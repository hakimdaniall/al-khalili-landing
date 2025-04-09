// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Function to check if we're on mobile view
    function isMobileView() {
        return window.innerWidth <= 768; // Match this with your CSS media query breakpoint
    }
    
    // Function to toggle body scroll
    function toggleBodyScroll(disable) {
        if (disable) {
            // Save current scroll position and disable scrolling
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scrolling and position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }
    
    // Function to reset nav display on screen size change
    function resetNavDisplay() {
        if (!isMobileView()) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('show');
            toggleBodyScroll(false); // Ensure scrolling is enabled on desktop
        } else if (!navLinks.classList.contains('show')) {
            navLinks.style.display = 'none';
        }
    }
    
    // Listen for window resize and reset nav
    window.addEventListener('resize', resetNavDisplay);
    
    // Initial call to set correct state
    resetNavDisplay();
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (!navLinks.classList.contains('show')) {
            // First make the menu visible but with 0 height
            navLinks.style.display = 'flex';
            
            // Disable scrolling when menu is open
            if (isMobileView()) {
                toggleBodyScroll(true);
            }
            
            // Force browser to recognize the display change before adding the show class
            setTimeout(() => {
                navLinks.classList.add('show');
            }, 10);
        } else {
            // When closing, we remove the show class first, then hide after animation completes
            navLinks.classList.remove('show');
            
            // Re-enable scrolling when menu is closed
            if (isMobileView()) {
                toggleBodyScroll(false);
            }
            
            // Wait for the transition to finish before hiding the menu
            setTimeout(() => {
                // Only hide if we're still in mobile view and menu isn't showing
                if (isMobileView() && !navLinks.classList.contains('show')) {
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
            
            // Re-enable scrolling when menu is closed via nav link click
            if (isMobileView()) {
                toggleBodyScroll(false);
            }
            
            // Wait for the transition to finish before hiding the menu
            setTimeout(() => {
                // Only hide if we're still in mobile view and menu isn't showing
                if (isMobileView() && !navLinks.classList.contains('show')) {
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
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Ensure any paragraphs in answers have initial state
        const paragraphs = item.querySelectorAll('.faq-answer p');
        paragraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(10px)';
        });
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach((faqItem, i) => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                    
                    // Reset paragraphs in closed items
                    const closedParagraphs = faqItem.querySelectorAll('.faq-answer p');
                    closedParagraphs.forEach(p => {
                        p.style.opacity = '0';
                        p.style.transform = 'translateY(10px)';
                        p.style.transitionDelay = '0s';
                    });
                }
            });
            
            // Toggle current FAQ item with a slight delay for effect
            setTimeout(() => {
                item.classList.toggle('active');
                
                // Add a staggered entrance effect for multiple FAQ items
                if (item.classList.contains('active')) {
                    // Apply staggered animation delay to child paragraph
                    paragraphs.forEach((p, i) => {
                        p.style.transitionDelay = (0.1 + (i * 0.05)) + 's';
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, 100); // Small delay for better effect
                    });
                }
            }, item.classList.contains('active') ? 0 : 50);
        });
        
        // Add initial delay for first page load
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
        }, 100);
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