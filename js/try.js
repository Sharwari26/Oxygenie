// ================ MODAL/PREVIEW FUNCTIONALITY ================
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const previewContainer = document.querySelector('.card-preview');
    const previewBoxes = document.querySelectorAll('.preview');
    const cards = document.querySelectorAll('.cards_article');
    const closeButtons = document.querySelectorAll('.preview .fa-times');
  
    // Show preview modal when card is clicked
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        
        // Show container
        previewContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        
        // Show matching preview box
        previewBoxes.forEach(preview => {
          preview.classList.remove('active');
          const target = preview.getAttribute('data-target');
          if (name === target) {
            preview.classList.add('active');
          }
        });
      });
    });
  
    // Close modal functionality
    closeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        this.closest('.preview').classList.remove('active');
        previewContainer.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
      });
    });
  
    // Close modal when clicking outside content
    previewContainer.addEventListener('click', function(e) {
      if (e.target === previewContainer) {
        previewBoxes.forEach(preview => preview.classList.remove('active'));
        this.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        previewBoxes.forEach(preview => preview.classList.remove('active'));
        previewContainer.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  
    // ================ SEARCH FUNCTIONALITY ================
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar a');
    const searchableItems = document.querySelectorAll('.cards_article');
  
    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      let hasResults = false;
  
      searchableItems.forEach(item => {
        const textElement = item.querySelector('.cards_des');
        if (!textElement) return; // Skip if no description element found
  
        const text = textElement.textContent.toLowerCase();
        const isMatch = text.includes(query);
        
        item.style.display = isMatch ? 'block' : 'none';
        if (isMatch) hasResults = true;
      });
  
      // Show message if no results found
      const noResultsMsg = document.getElementById('no-results-message');
      if (query && !hasResults) {
        if (!noResultsMsg) {
          const msg = document.createElement('p');
          msg.id = 'no-results-message';
          msg.textContent = 'No plants found matching your search.';
          msg.style.textAlign = 'center';
          msg.style.margin = '2rem 0';
          msg.style.color = '#666';
          document.querySelector('.cards_container').appendChild(msg);
        }
      } else if (noResultsMsg) {
        noResultsMsg.remove();
      }
    }
  
    // Event listeners for search
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch();
    });
  
    // Clear search when clicking the 'x' in search input (for browsers that support this)
    searchInput.addEventListener('search', function() {
      if (this.value === '') {
        performSearch();
      }
    });
  
    // ================ ENHANCED CARD INTERACTIONS ================
    cards.forEach(card => {
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
  
      // Add hover delay for better UX
      let hoverTimer;
      card.addEventListener('mouseenter', function() {
        hoverTimer = setTimeout(() => {
          this.classList.add('hover-active');
        }, 200);
      });
  
      card.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimer);
        this.classList.remove('hover-active');
      });
    });
  });