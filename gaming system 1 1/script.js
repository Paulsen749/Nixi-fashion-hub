// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form validation
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      e.preventDefault();
      alert('Please fill in all fields');
    }
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
      e.preventDefault();
      alert('Passwords do not match');
    }
  });
}

// Tournament countdown
const tournamentDate = document.querySelector('.tournament-date');

if (tournamentDate) {
  function updateCountdown() {
    const now = new Date();
    const nextFriday = new Date();
    
    // Set to next Friday 7:00 PM
    nextFriday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
    nextFriday.setHours(19, 0, 0, 0);
    
    const diff = nextFriday - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    tournamentDate.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Image lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Video lazy loading
const lazyVideos = document.querySelectorAll('video[data-src]');

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        video.removeAttribute('data-src');
        videoObserver.unobserve(video);
      }
    });
  });

  lazyVideos.forEach((video) => {
    videoObserver.observe(video);
  });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

// FAQ Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');

if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Event Countdown Timer
function updateEventCountdown() {
    const eventDate = new Date('2024-03-25T12:00:00');
    const now = new Date();
    const diff = eventDate - now;
    
    if (diff <= 0) {
        document.querySelector('.event-countdown').textContent = 'Event has started!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.querySelector('.event-countdown').textContent = 
        `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

if (document.querySelector('.event-countdown')) {
    updateEventCountdown();
    setInterval(updateEventCountdown, 1000);
}

// Replace both functions with this single version
function toggleMenu() {
  const menu = document.getElementById("rightMenu");
  if (menu.style.width === "250px" || menu.style.width === "80%") {
    menu.style.width = "0";
  } else {
    menu.style.width = window.innerWidth > 768 ? "250px" : "80%";
  }
}


// Mobile menu functionality - improved version
document.addEventListener('DOMContentLoaded', function() {
  // Get elements with null checks
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  
  // Only proceed if elements exist
  if (!mobileMenuBtn || !mobileMenu || !closeMenuBtn) {
    console.error('Mobile menu elements not found');
    return;
  }

  // Toggle menu function
  function toggleMenu() {
    mobileMenu.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : '';
  }

  // Event listeners
  mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling to document
    toggleMenu();
  });

  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu.classList.contains('show') && 
        !mobileMenu.contains(e.target) && 
        e.target !== mobileMenuBtn) {
      toggleMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
      toggleMenu();
    }
  });
});
