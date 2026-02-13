const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; // Higher quality for slider
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let sliderPool = []; // Pre-fetched high-quality slider items
let currentSliderIndex = -1;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * 1. INITIALIZE LIBRARY
 */
async function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Initial sort for local library (Latest first)
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
    
    // Start Slider System with Pre-fetching
    await prefetchSliderData();
    updateSlider(); // First load
    setInterval(updateSlider, 10000); // Auto change every 10s
}

/**
 * 2. PRE-FETCH SLIDER DATA (Avoids slow per-slide fetching)
 */
async function prefetchSliderData() {
    try {
        // Fetch top 20 trending globally for high-quality hero content
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        
        sliderPool = data.results.map(item => ({
            title: item.title || item.name,
            rating: item.vote_average.toFixed(1),
            backdrop: BACKDROP_BASE + item.backdrop_path,
            poster: POSTER_BASE + item.poster_path,
            // Try to find a local link for this trending item, otherwise default to search
            link: `newplayer/player.html?tmdb=${item.id}&title=${encodeURIComponent(item.title || item.name)}&type=${item.media_type === 'tv' ? 'series' : 'movie'}`
        })).filter(item => item.backdrop && item.poster);
        
        // Shuffle the initial pool
        sliderPool.sort(() => Math.random() - 0.5);
    } catch (e) {
        console.error("Slider prefetch failed", e);
    }
}

/**
 * 3. OPTIMIZED SLIDER UPDATE
 */
function updateSlider() {
    if (sliderPool.length === 0) return;

    // Pick next index, avoiding immediate repeats
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * sliderPool.length);
    } while (nextIndex === currentSliderIndex && sliderPool.length > 1);
    
    currentSliderIndex = nextIndex;
    const current = sliderPool[currentSliderIndex];

    const el = { 
        title: document.getElementById('sliderTitle'), 
        rating: document.getElementById('movieRating'), 
        img: document.getElementById('sliderImg'), 
        bg: document.getElementById('sliderBg'), 
        btn: document.getElementById('playBtn') 
    };

    if (!el.title || !el.bg) return;

    // Fast Transition: Preload images before showing
    const tempImg = new Image();
    const tempBg = new Image();
    
    let loadedCount = 0;
    const onImgLoad = () => {
        loadedCount++;
        if (loadedCount === 2) {
            // Apply data only after images are ready in cache
            el.bg.style.backgroundImage = `linear-gradient(to bottom, transparent, #050505), url('${current.backdrop}')`;
            el.img.src = current.poster;
            el.title.innerText = current.title;
            el.rating.innerHTML = `⭐ ${current.rating}`;
            el.btn.href = current.link;
            
            el.title.classList.remove('skeleton');
            el.rating.classList.remove('skeleton');
            el.img.style.opacity = "1";
        }
    };

    el.title.classList.add('skeleton');
    el.rating.classList.add('skeleton');
    el.img.style.opacity = "0.3"; // Dim instead of fully hiding for smoother feel

    tempImg.onload = onImgLoad;
    tempBg.onload = onImgLoad;
    tempImg.src = current.poster;
    tempBg.src = current.backdrop;
}

/**
 * 4. GLOBAL SEARCH SYSTEM
 */
async function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    const movieGrid = document.getElementById('movieGrid');
    const requestBox = document.getElementById('requestBox');
    
    document.querySelectorAll('.tmdb-result').forEach(el => el.remove());

    let localMatches = 0;
    const localLibMap = new Set();

    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const titleText = link.querySelector('h3').innerText.toLowerCase();
        const isMatch = titleText.includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) localMatches++;
        if (link.dataset.id) localLibMap.add(link.dataset.id.toString());
        localLibMap.add(titleText);
    });

    if (term.length > 2) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(term)}&language=en-US`);
            const data = await res.json();
            
            let results = data.results.filter(m => {
                const isValidMedia = (m.media_type === 'movie' || m.media_type === 'tv');
                const mTitle = (m.title || m.name || "").toLowerCase();
                const mId = (m.id || "").toString();
                return isValidMedia && !localLibMap.has(mId) && !localLibMap.has(mTitle);
            });

            results.sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
                const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
                if (dateB - dateA !== 0) return dateB - dateA;
                return b.popularity - a.popularity;
            });

            if(results.length > 0) {
                requestBox.classList.add('hidden');
                results.slice(0, 12).forEach(movie => {
                    const type = movie.media_type;
                    const tmdbCard = document.createElement('a');
                    tmdbCard.className = 'movie-link tmdb-result';
                    tmdbCard.href = `newplayer/player.html?tmdb=${movie.id}&title=${encodeURIComponent(movie.title || movie.name)}&isHindi=true&type=${type === 'tv' ? 'series' : 'movie'}`;
                    
                    const releaseYear = (movie.release_date || movie.first_air_date || 'N/A').split('-')[0];
                    tmdbCard.innerHTML = `
                        <div class="movie-card">
                            <div class="movie-poster-container">
                                <span class="external-badge">${releaseYear >= 2025 ? 'NEW' : 'LIVE'}</span>
                                <img src="${POSTER_BASE}${movie.poster_path}" class="movie-poster" onerror="this.src='https://via.placeholder.com/500x750?text=No+Poster'">
                            </div>
                            <div class="movie-info">
                                <h3>${movie.title || movie.name}</h3>
                                <p>${releaseYear} | ${type === 'tv' ? 'Series' : 'Movie'}</p>
                            </div>
                        </div>
                    `;
                    movieGrid.appendChild(tmdbCard);
                });
            } else if (localMatches === 0) {
                requestBox.classList.remove('hidden');
            }
        } catch (err) { console.error("Search Error:", err); }
    } else if (term.length === 0) {
        requestBox.classList.add('hidden');
    }
}

/**
 * 5. TOP 10, WATCHLIST & UTILS
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
        if (matched.length < 10) matched = [...new Set([...matched, ...localElements.slice(0, 15)])].slice(0, 10);
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
    } catch (e) { console.error("Top 10 load failed"); }
}

async function sendRequest() {
    const input = document.querySelector('.search-input');
    const movieName = input.value.trim();
    if (!movieName) return;
    const btn = document.getElementById('reqBtn');
    btn.innerText = "Sending..."; btn.disabled = true;
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n<b>🎬 Movie:</b> ${movieName}\n\n<i>CineView Global Request</i>`;
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: DISCUSSION_GROUP_ID, text: message, parse_mode: 'HTML' }) });
        document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Request Sent!</h3><p style="font-size: 13px; color: #888;">Admin notified.</p>`;
    } catch (e) { btn.innerText = "Error! Retry"; btn.disabled = false; }
}

function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({ 
        link: card.getAttribute('href'), 
        title: card.querySelector('h3')?.innerText || 'Untitled', 
        id: card.dataset.id || "", 
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
        if (watchlist.includes(id)) { watchlist = watchlist.filter(item => item !== id); btn.innerHTML = '<i class="far fa-heart"></i>'; }
        else { watchlist.push(id); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
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
        const original = document.querySelector(`.movie-link[href*=\"id=${id}\"]`);
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
});
