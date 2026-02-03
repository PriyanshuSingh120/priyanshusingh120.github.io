const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * INITIALIZE: High-speed loading
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // 1. Sort logic
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        return isNewB - isNewA; 
    });

    // 2. Clear and Re-append with Lazy Loading
    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    // 3. Set Data & Load UI Components
    refreshMovieData();
    loadTop10(movieElements);
    renderWatchlist();
    
    // Initial slider load
    setTimeout(updateSlider, 500); 
}

/**
 * SLIDER: Faster loading with Background Pre-caching
 */
async function updateSlider() {
    if (movieData.length === 0) refreshMovieData();
    if (movieData.length === 0) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const sliderBg = document.getElementById('sliderBg');
    const playBtn = document.getElementById('playBtn');

    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 25))];

    let url = (movie.id && movie.id !== "undefined")
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result && result.backdrop_path) {
            const backdropUrl = BACKDROP_BASE + result.backdrop_path;
            const posterUrl = POSTER_BASE + result.poster_path;

            // Pre-cache the image before showing it
            const imgCache = new Image();
            imgCache.src = backdropUrl;
            imgCache.onload = () => {
                if(sliderBg) sliderBg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${backdropUrl}')`;
                if(sliderImg) {
                    sliderImg.src = posterUrl;
                    sliderImg.style.opacity = "1";
                }
                if(sliderTitle) {
                    sliderTitle.innerText = movie.title;
                    sliderTitle.classList.remove('skeleton');
                }
                if(movieRating) {
                    movieRating.innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
                    movieRating.classList.remove('skeleton');
                }
                if(playBtn) playBtn.href = movie.link;
            };
        }
    } catch (e) {
        console.warn("Slider skip: API error");
    }
}

/**
 * ANDROID NAVIGATION FIX
 */
function fixMobileNav() {
    // Android Chrome click delay fix
    const interactiveElements = document.querySelectorAll('.nav-link, button, .filter-chip');
    interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.style.touchAction = 'manipulation';
    });

    // Fix for the 100vh issue on Android browsers
    const setHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setHeight);
    setHeight();
}

/**
 * DATA MANAGEMENT
 */
function refreshMovieData() {
    const cards = document.querySelectorAll('#movieGrid .movie-link');
    movieData = Array.from(cards).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3') ? card.querySelector('h3').innerText : 'Unknown',
        id: card.dataset.id,
        searchTitle: card.querySelector('h3') ? card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim() : ''
    })).filter(m => m.title !== 'Unknown');
}

/**
 * SEARCH & TELEGRAM REQUEST
 */
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const requestBox = document.getElementById('requestBox');
    let found = 0;

    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const isMatch = link.textContent.toLowerCase().includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) found++;
    });

    if (requestBox) {
        found === 0 && term.length > 0 ? requestBox.classList.remove('hidden') : requestBox.classList.add('hidden');
    }
}

async function sendRequest() {
    const input = document.querySelector('.search-input');
    const name = input ? input.value : "";
    const btn = document.getElementById('reqBtn');
    if (!name) return;

    btn.innerText = "Sending...";
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n<b>🎬 Movie:</b> ${name}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: DISCUSSION_GROUP_ID, text: message, parse_mode: 'HTML' })
        });
        document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Request Sent!</h3>`;
    } catch (e) {
        btn.innerText = "Error. Try again.";
    }
}

// Keep your existing Watchlist and Top10 functions as they were (they work fine)
// ... (addWatchlistButton, renderWatchlist, loadTop10, filterByCategory) ...

/**
 * START APP
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    fixMobileNav();

    document.querySelectorAll('.search-input').forEach(i => {
        i.addEventListener('input', handleSearch);
    });

    setInterval(updateSlider, 10000); 
});
