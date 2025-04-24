// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Loading overlay functionality
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // List of assets to preload
    const imagesToPreload = [
        './assets/alkhalili-logo.png',
        'https://varthana.com/school/wp-content/uploads/2023/05/B357.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a6/Putrajaya_Malaysia_Ministry-of-Education-04.jpg',
        'https://www.foyerglobalhealth.com/wp-content/uploads/2024/09/pexels-yulia-2077612-3815533-1568x1045.jpg',
        'https://harakahdaily.net/wp-content/uploads/2021/11/18112021exam.jpg',
        'https://dam.mediacorp.sg/image/upload/s--oHf0b23O--/fl_relative,g_south_east,l_mediacorp:cna:watermark:2021-08:cna,w_0.1/f_auto,q_auto/c_fill,g_auto,h_676,w_1200/v1/mediacorp/cna/image/2024/09/11/img_9237.jpg?itok=hlyMHseo',
        'https://sureworks.info/__file/EFSF%20Feb%202025.jpg?ulid=01JM8TR8RCEXK9R42XYF3PBMGE'
    ];
    
    // Check when page and all resources are fully loaded
    function hideLoading() {
        loadingOverlay.classList.add('hidden');
        // Remove after transition completes
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
        }, 500);
    }
    
    // Preload images
    let loadedImages = 0;
    const totalImages = imagesToPreload.length;
    
    function preloadImages() {
        if (totalImages === 0) {
            // If no images to preload, hide loading immediately
            hideLoading();
            return;
        }
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = function() {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded, hide the overlay
                    hideLoading();
                }
            };
            img.src = src;
        });
    }
    
    // Start preloading images
    preloadImages();
    
    // Fallback - hide loading after 5 seconds even if not all assets are loaded
    const loadingTimeout = setTimeout(() => {
        hideLoading();
    }, 5000);
    
    // Handle window.load event for complete loading
    window.addEventListener('load', function() {
        // Clear the timeout as window.load means everything is loaded
        clearTimeout(loadingTimeout);
        // Hide loading overlay if it hasn't been hidden yet
        hideLoading();
        
        // Optimize images that were lazy loaded
        const lazyLoadImages = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyLoadImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    });
    
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

    // Contact Form Submission
    const contactForm = document.querySelector('#contactForm');
    const formStatus = document.querySelector('#form-status');
    const submitBtn = document.querySelector('#submitBtn');
    
    if (contactForm) {
        // Add button micro interaction
        submitBtn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            this.appendChild(ripple);
            
            // Calculate position
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        contactForm.addEventListener('submit', function(e) {
            // No need to preventDefault as we're allowing the form to submit naturally
            
            // Form validation (still good to perform client-side)
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Clear previous validation states
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            messageInput.classList.remove('error');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.style.borderColor = 'red';
                nameInput.classList.add('error');
                e.preventDefault();
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
                emailInput.classList.add('error');
                e.preventDefault();
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.style.borderColor = 'red';
                messageInput.classList.add('error');
                e.preventDefault();
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            if (!isValid) {
                formStatus.textContent = 'Please fill out all fields correctly.';
                formStatus.style.color = 'red';
                formStatus.style.opacity = '1';
                formStatus.style.transform = 'translateY(0)';
                return false;
            }
            
            // If valid, add sending animation to button
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';
            
            // Show sending message
            formStatus.textContent = 'Sending your message...';
            formStatus.style.color = 'var(--primary-color)';
            formStatus.style.opacity = '1';
            formStatus.style.transform = 'translateY(0)';
            
            // We return true to allow the form to submit (FormSubmit will handle the actual sending)
            return true;
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

// No need for the custom sendEmail function since FormSubmit handles this
// Delete or comment out the sendEmail function
// function sendEmail(formData) { ... } 