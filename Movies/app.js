const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780"; // Optimized for mobile speed
const POSTER_BASE = "https://image.tmdb.org/t/p/w342";   // Faster poster loading
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let nextSlideCache = null;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * 1. INITIALIZE: Speed-focused setup
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Quick Sort: 2025/2026 First
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026/i.test(a.innerText);
        const isNewB = /2025|2026/i.test(b.innerText);
        return isNewB - isNewA;
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    refreshMovieData();
    loadTop10(movieElements); // Improved matching logic
    renderWatchlist();
    
    // Bootstrap Slider caching
    prepareNextSlide().then(() => updateSlider());
}

/**
 * 2. TOP 10: Robust matching to prevent "Worst List" issues
 */
async function loadTop10(localElements) {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;

    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        const trending = data.results;

        let matched = [];
        trending.forEach(t => {
            const tName = (t.title || t.name || "").toLowerCase();
            // Match by ID attribute or flexible title check
            const match = localElements.find(el => {
                const localTitle = el.querySelector('h3').innerText.toLowerCase();
                return el.dataset.id == t.id || localTitle.includes(tName) || tName.includes(localTitle);
            });
            if (match && !matched.includes(match)) matched.push(match);
        });

        // Fallback: If TMDB match is low, use newest local movies to keep list full
        if (matched.length < 5) {
            localElements.slice(0, 10).forEach(el => {
                if (!matched.includes(el)) matched.push(el);
            });
        }

        top10Grid.innerHTML = "";
        matched.slice(0, 10).forEach((el, index) => {
            const clone = el.cloneNode(true);
            clone.className = 'top10-card';
            // Add a rank number indicator
            const rank = document.createElement('span');
            rank.className = 'rank-badge';
            rank.innerText = index + 1;
            clone.appendChild(rank);
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 Loading Failed"); }
}

/**
 * 3. SLIDER ENGINE: Pre-cache strategy
 */
async function updateSlider() {
    if (movieData.length === 0) return;

    const elements = {
        img: document.getElementById('sliderImg'),
        title: document.getElementById('sliderTitle'),
        rating: document.getElementById('movieRating'),
        bg: document.getElementById('sliderBg'),
        btn: document.getElementById('playBtn')
    };

    let currentSlide = nextSlideCache || await fetchSlideData();

    if (currentSlide) {
        if (elements.bg) elements.bg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${currentSlide.backdrop}')`;
        if (elements.title) elements.title.innerText = currentSlide.title;
        if (elements.rating) elements.rating.innerHTML = `⭐ ${currentSlide.rating}`;
        if (elements.img) elements.img.src = currentSlide.poster;
        if (elements.btn) elements.btn.href = currentSlide.link;
        
        // Visual Cleanup
        elements.title?.classList.remove('skeleton');
        elements.rating?.classList.remove('skeleton');
    }
    prepareNextSlide(); // Start downloading next image immediately
}

async function fetchSlideData() {
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 25))];
    if (!movie) return null;

    const url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            // Force browser to pre-download the backdrop
            const preImg = new Image();
            preImg.src = BACKDROP_BASE + result.backdrop_path;
            
            return new Promise((resolve) => {
                preImg.onload = () => resolve({
                    title: movie.title,
                    rating: result.vote_average.toFixed(1),
                    backdrop: preImg.src,
                    poster: POSTER_BASE + result.poster_path,
                    link: movie.link
                });
                preImg.onerror = () => resolve(null);
            });
        }
    } catch (e) { return null; }
}

async function prepareNextSlide() {
    nextSlideCache = await fetchSlideData();
}

/**
 * 4. ANDROID NAVIGATION FIX
 */
function setupAndroidFix() {
    // Fix mobile viewport jumps
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Fix click response
    document.querySelectorAll('.nav-link, button').forEach(el => {
        el.style.touchAction = 'manipulation';
    });
}

function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3')?.innerText || 'Untitled',
        id: card.dataset.id,
        searchTitle: card.querySelector('h3')?.innerText.replace(/\[.*?\]/g, '').trim() || ''
    }));
}

// Search & Watchlist logic remains same as your previous working version
// ... (handleSearch, addWatchlistButton, renderWatchlist) ...

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    setupAndroidFix();
    setInterval(updateSlider, 10000); 
});
