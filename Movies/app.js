// --- 1. Mobile Menu Toggle Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Function to toggle the navigation menu visibility on small screens
        menuToggle.addEventListener('click', () => {
            // This relies on you adding a style block to your CSS for the 'active' state
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Live Search Functionality ---

    const searchInput = document.querySelector('.search-input');
    const movieCards = document.querySelectorAll('.movie-card');

    if (searchInput && movieCards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            movieCards.forEach(card => {
                // Get the movie title from the h3 element inside the card
                const titleElement = card.querySelector('.movie-info h3');
                if (titleElement) {
                    const movieTitle = titleElement.textContent.toLowerCase();

                    // Check if the movie title contains the search term
                    if (movieTitle.includes(searchTerm)) {
                        card.style.display = 'block'; // Show the card
                    } else {
                        card.style.display = 'none'; // Hide the card
                    }
                }
            });
        });
    }
});