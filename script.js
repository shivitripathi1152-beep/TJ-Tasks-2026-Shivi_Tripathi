/* ==========================================================================
   StudySync - Interactive Script
   Tech Stack: HTML5, CSS3, Vanilla JavaScript (ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Navbar Sticky & Shadow State
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  
  const handleScrollHeader = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader(); // Initial check

  // ------------------------------------------------------------------------
  // 2. Mobile Navigation Hamburger Menu Toggle
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  };

  const closeMobileMenu = () => {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('open');
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on nav link click & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
    });
  });

  // ------------------------------------------------------------------------
  // 3. ScrollSpy Active Section Navigation Highlighting
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('main section[id]');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });

  // ------------------------------------------------------------------------
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ------------------------------------------------------------------------
  // 5. Interactive Hero Dashboard Checklist & Dynamic Progress Bar
  // ------------------------------------------------------------------------
  const heroChecklist = document.getElementById('heroChecklist');
  const dashProgressBar = document.getElementById('dashProgressBar');
  const dashProgressPct = document.getElementById('dashProgressPct');
  const dashProgressText = document.getElementById('dashProgressText');

  if (heroChecklist) {
    const checkboxes = heroChecklist.querySelectorAll('.task-checkbox');

    const updateDashboardProgress = () => {
      const total = checkboxes.length;
      let completedCount = 0;

      checkboxes.forEach(cb => {
        const itemLabel = cb.closest('.check-item');
        if (cb.checked) {
          completedCount++;
          itemLabel.classList.add('completed');
        } else {
          itemLabel.classList.remove('completed');
        }
      });

      const percentage = Math.round((completedCount / total) * 100);

      if (dashProgressBar) {
        dashProgressBar.style.width = `${percentage}%`;
      }
      if (dashProgressPct) {
        dashProgressPct.textContent = `${percentage}%`;
      }
      if (dashProgressText) {
        dashProgressText.textContent = `${completedCount} of ${total} tasks completed`;
      }
    };

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateDashboardProgress);
    });
  }

  // ------------------------------------------------------------------------
  // 6. Interactive Product Feature Switcher (Tabs) & AI Assistant Prompts
  // ------------------------------------------------------------------------
  const showcaseTabs = Array.from(document.querySelectorAll('.showcase-tab'));
  const tabPanels = document.querySelectorAll('.tab-panel');

  const switchTab = (targetTab) => {
    const targetId = targetTab.getAttribute('data-tab');

    // Update active tab buttons & accessibility attributes
    showcaseTabs.forEach(t => {
      const isSelected = (t === targetTab);
      t.classList.toggle('active', isSelected);
      t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      t.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Display active tab panel with smooth transition
    tabPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  };

  showcaseTabs.forEach((tab, index) => {
    // Click event handler
    tab.addEventListener('click', () => switchTab(tab));

    // Keyboard navigation (Arrow keys, Home, End)
    tab.addEventListener('keydown', (e) => {
      let nextIndex = index;
      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % showcaseTabs.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + showcaseTabs.length) % showcaseTabs.length;
        e.preventDefault();
      } else if (e.key === 'Home') {
        nextIndex = 0;
        e.preventDefault();
      } else if (e.key === 'End') {
        nextIndex = showcaseTabs.length - 1;
        e.preventDefault();
      }

      if (nextIndex !== index) {
        showcaseTabs[nextIndex].focus();
        switchTab(showcaseTabs[nextIndex]);
      }
    });
  });

  // Simulated AI Responses for AI Assistant Prompts
  const aiResponses = {
    plan: {
      user: '"Create a study plan for my upcoming exams"',
      bot: '"Here is your 7-day study plan: Mon & Tue focus on CS101 Algorithms (3 hrs/day), Wed reserved for Math 202 review, and Thu/Fri dedicated to Physics lab problem sets with built-in 15-min breaks."'
    },
    deadlines: {
      user: '"Organize my deadlines for this week"',
      bot: '"Sorted 4 upcoming deadlines by urgency: 1. CS101 Essay (Due Today, 11:59 PM), 2. Math Quiz (Tomorrow, 2:00 PM), 3. Physics Milestone (Friday, 5:00 PM), 4. ENG Outline (Next Monday)."'
    },
    schedule: {
      user: '"Improve my daily study schedule"',
      bot: '"Analyzed your study logs: You are 40% more focused during morning hours (9 AM - 12 PM). I\'ve rescheduled your high-priority problem sets to peak morning focus slots!"'
    }
  };

  const aiPromptBtns = document.querySelectorAll('.ai-prompt-btn');
  const aiResponseBubble = document.getElementById('aiResponseBubble');
  const aiUserBubble = document.getElementById('aiUserBubble');

  aiPromptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const promptType = btn.getAttribute('data-prompt');
      const data = aiResponses[promptType];

      if (data) {
        // Update active prompt button
        aiPromptBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update conversation with smooth fade
        if (aiUserBubble) {
          aiUserBubble.style.opacity = '0.5';
          setTimeout(() => {
            aiUserBubble.textContent = data.user;
            aiUserBubble.style.opacity = '1';
          }, 150);
        }

        if (aiResponseBubble) {
          aiResponseBubble.style.opacity = '0.5';
          setTimeout(() => {
            aiResponseBubble.textContent = data.bot;
            aiResponseBubble.style.opacity = '1';
          }, 150);
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // Product Section Task Planner Checkbox Interactivity & Calculations
  // ------------------------------------------------------------------------
  const productTaskList = document.getElementById('productTaskList');
  const productTaskBadge = document.getElementById('productTaskBadge');
  const productTaskPctText = document.getElementById('productTaskPctText');
  const productTaskProgressBar = document.getElementById('productTaskProgressBar');

  if (productTaskList) {
    const productTaskCheckboxes = productTaskList.querySelectorAll('.product-task-checkbox');

    const updateProductTasks = () => {
      const total = productTaskCheckboxes.length;
      let completedCount = 0;

      productTaskCheckboxes.forEach(cb => {
        const itemLabel = cb.closest('.mock-item');
        const checkSpan = itemLabel.querySelector('.mock-check');
        const textSpan = itemLabel.querySelector('.mock-text');
        const tagSpan = itemLabel.querySelector('.mock-tag');
        const category = cb.getAttribute('data-category');

        if (cb.checked) {
          completedCount++;
          itemLabel.classList.add('completed');
          checkSpan.classList.add('checked');
          checkSpan.textContent = '✓';
          textSpan.classList.add('strike');
          if (tagSpan && category) {
            tagSpan.textContent = `${category} • Completed`;
          }
        } else {
          itemLabel.classList.remove('completed');
          checkSpan.classList.remove('checked');
          checkSpan.textContent = '';
          textSpan.classList.remove('strike');
          if (tagSpan && category) {
            tagSpan.textContent = `${category} • Pending`;
          }
        }
      });

      const percentage = Math.round((completedCount / total) * 100);

      if (productTaskBadge) {
        productTaskBadge.textContent = `${completedCount} of ${total} Completed (${percentage}%)`;
      }
      if (productTaskPctText) {
        productTaskPctText.textContent = `${percentage}%`;
      }
      if (productTaskProgressBar) {
        productTaskProgressBar.style.width = `${percentage}%`;
      }
    };

    productTaskCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateProductTasks);
    });
  }

  // ------------------------------------------------------------------------
  // 7. Contact Form Validation & Friendly Success Alert
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (input, errorId) => {
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.classList.add('error');
      }
    };

    const clearError = (input) => {
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('error');
      }
    };

    // Real-time error clearing on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => clearError(input));
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'nameError');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'emailError');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'subjectError');
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'messageError');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      // Successful submission logic
      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnText;

          // Show success message
          if (formSuccess) {
            formSuccess.classList.add('show');
          }

          // Reset form inputs
          contactForm.reset();

          // Hide success message after 6 seconds
          setTimeout(() => {
            if (formSuccess) {
              formSuccess.classList.remove('show');
            }
          }, 6000);
        }, 800);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. Onboarding Modal Interactivity & Keyboard Shortcuts
  // ------------------------------------------------------------------------
  const onboardingModal = document.getElementById('onboardingModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const startOrganizingBtn = document.getElementById('startOrganizingBtn');
  const optionCards = document.querySelectorAll('.modal-option-card');

  const openModal = () => {
    if (onboardingModal) {
      onboardingModal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    if (onboardingModal) {
      onboardingModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  };

  // Open modal triggers (Get Started & Get Started Free buttons)
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu(); // Close mobile drawer if open
      openModal();
    });
  });

  // Close modal trigger (X button)
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking on overlay background
  if (onboardingModal) {
    onboardingModal.addEventListener('click', (e) => {
      if (e.target === onboardingModal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && onboardingModal && onboardingModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Option selection toggle (Assignments, Deadlines, Study Goals)
  optionCards.forEach(card => {
    const checkbox = card.querySelector('.modal-option-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }
  });

  // "Start Organizing →" button click: close modal and smooth scroll to Product section
  if (startOrganizingBtn) {
    startOrganizingBtn.addEventListener('click', () => {
      closeModal();
      const productSection = document.getElementById('product');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

