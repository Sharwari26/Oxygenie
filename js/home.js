const flowerImages = [
  'flowers/adenium.webp',
  'flowers/Anthurium.webp',
  'flowers/Anthurium1.webp',
  'flowers/AV.webp',
  'flowers/banana1.webp',
  'flowers/basil.webp',
  'flowers/begonia.webp',
  'flowers/Tulsi.webp',
  'flowers/Sunfl.webp',
  'flowers/Straw.webp',
  'flowers/Snap.webp',
  'flowers/Petunia.webp',
  'flowers/periw.webp',
  'flowers/morningg.webp',
  'flowers/dahlia.webp',
  'flowers/CurryLeaves - Copy.webp',
  'flowers/bou.webp',
  'flowers/basil.webp',
  'flowers/flowering.webp',
  'flowers/dahlia.webp',
  'flowers/Orchids.webp',
  'flowers/peri.webp',
  'flowers/Neem.webp',
];

function preloadCriticalImages() {
  const criticalImages = flowerImages.slice(0, 4);
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function createFlowerGrid() {
  const flowerRows = document.getElementById('flowerRows');
  const rowsCount = 5;
  const itemsPerRow = 10;

  for (let r = 0; r < rowsCount; r++) {
    const row = document.createElement('div');
    row.className = 'flower-row';
    row.style.animationDuration = `${80 + (r * 10)}s`;

    for (let i = 0; i < itemsPerRow * 3; i++) {
      const item = document.createElement('div');
      item.className = 'flower-item';

      const img = document.createElement('img');
      const imgIndex = i % flowerImages.length;

      img.loading = 'lazy';
      img.alt = `Flower ${imgIndex + 1}`;
      img.dataset.src = flowerImages[imgIndex];

      const hue = 120 + Math.floor(Math.random() * 30);
      item.style.background = `hsl(${hue}, 50%, 20%)`;

      img.onload = function() {
        this.classList.add('loaded');
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img && !img.src) {
              img.src = img.dataset.src;
            }
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px' });

      item.appendChild(img);
      row.appendChild(item);
      observer.observe(item);
    }

    flowerRows.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  preloadCriticalImages();
  createFlowerGrid();

  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');

  const plantPages = {
    'tomato': 'outdoor.html',
    'mango': 'outdoor.html',
    'sunflower': 'outdoor.html',
    'tulsi': 'indoor.html',
    'coriander': 'indoor.html',
    'marigold': 'indoor.html',
    'hibiscus': 'flowering.html',
    'cherryblossom': 'flowering.html',
    'geranium': 'flowering.html',
  };

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (plantPages[query]) {
      // if plant name exists
      window.location.href = `${plantPages[query]}?plant=${query}`;
    } else if (query === 'indoor') {
      window.location.href = 'indoor.html';
    } else if (query === 'outdoor') {
      window.location.href = 'outdoor.html';
    } else if (query === 'flowering') {
      window.location.href = 'flowering.html';
    } else if (query === 'ayurveda') {
      window.location.href = 'ayurveda.html';
    } else {
      alert('No results found. Try a plant name like "neem", or category like "indoor".');
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    document.querySelectorAll('.flower-row').forEach((row, i) => {
      const offset = (i % 2 === 0) ? 10 : -10;
      row.style.transform = `translateX(calc(-55.555% + ${x * offset}px))`;
    });
  });
});

