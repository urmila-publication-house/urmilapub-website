// Dark mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
const htmlEl = document.documentElement;

function setDarkMode(enabled) {
  if (enabled) {
    htmlEl.classList.add('dark');
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    htmlEl.classList.remove('dark');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Check saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  setDarkMode(true);
}

toggleBtn.addEventListener('click', () => {
  const isDark = htmlEl.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  setDarkMode(isDark);
});

// Smooth scroll for anchor links
document.querySelectorAll('a.scroll-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Initialize Swipers after DOM load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.booksSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 4000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
    new Swiper('.testimonialSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }
});