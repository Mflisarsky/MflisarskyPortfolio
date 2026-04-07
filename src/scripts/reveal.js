(() => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SELECTORS = [
    '[data-reveal]',
    '.card',
    '.hero',
    '.project-card',
    '.prose img',
    '.prose pre',
  ];

  function uniqueElements(elements) {
    const set = new Set(elements);
    return Array.from(set);
  }

  function addRevealClass(el) {
    if (!el || !(el instanceof HTMLElement)) return;
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  }

  function markInitial() {
    const nodes = SELECTORS.flatMap((sel) =>
      Array.from(document.querySelectorAll(sel)),
    );
    uniqueElements(nodes).forEach((el) => addRevealClass(el));
  }

  function showImmediately() {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  function observe() {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
  }

  function init() {
    markInitial();
    if (prefersReducedMotion) {
      showImmediately();
      return;
    }
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

