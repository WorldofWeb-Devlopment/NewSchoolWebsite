
    // ——— NAVBAR SCROLL ———
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ——— MOBILE MENU ———
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', menu.classList.contains('open'));
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        document.getElementById('mobileMenu').classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });

    // ——— HERO SLIDER ———
    let currentSlide = 0;
    let sliderInterval = setInterval(() => nextSlide(), 5500);

    function goToSlide(n) {
      clearInterval(sliderInterval);
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.hero-dot');
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = n;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      sliderInterval = setInterval(() => nextSlide(), 5500);
    }

    function nextSlide() {
      const total = document.querySelectorAll('.slide').length;
      goToSlide((currentSlide + 1) % total);
    }

    // ——— SCROLL ANIMATIONS ———
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Trigger meter fills
          e.target.querySelectorAll('.meter-fill').forEach(m => m.classList.add('animated'));
          // Counter animations
          if (e.target.querySelector('[data-target]')) {
            e.target.querySelectorAll('[data-target]').forEach(animateCounter);
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-left, .fade-right').forEach(el => observer.observe(el));

    // Observe highlight items for counters
    document.querySelectorAll('.highlight-item').forEach(el => observer.observe(el));

    // ——— COUNTER ANIMATION ———
    function animateCounter(el) {
      if (el.dataset.animated) return;
      el.dataset.animated = true;
      const target = parseInt(el.dataset.target);
      const duration = 1800;
      const start = performance.now();
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }

    // ——— SYMBOL MODAL ———
    const symbolData = {
      book: { emoji: '📖', title: 'The Open Book — Knowledge Sharing', body: 'The open book symbolizes our unwavering commitment to sharing knowledge freely and openly. At DNU S.M.B.M, we believe that knowledge is not a privilege but a right. Every child deserves access to the finest learning, and our open book represents the open doors of opportunity we extend to every student who walks through our gates.' },
      laptop: { emoji: '💻', title: 'The Laptop — Modern Education', body: 'Technology is the language of tomorrow. The laptop in our emblem represents our dedication to blending traditional values with cutting-edge education. Our smart classrooms, computer labs, robotics programs, and digital learning tools ensure our students are ready to thrive in the 21st century — fluent in both wisdom and technology.' },
      globe: { emoji: '🌍', title: 'The Globe — Global Exposure', body: 'Education without boundaries. The globe represents our vision of producing global citizens who think beyond borders. Through HAM Radio connections worldwide, international curriculum standards, exposure to global events, and a multicultural perspective embedded in every subject, our students are prepared to make a mark not just in India, but on the world stage.' },
      micro: { emoji: '🔬', title: 'The Microscope — Research & Inquiry', body: 'We nurture scientists, thinkers, and innovators. The microscope represents our deep commitment to scientific inquiry, critical thinking, and research-based learning. Fully equipped laboratories, science clubs, Olympiad preparation, and project-based learning ensure that every student develops the habit of asking "Why?" and the skills to find the answer.' },
      atom: { emoji: '⚛️', title: 'Atomic Structure — Unity & Innovation', body: 'Just as electrons orbit a nucleus in perfect harmony, our school community works in beautiful unity. The atomic structure represents the bond between students, teachers, parents, and the broader community — all orbiting the shared nucleus of academic excellence and human values. It also symbolizes our focus on Science, Technology, and Innovation as pillars of the future.' }
    };

    function openSymbol(key) {
      const d = symbolData[key];
      document.getElementById('symEmoji').textContent = d.emoji;
      document.getElementById('symTitle').textContent = d.title;
      document.getElementById('symBody').textContent = d.body;
      document.getElementById('symModal').classList.add('open');
    }

    function closeSymbol() {
      document.getElementById('symModal').classList.remove('open');
    }

    document.getElementById('symModal').addEventListener('click', function (e) {
      if (e.target === this) closeSymbol();
    });

    // ——— CURRICULUM TABS ———
    function showTab(id, btn) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + id).classList.add('active');
      btn.classList.add('active');
    }

    // ——— GALLERY FILTER ———
    function filterGallery(cat, btn) {
      document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? 'block' : 'none';
      });
    }

    // ——— FORM SUBMIT ———
    function withTimeout(promise, timeoutMs) {
      return Promise.race([
        promise,
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timed out. Please check your internet connection and Firestore rules.')), timeoutMs);
        })
      ]);
    }

    // async function submitForm(e) {
    //   e.preventDefault();

    //   const form = e.target;
    //   const submitButton = form.querySelector('.form-submit');
    //   const formData = new FormData(form);

    //   const enquiryData = {
    //     parentName: formData.get('parentName').trim(),
    //     childGrade: formData.get('childGrade'),
    //     phone: formData.get('phone').trim(),
    //     email: formData.get('email').trim(),
    //     message: formData.get('message').trim(),
    //     createdAt: new Date()
    //   };

    //   submitButton.disabled = true;
    //   submitButton.textContent = 'Sending...';

    //   try {
    //     await withTimeout(addDoc(collection(db, 'admissionEnquiries'), enquiryData), 12000);

    //     document.getElementById('formContent').style.display = 'none';
    //     document.getElementById('formSuccess').classList.add('show');
    //     setTimeout(() => {
    //       document.getElementById('formContent').style.display = 'block';
    //       document.getElementById('formSuccess').classList.remove('show');
    //       form.reset();
    //     }, 6000);
    //   } catch (error) {
    //     console.error('Error saving enquiry:', error);
    //     const message = error?.message || 'Unknown Firebase error';
    //     console.error(`Sorry, your enquiry could not be sent.\n\n${message}`);
    //   } finally {
    //     submitButton.disabled = false;
    //     submitButton.textContent = 'Send Enquiry →';
    //   }
    // }

    // ——— STAGGERED CARD ANIMATIONS ———
    document.querySelectorAll('.activity-card, .symbol-card, .timeline-item').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(el);
    });

    window.toggleMenu = toggleMenu;
    window.goToSlide = goToSlide;
    window.openSymbol = openSymbol;
    window.closeSymbol = closeSymbol;
    window.showTab = showTab;
    window.filterGallery = filterGallery;
    // window.submitForm = submitForm;

   
//     emailjs.init(" H02ZHbd7y_UVbV2Iv");
//     emailjs.send(
//   "service_jjf7lks",
//   "template_xumipbg",
//   enquiryData
// );
 
