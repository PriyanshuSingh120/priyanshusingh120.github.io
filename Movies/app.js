const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let sliderPool = []; 
let currentSliderIndex = -1;
let watchlist = JSON.parse(localStorage.getItem('cineview_watchlist')) || [];

async function cloudFetch(action, data = {}) {
    const user = netlifyIdentity.currentUser();
    if (!user && action !== 'getComments') return null;
    
    const res = await fetch('/.netlify/functions/api', {
        method: 'POST',
        body: JSON.stringify({ 
            action, 
            userId: user?.id, 
            userName: user?.user_metadata?.full_name || user?.email?.split('@')[0],
            ...data 
        })
    });
    return res.json();
}

// Watchlist Sync
async function syncWatchlist() {
    const cloudIds = await cloudFetch('getWatchlist');
    if (cloudIds) {
        watchlist = cloudIds;
        localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    }
}

// History Sync
async function loadHistory() {
    const history = await cloudFetch('getHistory');
    const grid = document.getElementById('historyGrid');
    const section = document.getElementById('historySection');
    if (!history || history.length === 0) return;

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

// Update your addWatchlistButton
function addWatchlistButton(card) {
    // ... (Keep existing logic to get ID)
    btn.onclick = async (e) => {
        e.preventDefault();
        if (watchlist.includes(id)) {
            watchlist = watchlist.filter(item => item !== id);
        } else {
            watchlist.push(id);
            await cloudFetch('addWatchlist', { movieId: id }); // SAVE TO NEON
        }
        localStorage.setItem('cineview_watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    };
}
