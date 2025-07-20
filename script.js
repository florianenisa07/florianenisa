// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Scroll animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .achievement-card, .gallery-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual fetch/axios call in production)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('There was an error sending your message. Please try again later.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Initialize skill animations on load
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    animateOnScroll(); // trigger on load
});

// Lightbox functionality for fullscreen image/video view
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxContent = document.getElementById('lightboxContent');

        const media = item.querySelector('img, video');
        const isVideo = media.tagName.toLowerCase() === 'video';
        const src = isVideo
            ? media.querySelector('source')?.getAttribute('src') || media.getAttribute('src')
            : media.getAttribute('src');

 lightboxContent.innerHTML = isVideo
    ? `<video src="${src}" controls autoplay muted loop style="border-radius: 10px;">`
    : `<img src="${src}" alt="Full Image" style="border-radius: 10px;">`;

        lightbox.style.display = 'flex';
    });
});

// Close lightbox
document.querySelector('.lightbox-close').addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    lightbox.style.display = 'none';
    lightboxContent.innerHTML = '';
});
