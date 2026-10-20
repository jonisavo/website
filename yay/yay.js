(() => {
  const button = document.getElementById('yay-button');
  const thumb = document.getElementById('thumb');
  const cheer = document.getElementById('cheer');
  const status = document.getElementById('sound-status');
  const confetti = document.getElementById('confetti');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#f5f', '#55f', '#ffdf70', '#0aa', '#eee', '#0a0'];
  let cleanupTimer;
  let haloTimer;

  function clearConfetti() {
    clearTimeout(cleanupTimer);
    clearTimeout(haloTimer);
    confetti.replaceChildren();
    button.classList.remove('is-glowing');
  }

  function celebrate() {
    clearConfetti();
    if (reducedMotion.matches) return;

    const currentScale = getComputedStyle(thumb).scale;
    thumb.getAnimations()
      .filter(animation => animation.id === 'thumb-pop')
      .forEach(animation => animation.cancel());
    thumb.animate([
      { scale: currentScale === 'none' ? '1' : currentScale },
      { scale: '1.12', offset: 0.35 },
      { scale: '1' }
    ], { id: 'thumb-pop', duration: 360, easing: 'ease-out' });

    const rect = button.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 3;
    const pieces = document.createDocumentFragment();

    for (let i = 0; i < 56; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = `${originX}px`;
      piece.style.top = `${originY}px`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * Math.min(window.innerWidth, 850)}px`);
      piece.style.setProperty('--rise', `${-60 - Math.random() * 140}px`);
      piece.style.setProperty('--fall', `${window.innerHeight - originY + 20}px`);
      piece.style.setProperty('--rotation', `${(Math.random() - 0.5) * 900}deg`);
      piece.style.setProperty('--duration', `${2200 + Math.random() * 700}ms`);
      pieces.append(piece);
    }

    confetti.append(pieces);
    button.classList.add('is-glowing');
    haloTimer = setTimeout(() => button.classList.remove('is-glowing'), 1600);
    cleanupTimer = setTimeout(clearConfetti, 3000);
  }

  button.addEventListener('click', () => {
    status.textContent = '';
    cheer.pause();
    cheer.currentTime = 0;
    cheer.play().catch(error => {
      if (error.name !== 'AbortError') {
        status.textContent = "Couldn't play the cheer. Try again?";
      }
    });
    celebrate();
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      clearConfetti();
      thumb.getAnimations().forEach(animation => animation.cancel());
    }
  });

  button.disabled = false;
})();
