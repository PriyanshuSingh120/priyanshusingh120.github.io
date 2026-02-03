const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
// Optimization: Use w780 instead of w1280 for mobile speed; looks same, loads 2x faster.
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let nextSlideCache = null;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * INITIALIZE: Sorting & UI Setup
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort logic: 2025/2026 at the top
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
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
    loadTop10(movieElements);
    renderWatchlist();
    
    // Start the caching engine immediately
    prepareNextSlide().then(() => updateSlider());
}

/**
 * DATA REFRESH: Captures current grid state
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
 * SLIDER ENGINE: Instant transitions using pre-fetched data
 */
async function updateSlider() {
    if (movieData.length === 0) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const sliderBg = document.getElementById('sliderBg');
    const playBtn = document.getElementById('playBtn');

    // Use cached slide if ready, otherwise fetch one fast
    let currentSlide = nextSlideCache || await fetchSlideData();

    if (currentSlide) {
        // Apply data
        if(sliderBg) sliderBg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${currentSlide.backdrop}')`;
        if(sliderTitle) {
            sliderTitle.innerText = currentSlide.title;
            sliderTitle.classList.remove('skeleton');
        }
        if(movieRating) {
            movieRating.innerHTML = `⭐ ${currentSlide.rating}`;
            movieRating.classList.remove('skeleton');
        }
        if(sliderImg) {
            sliderImg.src = currentSlide.poster;
            sliderImg.style.opacity = "1";
        }
        if(playBtn) playBtn.href = currentSlide.link;
    }

    // Immediately start preparing the NEXT slide for the next 9s interval
    prepareNextSlide();
}

/**
 * PRE-FETCHING: The "Secret Sauce" for Speed
 */
async function fetchSlideData() {
    if (movieData.length === 0) return null;
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 30))];

    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result && result.backdrop_path) {
            const backdropUrl = BACKDROP_BASE + result.backdrop_path;
            
            // Force browser to cache the image before we say we are "ready"
            await new Promise((resolve) => {
                const img = new Image();
                img.src = backdropUrl;
                img.onload = resolve;
                img.onerror = resolve;
            });

            return {
                title: movie.title,
                rating: result.vote_average.toFixed(1),
                backdrop: backdropUrl,
                poster: POSTER_BASE + result.poster_path,
                link: movie.link
            };
        }
    } catch (e) { return null; }
}

async function prepareNextSlide() {
    nextSlideCache = await fetchSlideData();
}

/**
 * ANDROID FIX: Navigation and Viewport
 */
function setupAndroidFix() {
    // Corrects 100vh height issues on mobile browsers
    const setVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();

    // Instant click response
    document.querySelectorAll('.nav-link, button, .filter-chip').forEach(el => {
        el.style.touchAction = 'manipulation';
    });
}

/**
 * EVENT LISTENERS & BOOTSTRAP
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    setupAndroidFix();

    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.addEventListener('input', handleSearch);

    // Update slider every 9 seconds
    setInterval(updateSlider, 9000);
});

// --- HELPER FUNCTIONS (Watchlist, Top10, Search) ---

function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    if (!container || container.querySelector('.watchlist-btn')) return;
    const movieId = card.getAttribute('href'); 
    
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
    if (watchlist.length === 0) { section.classList.add('hidden'); return; }
    section.classList.remove('hidden');
    grid.innerHTML = "";
    watchlist.forEach(id => {
        const original = document.querySelector(`.movie-link[href="${id}"]`);
        if (original) grid.appendChild(original.cloneNode(true));
    });
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        link.style.display = link.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
}

async function loadTop10(localElements) {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        const trending = data.results.slice(0, 10);
        top10Grid.innerHTML = "";
        trending.forEach(t => {
            const name = (t.title || t.name).toLowerCase();
            const match = localElements.find(el => el.querySelector('h3').innerText.toLowerCase().includes(name));
            if (match) top10Grid.appendChild(match.cloneNode(true));
        });
    } catch (e) { console.warn("Top 10 failed"); }
}
