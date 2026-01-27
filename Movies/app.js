const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * 1. INITIALIZE LIBRARY
 * Randomizes the grid, adds hearts, and builds the Top 10
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort logic (Newest 2025/2026 First)
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        if (isNewB && !isNewA) return 1;
        if (isNewA && !isNewB) return -1;
        return 0.5 - Math.random();
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    loadTop10(movieElements);
    refreshMovieData();
    renderWatchlist();
}

/**
 * 2. TOP 10 TRENDING (TMDB MATCHED)
 */
async function loadTop10(localElements) {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;

    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        const trending = data.results;

        let matchedTop10 = [];
        
        // Match TMDB trending with your site items
        trending.forEach(t => {
            const tName = (t.title || t.name).toLowerCase();
            const match = localElements.find(el => {
                const tmdbId = el.getAttribute('data-id');
                const title = el.querySelector('h3').innerText.toLowerCase();
                return (tmdbId == t.id) || title.includes(tName);
            });
            if (match && !matchedTop10.includes(match)) matchedTop10.push(match);
        });

        // Fill rest with your latest if < 10 matches
        if (matchedTop10.length < 10) {
            localElements.slice(0, 15).forEach(el => {
                if (matchedTop10.length < 10 && !matchedTop10.includes(el)) matchedTop10.push(el);
            });
        }

        top10Grid.innerHTML = "";
        matchedTop10.slice(0, 10).forEach((el, index) => {
            const clone = el.cloneNode(true);
            clone.className = 'top10-card';
            const num = document.createElement('div');
            num.className = 'rank-num';
            num.innerText = index + 1;
            clone.appendChild(num);
            top10Grid.appendChild(clone);
        });
    } catch (e) { console.error("Top 10 Error", e); }
}

/**
 * 3. GENRE FILTERS
 */
function filterByCategory(cat) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
    
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const isMatch = (cat === 'all') || link.innerText.toLowerCase().includes(cat.toLowerCase());
        link.style.display = isMatch ? '' : 'none';
    });
}

/**
 * 4. WATCHLIST SYSTEM
 */
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
    const listGrid = document.getElementById('myListGrid');
    const listSection = document.getElementById('myListSection');
    const countEl = document.getElementById('watchlistCount');
    
    if (watchlist.length === 0) {
        listSection.classList.add('hidden');
        if(countEl) countEl.innerText = "";
        return;
    }

    listSection.classList.remove('hidden');
    if(countEl) countEl.innerText = `(${watchlist.length})`;
    listGrid.innerHTML = "";

    watchlist.forEach(id => {
        const original = document.querySelector(`.movie-link[href*="id=${id}"]`);
        if (original) {
            const clone = original.cloneNode(true);
            const btn = clone.querySelector('.watchlist-btn');
            btn.onclick = (e) => { e.preventDefault(); toggleWatchlist(id, btn); };
            listGrid.appendChild(clone);
        }
    });
}

/**
 * 5. TELEGRAM REQUEST (FIXED PARSE ERROR)
 */
async function sendRequest() {
    const searchInputs = document.querySelectorAll('.search-input');
    let movieName = "";
    searchInputs.forEach(input => { if(input.value.trim() !== "") movieName = input.value.trim(); });

    if (!movieName) return;
    const btn = document.getElementById('reqBtn');
    btn.innerText = "Sending Request...";
    btn.disabled = true;

    // USE HTML MODE TO AVOID UNDERSCORE (_) ERRORS
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n` +
                    `<b>🎬 Movie:</b> ${movieName}\n` +
                    `<b>👤 Status:</b> User Searching\n\n` +
                    `Admin, someone is looking for this title!`;

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
            document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Sent!</h3><p>We've noted your request.</p>`;
        } else { alert("Bot Error: " + data.description); }
    } catch (e) { alert("Network Error"); }
    btn.disabled = false;
}

/**
 * 6. SLIDER & UTILS
 */
function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3').innerText,
        tmdbId: card.dataset.id,
        searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
    }));
}

async function updateSlider() {
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    if (!movie) return;

    let url = movie.tmdbId 
        ? `https://api.themoviedb.org/3/find/${movie.tmdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.tmdbId ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            document.getElementById('sliderBg').style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${BACKDROP_BASE + result.backdrop_path}')`;
            document.getElementById('sliderTitle').innerText = movie.title;
            document.getElementById('movieRating').innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
            document.getElementById('playBtn').href = movie.link;
            document.getElementById('sliderImg').src = POSTER_BASE + result.poster_path;
            document.getElementById('sliderImg').style.opacity = "1";
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const requestBox = document.getElementById('requestBox');
            let found = 0;
            document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
                const match = link.textContent.toLowerCase().includes(term);
                link.style.display = match ? '' : 'none';
                if (match) found++;
            });
            if (found === 0 && term.length > 0) requestBox.classList.remove('hidden');
            else requestBox.classList.add('hidden');
        });
    });
    setInterval(updateSlider, 8000);
});
