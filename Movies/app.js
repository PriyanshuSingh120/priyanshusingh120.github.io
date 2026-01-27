const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * REFRESH & SORT: Scans HTML and handles the priority sorting
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // 1. Sort by Latest (2025/2026)
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        if (isNewB && !isNewA) return 1;
        if (isNewA && !isNewB) return -1;
        return 0.5 - Math.random();
    });

    // 2. Re-inject sorted movies
    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        movieGrid.appendChild(el);
        addWatchlistButton(el); // Add the heart icon to each card
    });

    // 3. Generate Top 10
    generateTop10(movieElements);
    
    // 4. Update movieData for Slider
    refreshMovieData();
    
    // 5. Load Watchlist
    renderWatchlist();
}

/**
 * TOP 10 GENERATOR: Takes the first 10 sorted movies
 */
function generateTop10(elements) {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;

    top10Grid.innerHTML = "";
    elements.slice(0, 10).forEach((el, index) => {
        const clone = el.cloneNode(true);
        clone.classList.add('top10-item');
        
        // Add the rank number
        const rank = document.createElement('div');
        rank.className = 'rank-number';
        rank.innerText = index + 1;
        
        clone.querySelector('.movie-card').prepend(rank);
        top10Grid.appendChild(clone);
    });
}

/**
 * WATCHLIST LOGIC: Save movies locally
 */
function addWatchlistButton(card) {
    const container = card.querySelector('.movie-poster-container');
    const movieId = card.getAttribute('href').split('id=')[1].split('&')[0];
    
    const btn = document.createElement('button');
    btn.className = 'watchlist-btn';
    btn.innerHTML = watchlist.includes(movieId) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchlist(movieId, btn);
    };
    
    container.appendChild(btn);
}

function toggleWatchlist(id, btn) {
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(item => item !== id);
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        watchlist.push(id);
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
    renderWatchlist();
}

function renderWatchlist() {
    const listGrid = document.getElementById('myListGrid');
    const listSection = document.getElementById('myListSection');
    const countEl = document.getElementById('watchlistCount');
    
    if (watchlist.length === 0) {
        listSection.classList.add('hidden');
        countEl.innerText = "";
        return;
    }

    listSection.classList.remove('hidden');
    countEl.innerText = `(${watchlist.length})`;
    listGrid.innerHTML = "";

    watchlist.forEach(id => {
        const original = document.querySelector(`.movie-link[href*="id=${id}"]`);
        if (original) {
            const clone = original.cloneNode(true);
            // Re-attach watchlist logic to clone
            const btn = clone.querySelector('.watchlist-btn');
            btn.onclick = (e) => {
                e.preventDefault();
                toggleWatchlist(id, btn);
            };
            listGrid.appendChild(clone);
        }
    });
}

/**
 * TELEGRAM REQUEST SYSTEM
 */
async function sendRequest() {
    const name = document.querySelector('.search-input').value;
    const btn = document.getElementById('reqBtn');
    if (!name) return;

    btn.innerText = "Sending...";
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n<b>🎬 Movie:</b> ${name}\n\nSent from CineView Web.`;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: DISCUSSION_GROUP_ID, text: message, parse_mode: 'HTML' })
        });
        document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Sent!</h3><p>We'll update the group soon.</p>`;
    } catch (e) { btn.innerText = "Error!"; }
}

/**
 * SLIDER & SEARCH HELPERS
 */
function handleSearch(e) {
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
}

function filterByCategory(cat) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
    
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const isMatch = (cat === 'all') || link.innerText.toLowerCase().includes(cat.toLowerCase());
        link.style.display = isMatch ? '' : 'none';
    });
}

function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3').innerText,
        id: card.dataset.id,
        searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
    }));
}

async function updateSlider() {
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 15))];
    if (!movie) return;

    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            document.getElementById('sliderBg').style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${BACKDROP_BASE + result.backdrop_path}')`;
            document.getElementById('sliderTitle').innerText = movie.title;
            document.getElementById('movieRating').innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
            document.getElementById('playBtn').href = movie.link;
            document.getElementById('sliderImg').src = POSTER_BASE + result.poster_path;
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    document.querySelectorAll('.search-input').forEach(i => i.addEventListener('input', handleSearch));
    setInterval(updateSlider, 8000);
});
