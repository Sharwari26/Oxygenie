// floral-background.js
document.addEventListener('DOMContentLoaded', function() {
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
  
    function createFloatingLeaves() {
      const leavesContainer = document.getElementById('floatingLeaves');
      const leafCount = 15;
      
      for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        const size = Math.random() * 40 + 20;
        const startX = Math.random() * 100;
        const endX = (Math.random() * 2) - 1;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 20;
        const rotation = Math.random() * 360;
        
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${startX}%`;
        leaf.style.setProperty('--end-x', endX);
        leaf.style.animationDelay = `${delay}s`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.transform = `rotate(${rotation}deg)`;
        
        leavesContainer.appendChild(leaf);
      }
    }
  
    // Initialize
    createFlowerGrid();
    createFloatingLeaves();
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      document.querySelectorAll('.flower-row').forEach((row, i) => {
        const offset = (i % 2 === 0) ? 10 : -10;
        row.style.transform = `translateX(calc(-55.555% + ${x * offset}px))`;
      });
    });
  });