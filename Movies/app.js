const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * INITIALIZE: Optimized for Mobile & Speed
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort Newest (2025/2026) First
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        if (isNewB && !isNewA) return 1;
        if (isNewA && !isNewB) return -1;
        return 0;
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    refreshMovieData(); // Populate movieData array once
    loadTop10(movieElements);
    renderWatchlist();
    updateSlider(); // Initial run
}

/**
 * SLIDER: Fast-loading with Image Pre-caching
 */
async function updateSlider() {
    if (movieData.length === 0) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const sliderBg = document.getElementById('sliderBg');

    // Pick a random movie from the top 20
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    
    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result && result.backdrop_path) {
            // Pre-load images in background before showing
            const tempImg = new Image();
            const backdropUrl = BACKDROP_BASE + result.backdrop_path;
            tempImg.src = backdropUrl;

            tempImg.onload = () => {
                // Only update DOM once image is ready to prevent flickering
                sliderBg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${backdropUrl}')`;
                sliderImg.src = POSTER_BASE + result.poster_path;
                sliderTitle.innerText = movie.title;
                movieRating.innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
                document.getElementById('playBtn').href = movie.link;
                
                // CSS transitions will handle the smoothness
                sliderTitle.classList.remove('skeleton');
                movieRating.classList.remove('skeleton');
                sliderImg.style.opacity = "1";
            };
        }
    } catch (e) {
        console.error("Slider Update Error");
    }
}

/**
 * ANDROID NAV & TOUCH FIXES
 */
function setupMobileNav() {
    // Force immediate response on mobile clicks
    const navLinks = document.querySelectorAll('.nav-link, .filter-chip, .watchlist-btn');
    navLinks.forEach(link => {
        link.style.touchAction = 'manipulation';
    });

    // Fix for Android viewport height issues (URL bar hiding/showing)
    const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();
}

/**
 * UTILS: (Modified refresh to be cleaner)
 */
function refreshMovieData() {
    const cards = document.querySelectorAll('#movieGrid .movie-link');
    movieData = Array.from(cards).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3').innerText,
        id: card.dataset.id,
        searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
    }));
}

// ... (Keep your loadTop10, addWatchlistButton, renderWatchlist, and filterByCategory functions as they were)

/**
 * DOM CONTENT LOADED
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    setupMobileNav();
    
    document.querySelectorAll('.search-input').forEach(i => {
        i.addEventListener('input', handleSearch);
    });

    // Change slide every 9 seconds
    setInterval(updateSlider, 9000);
});
