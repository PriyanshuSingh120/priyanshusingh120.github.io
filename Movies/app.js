// 1. Global Scope Variables
const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
let movieData = []; 

/**
 * FUNCTION: refreshMovieData
 * Scans the DOM for all current movie cards and updates the movieData array.
 * This ensures new movies added via "Load More" or dynamic scripts are included.
 */
function refreshMovieData() {
    const movieCards = document.querySelectorAll('.movie-link');
    movieData = Array.from(movieCards).map(card => {
        // Also ensure TMDB ID is appended to links if missing
        const tmdbId = card.getAttribute('data-id');
        const currentHref = card.getAttribute('href');
        if (tmdbId && currentHref && !currentHref.includes('&tmdb=')) {
            card.setAttribute('href', `${currentHref}&tmdb=${tmdbId}`);
        }

        return {
            link: card.getAttribute('href'),
            title: card.querySelector('h3').innerText.trim(),
            imdbId: tmdbId, 
            searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Initial setup ---
    refreshMovieData();

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- START THE SLIDER ---
    if (movieData.length > 0) {
        updateSlider(); // Initial run
        setInterval(updateSlider, 6000); // Cycle every 6 seconds
    }

    // --- Search Logic ---
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase();
            document.querySelectorAll('.movie-link').forEach(link => {
                const isMatch = link.textContent.toLowerCase().includes(term);
                link.style.display = isMatch ? '' : 'none';
            });
        });
    }
});

/**
 * FUNCTION: updateSlider
 * Fetches data from TMDB and updates the UI with a random movie.
 */
async function updateSlider() {
    // Refresh the list every time the slider changes to pick up new movies
    refreshMovieData();

    if (movieData.length === 0) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderBg = document.getElementById('sliderBg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const playBtn = document.getElementById('playBtn');

    // Start Fade Out
    if (sliderImg) sliderImg.style.opacity = "0";

    const movie = movieData[Math.floor(Math.random() * movieData.length)];

    let url = movie.imdbId 
        ? `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let result = movie.imdbId ? data.movie_results[0] : data.results[0];

        if (result) {
            const backdropLink = result.backdrop_path ? BACKDROP_BASE + result.backdrop_path : "";
            const posterLink = result.poster_path ? POSTER_BASE + result.poster_path : "";

            // Wait for fade out to complete (matching CSS transition)
            setTimeout(() => {
                if (backdropLink && sliderBg) {
                    sliderBg.style.backgroundImage = `url('${backdropLink}')`;
                }
                
                if (sliderTitle) sliderTitle.innerText = movie.title;
                if (movieRating) movieRating.innerHTML = `⭐ Rating: ${result.vote_average.toFixed(1)}`;
                if (playBtn) playBtn.href = movie.link;

                // Preload image before fading in for a smoother look
                if (posterLink && sliderImg) {
                    const imgPreloader = new Image();
                    imgPreloader.src = posterLink;
                    imgPreloader.onload = () => {
                        sliderImg.src = posterLink;
                        sliderImg.style.opacity = "1";
                    };
                }
            }, 400); 
        }
    } catch (err) {
        console.error("Slider Update Error:", err);
        if (sliderImg) sliderImg.style.opacity = "1"; 
    }
}
