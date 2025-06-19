// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for About/Skills animations
function animateOnScrollObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('visible');
                // Staggered delay
                const delay = el.getAttribute('data-delay') || 0;
                el.style.transitionDelay = delay + 'ms';
                // Animate skill bars if present
                if (el.classList.contains('skill-category')) {
                    el.querySelectorAll('.skill-list li').forEach((li, idx) => {
                        setTimeout(() => li.classList.add('visible'), 100 * idx);
                    });
                }
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Animate skill bars when their li becomes visible
function animateSkillBars() {
    document.querySelectorAll('.skill-list li').forEach(li => {
        if (li.classList.contains('visible')) {
            const bar = li.querySelector('.skill-bar');
            if (bar && !bar.querySelector('.skill-bar-fill')) {
                const percent = bar.getAttribute('data-skill') || 0;
                const fill = document.createElement('div');
                fill.className = 'skill-bar-fill';
                fill.style.setProperty('--skill-width', percent + '%');
                bar.appendChild(fill);
                setTimeout(() => {
                    fill.style.width = percent + '%';
                }, 100);
            }
        }
    });
}

// Run observers and skill bar animation on scroll and load
window.addEventListener('DOMContentLoaded', () => {
    animateOnScrollObserver();
    animateSkillBars();
});
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('resize', animateSkillBars);

// Email Functionality using EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showModal('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('Please enter a valid email address.');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: "Nshuti Jabes"
    })
    .then(function() {
        showModal('Thank you for your message! I will get back to you soon.');
        document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
        showModal('Sorry, there was an error sending your message. Please try again later.');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close');

function showModal(message) {
    modalText.textContent = message;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}