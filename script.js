

// ===== Mobile hamburger menu toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
 
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
 
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
 
// ===== Navbar shadow + active link highlight on scroll =====
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
 
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
 
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
 
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
 
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
// ===== Typing effect in hero =====
const typedTextEl = document.getElementById('typedText');
const phrases = ['clean websites.', 'responsive UIs.', 'fast experiences.', 'modern interfaces.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
 
function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
 
    if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
 
    let typeSpeed = isDeleting ? 40 : 80;
 
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }
 
    setTimeout(typeEffect, typeSpeed);
}
 
typeEffect();
 
// ===== Animated counters in hero =====
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;
 
function animateCounters() {
    if (countersAnimated) return;
    const heroStats = document.querySelector('.hero-stats');
    const rect = heroStats.getBoundingClientRect();
 
    if (rect.top < window.innerHeight - 50) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = target / 40;
 
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
        countersAnimated = true;
    }
}
 
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);
 
// ===== Scroll reveal animation =====
const revealElements = document.querySelectorAll('.reveal');
 
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });
 
revealElements.forEach(el => revealObserver.observe(el));
 
// ===== Animate skill bars when scrolled into view =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;
 
function animateSkills() {
    if (skillsAnimated) return;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
 
    if (sectionTop < windowHeight - 100) {
        skillFills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.transition = 'width 1s ease-in-out';
                fill.style.width = targetWidth;
            }, 100);
        });
        skillsAnimated = true;
    }
}
 
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
 
// ===== Contact form validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');
 
function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}
 
function clearError(input, errorId) {
    input.classList.remove('invalid');
    document.getElementById(errorId).textContent = '';
}
 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
 
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError', 'Please enter your name');
        isValid = false;
    } else {
        clearError(nameInput, 'nameError');
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'emailError', 'Please enter your email');
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'emailError', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput, 'emailError');
    }
 
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError', 'Please enter a message');
        isValid = false;
    } else {
        clearError(messageInput, 'messageError');
    }
 
    if (isValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 4000);
    }
});
 
