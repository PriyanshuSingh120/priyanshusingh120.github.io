const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * INITIALIZE: Sorting & Setup
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Simple sort: 2025/2026 movies at top
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

    // CRITICAL: Refresh data so slider and search work
    refreshMovieData();
    loadTop10(movieElements);
    renderWatchlist();
}

/**
 * SLIDER: Faster loading logic
 */
async function updateSlider() {
    // If empty, try to refresh once
    if (movieData.length === 0) refreshMovieData();
    if (movieData.length === 0) return;

    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    
    const sliderImg = document.getElementById('sliderImg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const sliderBg = document.getElementById('sliderBg');

    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            // Speed Fix: Pre-load backdrop before showing text
            const img = new Image();
            img.src = BACKDROP_BASE + result.backdrop_path;
            img.onload = () => {
                if(sliderBg) sliderBg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${img.src}')`;
                if(sliderTitle) sliderTitle.innerText = movie.title;
                if(movieRating) movieRating.innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
                if(document.getElementById('playBtn')) document.getElementById('playBtn').href = movie.link;
                if(sliderImg) {
                    sliderImg.src = POSTER_BASE + result.poster_path;
                    sliderImg.style.opacity = "1";
                }
                
                // Remove Skeleton classes if they exist
                if(sliderTitle) sliderTitle.classList.remove('skeleton');
                if(movieRating) movieRating.classList.remove('skeleton');
            };
        }
    } catch (e) { console.error("Slider fetch failed"); }
}

/**
 * DATA: Essential for Slider and Search
 */
function refreshMovieData() {
    const links = document.querySelectorAll('#movieGrid .movie-link');
    movieData = Array.from(links).map(card => {
        const titleEl = card.querySelector('h3');
        return {
            link: card.getAttribute('href'),
            title: titleEl ? titleEl.innerText : 'Untitled',
            id: card.dataset.id,
            searchTitle: titleEl ? titleEl.innerText.replace(/\[.*?\]/g, '').trim() : ''
        };
    });
}

/**
 * ANDROID NAV FIX: Fixes touch delay and positioning
 */
function setupAndroidFix() {
    // Fixes the 100vh issue on mobile Chrome
    const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();

    // Ensure clicks register instantly on Android
    document.querySelectorAll('.nav-link, button, .filter-chip').forEach(el => {
        el.style.touchAction = 'manipulation';
    });
}

// --- KEEP YOUR EXISTING FUNCTIONS BELOW ---
// (Copy-paste your addWatchlistButton, renderWatchlist, loadTop10, filterByCategory, handleSearch, sendRequest here)

function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    if (!container || container.querySelector('.watchlist-btn')) return;

    const href = card.getAttribute('href');
    const movieId = href.includes('id=') ? href.split('id=')[1].split('&')[0] : card.querySelector('h3').innerText;
    
    const btn = document.createElement('button');
    btn.className = 'watchlist-btn';
    btn.innerHTML = watchlist.includes(movieId) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    btn.onclick = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (watchlist.includes(movieId)) {
            watchlist = watchlist.filter(id => id !== movieId);
            btn.innerHTML = '<i class="far fa-heart"></i>';
        } else {
            watchlist.push(movieId);
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    };
    container.appendChild(btn);
}

function renderWatchlist() {
    const grid = document.getElementById('myListGrid');
    const section = document.getElementById('myListSection');
    if (!grid || !section) return;

    if (watchlist.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    grid.innerHTML = "";
    watchlist.forEach(id => {
        const original = document.querySelector(`.movie-link[href*="id=${id}"]`);
        if (original) {
            const clone = original.cloneNode(true);
            grid.appendChild(clone);
        }
    });
}

async function loadTop10(localElements) {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        const trending = data.results;
        let matched = [];
        trending.forEach(t => {
            const name = (t.title || t.name).toLowerCase();
            const match = localElements.find(el => {
                const title = el.querySelector('h3').innerText.toLowerCase();
                return title.includes(name);
            });
            if (match && !matched.includes(match)) matched.push(match);
        });
        top10Grid.innerHTML = "";
        matched.slice(0, 10).forEach((el, index) => {
            const clone = el.cloneNode(true);
            clone.className = 'top10-card';
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 error"); }
}

/**
 * INITIALIZE EVENT LISTENERS
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    setupAndroidFix();

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    setInterval(updateSlider, 9000);
    // Trigger slider once at start
    setTimeout(updateSlider, 1000);
});
