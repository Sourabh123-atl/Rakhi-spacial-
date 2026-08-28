/* ==========================================================================
   A BOND BEYOND WORDS - HAPPY RAKSHA BANDHAN
   Interactive Audio, Canvas Petals, Envelope 3D, Lightbox, Confetti & Logic
   ========================================================================== */

// --- Global State & Configuration ---
const AppState = {
  friendName: localStorage.getItem('rakhi_friend_name') || 'Riya',
  yourName: localStorage.getItem('rakhi_your_name') || 'Aman',
  musicPlaying: false,
  audioCtx: null,
  musicTimer: null,
  lightboxIndex: 0,
  memories: [
    {
      src: 'assets/images/friends_cafe_laughter.jpg',
      caption: '“The day this beautiful friendship started ✨”'
    },
    {
      src: 'assets/images/friends_goofy_selfie.jpg',
      caption: '“Our unlimited laughter 😂”'
    },
    {
      src: 'assets/images/rakhi_celebration_thali.jpg',
      caption: '“One picture, thousands of memories 💖”'
    },
    {
      src: 'assets/images/friends_sunset_hill.jpg',
      caption: '“Thank you for always being there 🤝”'
    },
    {
      src: 'assets/images/friends_gifts_celebrate.jpg',
      caption: '“The best moments are always with you 🫶”'
    },
    {
      src: 'assets/images/friends_childhood_icecream.jpg',
      caption: '“More memories are still waiting for us 🌸”'
    },
    {
      src: 'assets/images/friends_studying_fun.jpg',
      caption: '“Endless talks, teasing & sweet chaos ☕”'
    },
    {
      src: 'assets/images/hero_friends_bond.jpg',
      caption: '“Chosen sister for a lifetime ♾️💖”'
    }
  ]
};

// --- DOM Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Update Initial Names
  updateDOMNames();

  // Initialize Canvas Flower Petals
  initPetalCanvas();

  // Initialize Night Sky Stars & Floating Lanterns
  initNightSky();

  // Welcome Screen Sequence
  initWelcomeSequence();

  // Custom Cursor Sparkle Trail
  initCursorTrail();

  // Initialize Typewriter Effect in Hero Section
  initTypewriter();

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });

  // Music toggle button
  document.getElementById('music-toggle-btn').addEventListener('click', toggleMusic);

  // Personalize drawer buttons
  document.getElementById('open-personalizer-btn').addEventListener('click', openPersonalizer);
});

// =========================================================================
// 1. WELCOME SCREEN ANIMATION SEQUENCE
// =========================================================================
function initWelcomeSequence() {
  const text1 = document.getElementById('welcome-text-1');
  const text2 = document.getElementById('welcome-text-2');
  const btnWrap = document.getElementById('welcome-btn-wrap');
  const openBtn = document.getElementById('open-surprise-btn');

  // Step 1: Text 1 fade in
  setTimeout(() => {
    text1.classList.remove('opacity-0');
    text1.classList.add('opacity-100');
  }, 1200);

  // Step 2: Text 2 fade in
  setTimeout(() => {
    text2.classList.remove('opacity-0');
    text2.classList.add('opacity-100');
  }, 2600);

  // Step 3: Button reveal
  setTimeout(() => {
    btnWrap.classList.remove('opacity-0');
    btnWrap.classList.add('opacity-100', 'translate-y-0');
  }, 3800);

  // Trigger entering main website
  openBtn.addEventListener('click', enterSpecialWorld);
}

function enterSpecialWorld() {
  const welcomeScreen = document.getElementById('welcome-screen');
  
  // Start ambient audio
  startAmbientMusic();

  // Confetti explosion
  if (window.confetti) {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#e11d48', '#c084fc']
    });
  }

  // Smooth fade-out of welcome screen
  welcomeScreen.style.opacity = '0';
  welcomeScreen.style.transform = 'scale(1.05)';
  welcomeScreen.style.pointerEvents = 'none';

  setTimeout(() => {
    welcomeScreen.style.display = 'none';
  }, 1000);

  showToast('Welcome to our special Raksha Bandhan world! 🌸✨');
}

// =========================================================================
// 2. WEB AUDIO API INSTRUMENTAL MUSIC & SOUND SYNTHESIZER
// =========================================================================
// Generates a soft, soothing, ethereal Indian acoustic/flute raga ambience
function initAudioEngine() {
  if (!AppState.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    AppState.audioCtx = new AudioContext();
  }
}

function playSynthesizedChime(freq = 528, type = 'sine', duration = 1.2) {
  try {
    initAudioEngine();
    if (AppState.audioCtx.state === 'suspended') {
      AppState.audioCtx.resume();
    }
    const ctx = AppState.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Exponential decay
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.log('Audio chime error', err);
  }
}

// Generative soulful ambient melody notes (Raag Yaman / Bhupali soothing pentatonic scale)
const RAGA_SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

function playGenerativeNote() {
  if (!AppState.musicPlaying) return;
  try {
    initAudioEngine();
    const ctx = AppState.audioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const note = RAGA_SCALE[Math.floor(Math.random() * RAGA_SCALE.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle'; // Soft flute/harp warm harmonic
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.6);

    // Schedule next note in rhythmic pattern
    const nextInterval = (Math.random() * 800 + 600);
    AppState.musicTimer = setTimeout(playGenerativeNote, nextInterval);
  } catch (e) {
    console.log('Generative music note failed', e);
  }
}

function startAmbientMusic() {
  initAudioEngine();
  AppState.musicPlaying = true;
  updateMusicUI(true);
  playGenerativeNote();
}

function toggleMusic() {
  if (AppState.musicPlaying) {
    AppState.musicPlaying = false;
    clearTimeout(AppState.musicTimer);
    updateMusicUI(false);
    showToast('Ambient Music: Paused 🔇');
  } else {
    AppState.musicPlaying = true;
    updateMusicUI(true);
    playGenerativeNote();
    showToast('Ambient Music: Playing 🎶');
  }
}

function updateMusicUI(isPlaying) {
  const bars = document.getElementById('audio-bars');
  const btnText = document.getElementById('music-btn-text');
  if (isPlaying) {
    bars.classList.remove('opacity-40');
    bars.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'running');
    if (btnText) btnText.textContent = 'Music: On';
  } else {
    bars.classList.add('opacity-40');
    bars.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'paused');
    if (btnText) btnText.textContent = 'Music: Off';
  }
}

// =========================================================================
// 3. TYPEWRITER ANIMATION (HERO SECTION)
// =========================================================================
function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  const fullText = "Tum meri sirf best friend nahi ho… tum woh sister ho jo mujhe life ne gift ki hai. 💝";
  let idx = 0;

  function typeChar() {
    if (idx <= fullText.length) {
      textEl.textContent = fullText.slice(0, idx) + (idx < fullText.length ? '▌' : '');
      idx++;
      setTimeout(typeChar, 45);
    }
  }

  // Start after slight delay
  setTimeout(typeChar, 1000);
}

// =========================================================================
// 4. CANVAS FLOWER PETALS (ROSE & MARIGOLD PHYSIC SIMULATION)
// =========================================================================
function initPetalCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = window.innerWidth < 640 ? 20 : 35;
  const colors = [
    { fill: '#f472b6', border: '#ec4899' }, // Rose Pink
    { fill: '#fbcfe8', border: '#f472b6' }, // Soft Pink
    { fill: '#fbbf24', border: '#f59e0b' }, // Marigold Gold
    { fill: '#fca5a5', border: '#f87171' }  // Coral Petal
  ];

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.5 - 0.75,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach((p) => {
      p.y += p.speedY;
      p.x += Math.sin(p.angle) * p.speedX;
      p.angle += p.angularSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Draw Petal Shape
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color.fill;
      ctx.globalAlpha = 0.65;
      ctx.fill();
      ctx.strokeStyle = p.color.border;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// =========================================================================
// 5. SCRAPBOOK POLAROID LIGHTBOX
// =========================================================================
function openLightbox(index) {
  AppState.lightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  const item = AppState.memories[index];
  img.src = item.src;
  caption.textContent = item.caption;
  counter.textContent = `${index + 1} / ${AppState.memories.length}`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  playSynthesizedChime(660, 'sine', 0.5);
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function nextLightbox() {
  AppState.lightboxIndex = (AppState.lightboxIndex + 1) % AppState.memories.length;
  openLightbox(AppState.lightboxIndex);
}

function prevLightbox() {
  AppState.lightboxIndex = (AppState.lightboxIndex - 1 + AppState.memories.length) % AppState.memories.length;
  openLightbox(AppState.lightboxIndex);
}

function triggerLightboxHeart() {
  playSynthesizedChime(880, 'triangle', 0.8);
  if (window.confetti) {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f472b6', '#e11d48']
    });
  }
  showToast('Liked this precious memory! 💖');
}

// Allow user to upload custom photos into the polaroid gallery
function handleCustomPhotoUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const galleryGrid = document.getElementById('polaroid-gallery-grid');
  let addedCount = 0;

  Array.from(files).forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newSrc = e.target.result;
      const newCaption = `“Cherished memory with ${AppState.friendName} 💖”`;

      AppState.memories.push({ src: newSrc, caption: newCaption });
      const newIdx = AppState.memories.length - 1;

      const newCard = document.createElement('div');
      newCard.className = `polaroid-frame transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'} cursor-pointer`;
      newCard.onclick = () => openLightbox(newIdx);
      newCard.innerHTML = `
        <div class="washi-tape washi-tape-pink"></div>
        <div class="aspect-square rounded overflow-hidden bg-slate-100">
          <img src="${newSrc}" alt="Custom Memory" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <p class="font-handwriting text-xl text-center text-slate-800 mt-4">${newCaption}</p>
      `;

      galleryGrid.prepend(newCard);
      addedCount++;
    };
    reader.readAsDataURL(file);
  });

  playSynthesizedChime(784, 'sine', 0.8);
  showToast(`Added ${files.length} custom photo(s) to our scrapbook! 📸✨`);
}

// =========================================================================
// 6. 3D ENVELOPE & LETTER ANIMATIONS
// =========================================================================
function toggleEnvelope() {
  const envelope = document.getElementById('rakhi-envelope');
  const isOpen = envelope.classList.toggle('open');

  if (isOpen) {
    playSynthesizedChime(587.33, 'triangle', 0.9);
    showToast('Raksha Bandhan Letter Unsealed 💌');
  } else {
    playSynthesizedChime(440, 'sine', 0.4);
  }
}

function copyLetterText() {
  const text = `Dear ${AppState.friendName},\n\nTum meri life ke un special people mein se ho jinke hone se sab kuch thoda easy aur bahut zyada beautiful lagta hai. Jab bhi mujhe support ki zarurat hoti hai, tum hamesha mere saath khadi rehti ho.\n\nHumara blood relation nahi hai, lekin tumne mujhe hamesha ek sister jaisi care, ek best friend jaisi understanding aur family jaisa comfort diya hai. Tumhare saath main bina kisi hesitation ke apni feelings share kar sakta hoon.\n\nIs Raksha Bandhan par main sirf itna kehna chahta hoon—thank you for understanding me, supporting me, and never leaving my side. Chahe life humein kahin bhi le jaaye, humari friendship aur yeh special sibling bond hamesha aisa hi rahega.\n\nYou are not just my best friend. You are my sister by heart and one of the most precious people in my life.\n\nHappy Raksha Bandhan! Hamesha khush rehna aur aise hi meri life ka important part bane rehna. 💖\n\nWith endless care,\n${AppState.yourName}`;

  navigator.clipboard.writeText(text).then(() => {
    playSynthesizedChime(880, 'sine', 0.6);
    showToast('Letter text copied to clipboard! 📋✨');
  }).catch(() => {
    showToast('Could not copy automatically, but you can select and copy the text.');
  });
}

// =========================================================================
// 7. SACRED PROMISES & STAMPS
// =========================================================================
function stampPromise(btn) {
  btn.innerHTML = `<span class="text-amber-500 font-bold flex items-center gap-1.5"><i data-lucide="award" class="w-4 h-4"></i> Sealed & Bound ♾️</span>`;
  btn.disabled = true;
  if (window.lucide) lucide.createIcons();

  playSynthesizedChime(659.25, 'sine', 0.8);
  if (window.confetti) {
    confetti({
      particleCount: 25,
      spread: 50,
      colors: ['#fbbf24', '#f59e0b', '#ec4899']
    });
  }
  showToast('Sacred Promise Sealed with Golden Thread! 🤝✨');
}

// =========================================================================
// 8. UNREVEALED HEART CARDS FLIP
// =========================================================================
function toggleHeartCard(container) {
  container.classList.toggle('flipped');
  playSynthesizedChime(523.25, 'triangle', 0.5);
}

// =========================================================================
// 9. GRAND SURPRISE CELEBRATION
// =========================================================================
function triggerGrandSurprise() {
  playSynthesizedChime(523.25, 'sine', 0.3);
  setTimeout(() => playSynthesizedChime(659.25, 'sine', 0.4), 150);
  setTimeout(() => playSynthesizedChime(783.99, 'sine', 0.5), 300);
  setTimeout(() => playSynthesizedChime(1046.50, 'sine', 0.9), 450);

  // Multi-directional confetti burst
  if (window.confetti) {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#e11d48', '#9333ea', '#38bdf8']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 }
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 }
      });
    }, 300);
  }

  // Open Celebration Modal
  const modal = document.getElementById('surprise-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeSurpriseModal() {
  const modal = document.getElementById('surprise-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function downloadCelebrationCard() {
  playSynthesizedChime(880, 'sine', 0.6);
  showToast('Sisterhood Certificate Accepted for Life! ♾️💖');
  closeSurpriseModal();
}

// =========================================================================
// 10. SISTERHOOD VOUCHER CLAIMING
// =========================================================================
function claimVoucher(btn, voucherName) {
  btn.innerHTML = '✅ Claimed Successfully!';
  btn.classList.remove('bg-pink-100', 'bg-amber-100', 'bg-purple-100', 'bg-rose-100');
  btn.classList.add('bg-emerald-100', 'text-emerald-800', 'font-bold');
  btn.disabled = true;

  playSynthesizedChime(784, 'triangle', 0.6);
  if (window.confetti) {
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#34d399', '#fbbf24', '#f472b6']
    });
  }
  showToast(`Voucher Claimed: "${voucherName}" 🎁`);
}

// =========================================================================
// 11. NIGHT SKY GENERATOR & FLOATING LANTERNS
// =========================================================================
function initNightSky() {
  const starsContainer = document.getElementById('stars-container');
  const lanternsContainer = document.getElementById('lanterns-container');

  if (starsContainer) {
    const starCount = 60;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.animationDelay = `${Math.random() * 4}s`;
      starsContainer.appendChild(star);
    }
  }

  if (lanternsContainer) {
    const lanternCount = 8;
    for (let i = 0; i < lanternCount; i++) {
      const lantern = document.createElement('div');
      lantern.className = 'lantern';
      lantern.style.left = `${Math.random() * 85 + 5}%`;
      lantern.style.setProperty('--speed', `${Math.random() * 8 + 12}s`);
      lantern.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
      lantern.style.animationDelay = `${Math.random() * 10}s`;
      lanternsContainer.appendChild(lantern);
    }
  }
}

// =========================================================================
// 12. VIRTUAL HUG INTERACTION
// =========================================================================
function sendVirtualHug() {
  playSynthesizedChime(587.33, 'sine', 0.4);
  setTimeout(() => playSynthesizedChime(880, 'sine', 0.9), 200);

  // Spawn floating rising hearts
  const colors = ['#f472b6', '#e11d48', '#fbbf24', '#c084fc', '#ffffff'];
  for (let i = 0; i < 35; i++) {
    const heart = document.createElement('div');
    heart.textContent = ['💖', '🫶', '🤗', '🌸', '✨'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = `${Math.random() * 80 + 10}vw`;
    heart.style.bottom = '10vh';
    heart.style.fontSize = `${Math.random() * 24 + 18}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '99999';
    heart.style.transition = 'all 2.4s cubic-bezier(0.2, 0.8, 0.3, 1)';
    heart.style.opacity = '1';

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translate(${(Math.random() - 0.5) * 200}px, -80vh) scale(1.4)`;
      heart.style.opacity = '0';
    }, 50);

    setTimeout(() => heart.remove(), 2500);
  }

  showToast(`A big virtual hug has been delivered successfully to ${AppState.friendName}! 💌🤗`);
}

// =========================================================================
// 13. CARD MICRO INTERACTIONS & CURSOR SPARKLES
// =========================================================================
function triggerCardHeart(btn) {
  const countEl = btn.querySelector('.heart-count');
  if (countEl) {
    let current = parseInt(countEl.textContent, 10) || 100;
    countEl.textContent = current + 1;
  }
  playSynthesizedChime(700, 'triangle', 0.4);
  btn.classList.add('scale-125');
  setTimeout(() => btn.classList.remove('scale-125'), 200);
}

function initCursorTrail() {
  if (window.matchMedia('(hover: hover)').matches) {
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return; // throttle
      lastTime = now;

      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.background = ['#f472b6', '#fbbf24', '#ec4899', '#c084fc'][Math.floor(Math.random() * 4)];
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 700);
    });
  }
}

// =========================================================================
// 14. PERSONALIZATION DRAWER & LOCALSTORAGE
// =========================================================================
function openPersonalizer() {
  const drawer = document.getElementById('personalizer-drawer');
  document.getElementById('input-friend-name').value = AppState.friendName;
  document.getElementById('input-your-name').value = AppState.yourName;
  drawer.classList.remove('translate-x-full');
}

function closePersonalizer() {
  const drawer = document.getElementById('personalizer-drawer');
  drawer.classList.add('translate-x-full');
}

function savePersonalization() {
  const fName = document.getElementById('input-friend-name').value.trim();
  const yName = document.getElementById('input-your-name').value.trim();

  if (fName) AppState.friendName = fName;
  if (yName) AppState.yourName = yName;

  localStorage.setItem('rakhi_friend_name', AppState.friendName);
  localStorage.setItem('rakhi_your_name', AppState.yourName);

  updateDOMNames();
  closePersonalizer();
  playSynthesizedChime(880, 'sine', 0.6);
  showToast(`Personalized for ${AppState.friendName} & ${AppState.yourName}! ✨`);
}

function resetPersonalization() {
  AppState.friendName = 'Riya';
  AppState.yourName = 'Aman';
  localStorage.removeItem('rakhi_friend_name');
  localStorage.removeItem('rakhi_your_name');

  document.getElementById('input-friend-name').value = 'Riya';
  document.getElementById('input-your-name').value = 'Aman';

  updateDOMNames();
  closePersonalizer();
  showToast('Reset to default names.');
}

function updateDOMNames() {
  document.querySelectorAll('.friend-name-display').forEach(el => {
    el.textContent = AppState.friendName;
  });
  document.querySelectorAll('.your-name-display').forEach(el => {
    el.textContent = AppState.yourName;
  });
  document.title = `A Bond Beyond Words — Happy Raksha Bandhan, ${AppState.friendName} 💖`;
}

// =========================================================================
// 15. TOAST NOTIFICATIONS
// =========================================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'glass-card-gold px-4 py-3 rounded-2xl shadow-xl text-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-2 border border-amber-300 pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300';
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
