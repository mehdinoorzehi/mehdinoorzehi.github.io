(function () {
  'use strict';

  const splash = document.getElementById('splash');
  const appBar = document.querySelector('.app-bar');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const reveals = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');
  const serviceItems = document.querySelectorAll('.service-item');
  const fab = document.getElementById('fab');
  const snackbar = document.getElementById('snackbar');

  /* Splash — Hot Reload inspired */
  window.addEventListener('load', () => {
    setTimeout(() => splash?.classList.add('hidden'), 600);
  });

  /* App bar scroll shadow */
  window.addEventListener('scroll', () => {
    appBar?.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  }, { passive: true });

  /* Mobile nav */
  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks?.classList.contains('open'));
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });

  /* Active nav highlight */
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* Skill bars animate on view */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  /* Accordion services */
  serviceItems.forEach(item => {
    const header = item.querySelector('.service-header');
    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      serviceItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* Ripple effect on buttons */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* FAB scroll to contact */
  fab?.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* Snackbar helper */
  window.showSnackbar = function (msg) {
    if (!snackbar) return;
    snackbar.textContent = msg;
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 2800);
  };

  updateActiveNav();
})();
