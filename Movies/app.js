const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w342"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let nextSlideCache = null;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * 1. INITIALIZE LIBRARY
 * Handles sorting, lazy loading, and UI setup
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort: 2025/2026 content at the top
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        return isNewB - isNewA;
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        // Apply Native Lazy Loading
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    refreshMovieData();
    loadTop10(movieElements); 
    renderWatchlist();
    
    // Initial Slider Setup
    prepareNextSlide().then(() => updateSlider());
}

/**
 * 2. TOP 10 TRENDING
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

        if (matched.length < 10) {
            matched = [...new Set([...matched, ...localElements.slice(0, 15)])].slice(0, 10);
        }

        top10Grid.innerHTML = "";
        matched.slice(0, 10).forEach((el, index) => {
            const clone = el.cloneNode(true); 
            clone.className = 'top10-card';
            const num = document.createElement('div');
            num.className = 'rank-num';
            num.innerText = index + 1;
            clone.appendChild(num);
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 load error"); }
}

/**
 * 3. SLIDER SYSTEM (SKELETON + TURBO CACHE)
 */
async function updateSlider() {
    if (movieData.length === 0) return;

    const el = {
        title: document.getElementById('sliderTitle'),
        rating: document.getElementById('movieRating'),
        img: document.getElementById('sliderImg'),
        bg: document.getElementById('sliderBg'),
        btn: document.getElementById('playBtn')
    };

    // Enter Skeleton State
    el.title.classList.add('skeleton');
    el.rating.classList.add('skeleton');
    el.img.style.opacity = "0";

    let current = nextSlideCache || await fetchSlideData();

    if (current && el.bg) {
        el.bg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${current.backdrop}')`;
        el.title.innerText = current.title;
        el.rating.innerHTML = `⭐ ${current.rating}`;
        el.img.src = current.poster;
        el.btn.href = current.link;
        
        el.img.onload = () => {
            el.title.classList.remove('skeleton');
            el.rating.classList.remove('skeleton');
            el.img.style.opacity = "1";
        };
    }
    prepareNextSlide();
}

async function fetchSlideData() {
    if (movieData.length === 0) return null;
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 25))];

    try {
        const url = movie.id ? 
            `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id` : 
            `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;
        
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            return {
                title: movie.title,
                rating: result.vote_average.toFixed(1),
                backdrop: BACKDROP_BASE + result.backdrop_path,
                poster: POSTER_BASE + result.poster_path,
                link: movie.link
            };
        }
    } catch (e) { return null; }
}

async function prepareNextSlide() { nextSlideCache = await fetchSlideData(); }

/**
 * 4. SEARCH & REQUEST SYSTEM
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

    // Show request box ONLY if search yields no results
    if (found === 0 && term.length > 0) {
        requestBox.classList.remove('hidden');
    } else {
        requestBox.classList.add('hidden');
    }
}

async function sendRequest() {
    const input = document.querySelector('.search-input');
    const movieName = input.value.trim();
    if (!movieName) return;

    const btn = document.getElementById('reqBtn');
    btn.innerText = "Sending...";
    btn.disabled = true;

    // Fixed message using HTML mode to avoid parse errors with underscores (_)
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n` +
                    `<b>🎬 Movie:</b> ${movieName}\n\n` +
                    `<i>Someone is looking for this on CineView!</i>`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: DISCUSSION_GROUP_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        const data = await res.json();
        if (data.ok) {
            document.getElementById('requestBox').innerHTML = `
                <h3 style="color:#00ff00;">✅ Request Sent!</h3>
                <p style="font-size: 13px; color: #888;">We have notified the admin team.</p>
            `;
        }
    } catch (e) { 
        btn.innerText = "Error! Retry";
        btn.disabled = false;
    }
}

/**
 * 5. WATCHLIST & UTILS
 */
function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3')?.innerText || 'Untitled',
        id: card.dataset.id,
        searchTitle: card.querySelector('h3')?.innerText.replace(/\[.*?\]/g, '').trim() || ''
    }));
}

function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    if (!container || container.querySelector('.watchlist-btn')) return;
    
    const href = card.getAttribute('href');
    const id = href.includes('id=') ? href.split('id=')[1].split('&')[0] : card.querySelector('h3').innerText;
    
    const btn = document.createElement('button');
    btn.className = 'watchlist-btn';
    btn.innerHTML = watchlist.includes(id) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    btn.onclick = (e) => {
        e.preventDefault(); e.stopPropagation();
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
        const original = document.querySelector(`.movie-link[href*="id=${id}"]`);
        if (original) grid.appendChild(original.cloneNode(true));
    });
}

function filterByCategory(cat) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
    
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const match = (cat === 'all') || link.innerText.toLowerCase().includes(cat.toLowerCase());
        link.style.display = match ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    const inputs = document.querySelectorAll('.search-input');
    inputs.forEach(input => input.addEventListener('input', handleSearch));
    setInterval(updateSlider, 10000);
});
