const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

/**
 * INITIALIZE: Sorting, Lazy Loading, and Watchlist Hearts
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort Newest (2025/2026) First
    movieElements.sort((a, b) => {
        const isNewA = /2025|2026|New/i.test(a.innerText);
        const isNewB = /2025|2026|New/i.test(b.innerText);
        if (isNewB && !isNewA) return 1;
        if (isNewA && !isNewB) return -1;
        return 0.5 - Math.random();
    });

    movieGrid.innerHTML = "";
    movieElements.forEach(el => {
        // Apply Lazy Loading attribute
        const img = el.querySelector('img');
        if (img) img.setAttribute('loading', 'lazy');
        
        movieGrid.appendChild(el);
        addWatchlistButton(el); 
    });

    loadTop10(movieElements);
    refreshMovieData();
    renderWatchlist();
}

/**
 * TOP 10: Matched with TMDB Trending
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
            const name = (t.title || t.name).toLowerCase();
            const match = localElements.find(el => {
                const id = el.getAttribute('data-id');
                const title = el.querySelector('h3').innerText.toLowerCase();
                return (id == t.id) || title.includes(name);
            });
            if (match && !matched.includes(match)) matched.push(match);
        });

        // Fallback to latest uploads if trending not found in library
        if (matched.length < 10) {
            localElements.slice(0, 15).forEach(el => {
                if (matched.length < 10 && !matched.includes(el)) matched.push(el);
            });
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
    } catch (e) { console.error("Top 10 Loading Failed"); }
}

/**
 * SLIDER: With Skeleton Shimmer Logic
 */
async function updateSlider() {
    refreshMovieData();
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    if (!movie) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');

    // Show Skeleton State
    sliderTitle.classList.add('skeleton');
    movieRating.classList.add('skeleton');
    sliderImg.style.opacity = "0";

    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            const backdropImg = new Image();
            backdropImg.src = BACKDROP_BASE + result.backdrop_path;
            
            backdropImg.onload = () => {
                document.getElementById('sliderBg').style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${backdropImg.src}')`;
                sliderTitle.innerText = movie.title;
                movieRating.innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
                document.getElementById('playBtn').href = movie.link;
                sliderImg.src = POSTER_BASE + result.poster_path;
                
                // Remove Skeleton State
                sliderTitle.classList.remove('skeleton');
                movieRating.classList.remove('skeleton');
                sliderImg.style.opacity = "1";
            };
        }
    } catch (e) {
        sliderTitle.classList.remove('skeleton');
        movieRating.classList.remove('skeleton');
        sliderImg.style.opacity = "1";
    }
}

/**
 * WATCHLIST: Hearts on Posters
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
    const grid = document.getElementById('myListGrid');
    const section = document.getElementById('myListSection');
    const count = document.getElementById('watchlistCount');
    
    if (watchlist.length === 0) {
        section.classList.add('hidden');
        if(count) count.innerText = "";
        return;
    }

    section.classList.remove('hidden');
    if(count) count.innerText = `(${watchlist.length})`;
    grid.innerHTML = "";

    watchlist.forEach(id => {
        const original = document.querySelector(`.movie-link[href*="id=${id}"]`);
        if (original) {
            const clone = original.cloneNode(true);
            clone.querySelector('.watchlist-btn').onclick = (e) => {
                e.preventDefault();
                watchlist = watchlist.filter(item => item !== id);
                localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
                renderWatchlist();
            };
            grid.appendChild(clone);
        }
    });
}

/**
 * UTILS: Filters, Search, Telegram
 */
function filterByCategory(cat) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const match = (cat === 'all') || link.innerText.toLowerCase().includes(cat.toLowerCase());
        link.style.display = match ? '' : 'none';
    });
}

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

async function sendRequest() {
    const name = document.querySelector('.search-input').value;
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
        document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Sent!</h3>`;
    } catch (e) {}
}

function refreshMovieData() {
    movieData = Array.from(document.querySelectorAll('#movieGrid .movie-link')).map(card => ({
        link: card.getAttribute('href'),
        title: card.querySelector('h3').innerText,
        id: card.dataset.id,
        searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLibrary();
    document.querySelectorAll('.search-input').forEach(i => i.addEventListener('input', handleSearch));
    setInterval(updateSlider, 9000);
});
