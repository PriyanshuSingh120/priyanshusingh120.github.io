const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w342"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let nextSlideCache = null;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * 1. INITIALIZE: The core setup
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    // Capture the cards once
    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort: 2025/2026 First
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        return isNewB - isNewA;
    });

    // Re-render main grid safely
    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        movieGrid.appendChild(el); // Put original back in grid
        addWatchlistButton(el); 
    });

    refreshMovieData();
    loadTop10(movieElements); 
    renderWatchlist();
    
    // Start slider caching
    prepareNextSlide().then(() => updateSlider());
}

/**
 * 2. TOP 10: Fixed to prevent "stealing" cards from main grid
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
            const match = localElements.find(el => {
                const localTitle = el.querySelector('h3').innerText.toLowerCase();
                return el.dataset.id == t.id || localTitle.includes(tName);
            });
            if (match && !matched.includes(match)) matched.push(match);
        });

        // Fallback: Use newest if trending matching fails
        if (matched.length < 5) {
            matched = [...matched, ...localElements.slice(0, 10)].slice(0, 10);
        }

        top10Grid.innerHTML = "";
        matched.slice(0, 10).forEach((el, index) => {
            const clone = el.cloneNode(true); // CRITICAL: Use clone so original stays in main grid
            clone.className = 'top10-card';
            
            const rankNum = document.createElement('div');
            rankNum.className = 'rank-num';
            rankNum.innerText = index + 1;
            clone.appendChild(rankNum);
            
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 load error"); }
}

/**
 * 3. SLIDER: Turbo pre-cache
 */
async function updateSlider() {
    if (movieData.length === 0) return;

    const elements = {
        bg: document.getElementById('sliderBg'),
        title: document.getElementById('sliderTitle'),
        rating: document.getElementById('movieRating'),
        img: document.getElementById('sliderImg'),
        btn: document.getElementById('playBtn')
    };

    let current = nextSlideCache || await fetchSlideData();

    if (current && elements.bg) {
        elements.bg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${current.backdrop}')`;
        elements.title.innerText = current.title;
        elements.rating.innerHTML = `⭐ ${current.rating}`;
        elements.img.src = current.poster;
        elements.btn.href = current.link;
        
        elements.title.classList.remove('skeleton');
        elements.rating.classList.remove('skeleton');
    }
    prepareNextSlide();
}

async function fetchSlideData() {
    if (movieData.length === 0) return null;
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 25))];

    try {
        const res = await fetch(movie.id ? 
            `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id` : 
            `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`);
        
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
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
            });
        }
    } catch (e) { return null; }
}

async function prepareNextSlide() { nextSlideCache = await fetchSlideData(); }

/**
 * 4. UTILS & ANDROID
 */
function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3')?.innerText || 'Untitled',
        id: card.dataset.id,
        searchTitle: card.querySelector('h3')?.innerText.replace(/\[.*?\]/g, '').trim() || ''
    }));
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        link.style.display = link.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
}

function setupAndroidFix() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    document.querySelectorAll('.nav-link, button').forEach(el => el.style.touchAction = 'manipulation');
}

// Watchlist Button
function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    if (!container || container.querySelector('.watchlist-btn')) return;
    
    const btn = document.createElement('button');
    btn.className = 'watchlist-btn';
    const id = card.getAttribute('href');
    btn.innerHTML = watchlist.includes(id) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    btn.onclick = (e) => {
        e.preventDefault();
        if (watchlist.includes(id)) {
            watchlist = watchlist.filter(item => item !== id);
            btn.innerHTML = '<i class="far fa-heart"></i>';
        } else {
            watchlist.push(id);
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

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    setupAndroidFix();
    const input = document.querySelector('.search-input');
    if (input) input.addEventListener('input', handleSearch);
    setInterval(updateSlider, 9000);
});
