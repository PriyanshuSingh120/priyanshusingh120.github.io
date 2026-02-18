const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let sliderPool = []; 
let currentSliderIndex = -1;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

// --- CLOUD SYNC HELPERS (Relative to root) ---
async function cloudFetch(action, data = {}) {
    if (typeof netlifyIdentity === 'undefined') return null;
    const user = netlifyIdentity.currentUser();
    if (!user && (action !== 'getComments')) return null;
    
    try {
        // Path is ALWAYS root-based for Netlify Functions
        const res = await fetch('/.netlify/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action, 
                userId: user?.id, 
                userName: user?.user_metadata?.full_name || user?.email?.split('@')[0],
                ...data 
            })
        });
        return await res.json();
    } catch (e) {
        console.error("Cloud Error:", e);
        return null;
    }
}

async function loadHistory() {
    const history = await cloudFetch('getHistory');
    const grid = document.getElementById('historyGrid');
    const section = document.getElementById('historySection');
    if (!grid || !history || history.length === 0) return;

    section.classList.remove('hidden');
    grid.innerHTML = history.map(m => `
        <a href="${m.link}" class="movie-link">
            <div class="movie-card">
                <div class="movie-poster-container"><img src="${m.img}" class="movie-poster"></div>
                <div class="movie-info"><h3>${m.title}</h3></div>
            </div>
        </a>
    `).join('');
}

/**
 * 1. INITIALIZE LIBRARY
 */
async function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        return isNewB - isNewA;
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    refreshMovieData();
    loadTop10(movieElements); // Restored original logic
    renderWatchlist();
    await prefetchSliderData();
    updateSlider(); 
    setInterval(updateSlider, 12000); 

    if (typeof netlifyIdentity !== 'undefined') {
        netlifyIdentity.on('login', () => {
            cloudFetch('getWatchlist').then(ids => {
                if(ids) {
                    watchlist = ids;
                    localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
                    renderWatchlist();
                }
            });
            loadHistory();
        });
        if (netlifyIdentity.currentUser()) loadHistory();
    }
}

/**
 * 2. SLIDER & SEARCH
 */
async function prefetchSliderData() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        sliderPool = data.results.map(item => {
            const tmdbId = item.id.toString();
            const title = (item.title || item.name || "").toLowerCase();
            const localMatch = movieData.find(m => (m.id && m.id === tmdbId) || title.includes(m.title.toLowerCase()));

            return {
                title: item.title || item.name,
                rating: item.vote_average.toFixed(1),
                backdrop: BACKDROP_BASE + item.backdrop_path,
                poster: POSTER_BASE + item.poster_path,
                link: localMatch ? localMatch.link : `newplayer/player.html?tmdb=${item.id}&title=${encodeURIComponent(item.title || item.name)}&type=${item.media_type === 'tv' ? 'series' : 'movie'}&isHindi=true`
            };
        }).filter(item => item.backdrop && item.poster);
        sliderPool.sort(() => Math.random() - 0.5);
    } catch (e) { console.error(e); }
}

function updateSlider() {
    if (sliderPool.length === 0) return;
    currentSliderIndex = (currentSliderIndex + 1) % sliderPool.length;
    const current = sliderPool[currentSliderIndex];
    const el = { title: document.getElementById('sliderTitle'), rating: document.getElementById('movieRating'), img: document.getElementById('sliderImg'), bg: document.getElementById('sliderBg'), btn: document.getElementById('playBtn') };
    if (!el.title || !el.bg) return;
    el.bg.style.backgroundImage = `linear-gradient(to bottom, transparent, #050505), url('${current.backdrop}')`;
    el.img.src = current.poster;
    el.title.innerText = current.title;
    el.rating.innerHTML = `⭐ ${current.rating}`;
    el.btn.href = current.link;
}

function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => {
        const href = card.getAttribute('href');
        return { 
            link: href, 
            title: card.querySelector('h3')?.innerText || 'Untitled', 
            id: href.includes('id=') ? href.split('id=')[1].split('&')[0] : "", 
        };
    });
}

/**
 * 3. TOP 10 LOGIC (RESTORED TO ORIGINAL DESIGN)
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
            clone.className = 'top10-card'; // This class handles the specific sizing in your CSS
            const num = document.createElement('div');
            num.className = 'rank-num';
            num.innerText = index + 1;
            clone.appendChild(num);
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 error"); }
}

/**
 * 4. WATCHLIST & UTILS
 */
function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    if (!container || container.querySelector('.watchlist-btn')) return;
    const href = card.getAttribute('href');
    const id = href.includes('id=') ? href.split('id=')[1].split('&')[0] : card.querySelector('h3').innerText;
    
    const btn = document.createElement('button');
    btn.className = 'watchlist-btn';
    btn.innerHTML = watchlist.includes(id) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    btn.onclick = async (e) => {
        e.preventDefault(); e.stopPropagation();
        if (watchlist.includes(id)) { 
            watchlist = watchlist.filter(item => item !== id); 
            btn.innerHTML = '<i class="far fa-heart"></i>'; 
        } else { 
            watchlist.push(id); 
            btn.innerHTML = '<i class="fas fa-heart"></i>'; 
            await cloudFetch('addWatchlist', { movieId: id });
        }
        localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    };
    container.appendChild(btn);
}

function renderWatchlist() {
    const grid = document.getElementById('myListGrid');
    const section = document.getElementById('myListSection');
    const count = document.getElementById('watchlistCount');
    if (!grid || !section) return;
    if (count) count.innerText = watchlist.length > 0 ? `(${watchlist.length})` : "";
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

async function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    const movieGrid = document.getElementById('movieGrid');
    const requestBox = document.getElementById('requestBox');
    if(!movieGrid) return;

    document.querySelectorAll('.tmdb-result').forEach(el => el.remove());
    let localMatches = 0;
    const localLibMap = new Set();

    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const titleText = link.querySelector('h3').innerText.toLowerCase();
        const isMatch = titleText.includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) localMatches++;
        const mId = link.getAttribute('href').split('id=')[1]?.split('&')[0];
        if (mId) localLibMap.add(mId.toString());
    });

    if (term.length > 2) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(term)}&language=en-US`);
            const data = await res.json();
            let results = data.results.filter(m => (m.media_type === 'movie' || m.media_type === 'tv') && !localLibMap.has(m.id.toString()));
            if(results.length > 0) {
                if(requestBox) requestBox.classList.add('hidden');
                results.slice(0, 12).forEach(movie => {
                    const tmdbCard = document.createElement('a');
                    tmdbCard.className = 'movie-link tmdb-result';
                    tmdbCard.href = `newplayer/player.html?tmdb=${movie.id}&title=${encodeURIComponent(movie.title || movie.name)}&type=${movie.media_type === 'tv' ? 'series' : 'movie'}`;
                    tmdbCard.innerHTML = `<div class="movie-card"><div class="movie-poster-container"><img src="${POSTER_BASE}${movie.poster_path}" class="movie-poster"></div><div class="movie-info"><h3>${movie.title || movie.name}</h3></div></div>`;
                    movieGrid.appendChild(tmdbCard);
                });
            } else if (localMatches === 0 && requestBox) requestBox.classList.remove('hidden');
        } catch (err) { console.error(err); }
    } else if (term.length === 0 && requestBox) requestBox.classList.add('hidden');
}

async function sendRequest() {
    const input = document.querySelector('.search-input');
    const movieName = input.value.trim();
    if (!movieName) return;
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n<b>🎬 Movie:</b> ${movieName}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: DISCUSSION_GROUP_ID, text: message, parse_mode: 'HTML' }) });
    alert("Request Sent!");
}

document.addEventListener('DOMContentLoaded', initializeLibrary);
const inputs = document.querySelectorAll('.search-input');
inputs.forEach(input => input.addEventListener('input', handleSearch));
