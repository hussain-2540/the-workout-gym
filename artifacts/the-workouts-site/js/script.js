/* THE WORKOUTS — small, plain JavaScript interactions */
(function () {
  'use strict';

  var menuButton = document.querySelector('.menu-button');
  var nav = document.querySelector('.nav-links');

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('no-scroll', !isOpen);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href');
      var target = document.querySelector(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var revealItems = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  } else if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  }

  var lightbox = document.querySelector('.lightbox');
  var lightboxImage = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('button') : null;
  var galleryImages = document.querySelectorAll('[data-lightbox]');

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImage) lightboxImage.removeAttribute('src');
    document.body.classList.remove('no-scroll');
  }
  galleryImages.forEach(function (image) {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', 'Enlarge photograph');
    image.addEventListener('click', function () {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    });
    image.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        image.click();
      }
    });
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      var answer = question.nextElementSibling;
      var expanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.classList.toggle('open', !expanded);
    });
  });

  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      var name = document.querySelector('#name');
      var phone = document.querySelector('#phone');
      var message = document.querySelector('#message');
      var fields = [
        { input: name, error: 'Please add your name.' },
        { input: phone, error: 'Please add a phone number.' },
        { input: message, error: 'Please tell us what you need.' }
      ];
      fields.forEach(function (field) {
        var errorNode = field.input.parentElement.querySelector('.field-error');
        if (!field.input.value.trim()) {
          errorNode.textContent = field.error;
          valid = false;
        } else {
          errorNode.textContent = '';
        }
      });
      if (phone.value.trim() && !/^[+\d][\d\s-]{7,}$/.test(phone.value.trim())) {
        phone.parentElement.querySelector('.field-error').textContent = 'Use a valid phone number.';
        valid = false;
      }
      var formMessage = document.querySelector('.form-message');
      if (valid && formMessage) {
        /* TODO: connect this form to the gym's preferred inbox or CRM. */
        formMessage.textContent = 'Thanks — your message is ready. The gym team will reply through the contact details you provided.';
        formMessage.classList.add('visible');
        contactForm.reset();
      } else if (formMessage) {
        formMessage.textContent = 'Please check the highlighted fields and try again.';
        formMessage.classList.add('visible');
      }
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
}());