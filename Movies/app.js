document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle Functionality (Unchanged) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Enhanced Live/Button Search Functionality (Modified & Fixed) ---

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button'); 
    const movieGrid = document.querySelector('.movie-grid'); 
    
    // Store the original movie cards as an array for comparison and resetting
    // Select the immediate parent anchor tag, as this is the actual list item we want to move/hide
    const initialMovieLinks = Array.from(document.querySelectorAll('.movie-grid > .movie-link'));

    if (searchInput && initialMovieLinks.length > 0 && movieGrid) {
        
        /**
         * Core search and filtering function.
         * Hides non-matching elements and reorders the DOM to bring matches to the top.
         * @param {string} searchTerm - The text to search for.
         */
        const executeSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const fragment = document.createDocumentFragment();
            const matchedLinks = [];

            // 1. Iterate over the original list of links
            initialMovieLinks.forEach(link => {
                const card = link.querySelector('.movie-card');
                if (!card) return;

                const titleElement = card.querySelector('.movie-info h3');
                if (titleElement) {
                    const movieTitle = titleElement.textContent.toLowerCase();

                    if (searchTerm === '' || movieTitle.includes(searchTerm)) {
                        // MATCH FOUND (or search is empty)
                        link.style.display = ''; // Show the link (resetting any previous 'none')
                        matchedLinks.push(link);
                    } else {
                        // NO MATCH FOUND
                        link.style.display = 'none'; // Hide the link
                    }
                }
            });

            // 2. Clear and Re-append/Re-order:
            // Since we use a CSS-based hiding mechanism (display: none),
            // we only need to re-append the matched links to move them to the top.

            // Append all matched links first (they will be visible)
            matchedLinks.forEach(link => {
                fragment.appendChild(link);
            });
            
            // Append the remaining original links (which are currently hidden) to the end.
            // This preserves the full list in the DOM while keeping them hidden.
            // This is the clean way to "remove" the other movies and prepare for a clean reset.
            initialMovieLinks.forEach(link => {
                if (!matchedLinks.includes(link)) {
                    fragment.appendChild(link);
                }
            });

            // 3. Update the DOM with the new order in one operation
            // This replaces all children of the movieGrid efficiently
            movieGrid.innerHTML = '';
            movieGrid.appendChild(fragment);
        };

        // A. Live Input Listener (for real-time filtering)
        searchInput.addEventListener('input', executeSearch);

        // B. Search Button Listener (ensures search runs on click)
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault(); // Good practice to prevent any default button action
                executeSearch();
            });
        }
        
        // C. Allow 'Enter' key to trigger search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                executeSearch();
            }
        });
    }
});
