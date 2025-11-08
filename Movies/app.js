document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle Functionality (Unchanged - Perfect) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Enhanced Live/Button Search Functionality (Refined) ---

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button'); 
    const movieGrid = document.querySelector('.movie-grid'); 
    
    // Store the original movie cards (anchor tags)
    const initialMovieLinks = Array.from(document.querySelectorAll('.movie-grid > .movie-link'));

    if (searchInput && initialMovieLinks.length > 0 && movieGrid) {
        
        /**
         * Core search and filtering function.
         * Hides non-matching elements and re-orders the DOM to bring matches to the top.
         */
        const executeSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const fragment = document.createDocumentFragment();
            
            // Temporary arrays to hold elements based on match status
            const matchedLinks = [];
            const nonMatchedLinks = [];

            // 1. Iterate and determine match status
            initialMovieLinks.forEach(link => {
                const titleElement = link.querySelector('.movie-info h3');
                // Use the link's text content for a broader search (title + genres + year)
                const cardContent = link.textContent.toLowerCase(); 

                // Note: The logic below searches the entire card content, 
                // which is better than just the title.
                if (searchTerm === '' || cardContent.includes(searchTerm)) {
                    // MATCH FOUND (or search is empty)
                    link.style.display = ''; // Show
                    matchedLinks.push(link);
                } else {
                    // NO MATCH FOUND
                    link.style.display = 'none'; // Hide
                    nonMatchedLinks.push(link);
                }
            });

            // 2. Re-append in the desired order (Matched first, then Hidden non-matched)
            // Use the DOM's native ability to move existing nodes with appendChild
            
            // Append all matched links (moves them to the top of the fragment)
            matchedLinks.forEach(link => {
                fragment.appendChild(link);
            });
            
            // Append all non-matched links (moves them to the bottom of the fragment, hidden)
            nonMatchedLinks.forEach(link => {
                fragment.appendChild(link);
            });

            // 3. Update the DOM with the new, sorted fragment in one operation
            // This is the cleanest and most efficient re-ordering/update.
            movieGrid.appendChild(fragment);

            // Optional: Add a check for "No Results Found"
            if (matchedLinks.length === 0 && searchTerm !== '') {
                // You would typically insert a "No results found" message here
                console.log("No movies found for: " + searchTerm);
                // Example: movieGrid.innerHTML = '<p class="no-results">No movies found...</p>'; 
                // However, inserting this would remove all movie links, requiring a full re-append later.
                // Keeping the code as is (using display: none) is simpler if you don't need a custom message.
            }
        };

        // A. Live Input Listener (for real-time filtering)
        // Using 'input' is correct for immediate response
        searchInput.addEventListener('input', executeSearch);

        // B. Search Button Listener (runs search on click)
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault(); 
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
