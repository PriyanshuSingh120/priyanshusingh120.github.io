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
 */
function initializeLibrary() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
    
    // Sort local library: 2025/2026 content at the top
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
    prepareNextSlide().then(() => updateSlider());
}

/**
 * 2. SEARCH SYSTEM (English Names + Sorting + Duplicate Removal)
 */
async function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    const movieGrid = document.getElementById('movieGrid');
    const requestBox = document.getElementById('requestBox');
    
    // Remove previous dynamic search results
    document.querySelectorAll('.tmdb-result').forEach(el => el.remove());

    let localFound = 0;
    const localIds = new Set();

    // Filter local cards
    document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
        const title = link.querySelector('h3').innerText.toLowerCase();
        const isMatch = title.includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) {
            localFound++;
            // Track local IDs to prevent duplicates (using dataset.id or title hash)
            localIds.add(link.dataset.id || title);
        }
    });

    // TMDB Fallback if local results are low/empty
    if (term.length > 2) {
        try {
            // Using language=en-US for English names
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(term)}&language=en-US`);
            const data = await res.json();
            
            // 1. Filter: Hindi original language only 
            // 2. Filter: Remove duplicates already in local library
            let results = data.results.filter(m => 
                m.original_language === 'hi' && 
                !localIds.has(m.id.toString()) && 
                !localIds.has(m.title?.toLowerCase() || m.name?.toLowerCase())
            );

            // 3. Sort by Release Date (Latest on top)
            results.sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
                const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
                return dateB - dateA;
            });

            if(results.length > 0) {
                requestBox.classList.add('hidden');
                results.slice(0, 8).forEach(movie => {
                    const type = movie.media_type;
                    const tmdbCard = document.createElement('a');
                    tmdbCard.className = 'movie-link tmdb-result';
                    tmdbCard.href = `newplayer/player.html?tmdb=${movie.id}&title=${encodeURIComponent(movie.title || movie.name)}&isHindi=true&type=${type === 'tv' ? 'series' : 'movie'}`;
                    
                    const year = (movie.release_date || movie.first_air_date || '').split('-')[0];

                    tmdbCard.innerHTML = `
                        <div class="movie-card">
                            <div class="movie-poster-container">
                                <span class="external-badge">LATEST</span>
                                <img src="${POSTER_BASE}${movie.poster_path}" class="movie-poster" onerror="this.src='https://via.placeholder.com/500x750?text=No+Poster'">
                            </div>
                            <div class="movie-info">
                                <h3>${movie.title || movie.name}</h3>
                                <p>${year} | ${type === 'tv' ? 'Series' : 'Movie'}</p>
                            </div>
                        </div>
                    `;
                    movieGrid.appendChild(tmdbCard);
                });
            } else if (localFound === 0) {
                requestBox.classList.remove('hidden');
            }
        } catch (err) {
            console.error("TMDB Search Error", err);
        }
    } else if (term.length === 0) {
        requestBox.classList.add('hidden');
    }
}

// ... rest of Top 10, Slider, and Watchlist functions remain as provided previously ...

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
