const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let lastRequestTime = 0;
let currentFilter = "all";

// --- Core Data Refresh ---
function refreshMovieData() {
    const movieCards = document.querySelectorAll('.movie-link');
    movieData = Array.from(movieCards).map(card => {
        const tmdbId = card.getAttribute('data-id');
        const currentHref = card.getAttribute('href');
        if (tmdbId && currentHref && !currentHref.includes('&tmdb=')) {
            card.setAttribute('href', `${currentHref}&tmdb=${tmdbId}`);
        }
        return {
            link: card.getAttribute('href'),
            title: card.querySelector('h3').innerText.trim(),
            imdbId: tmdbId, 
            searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
        };
    });
}

// --- Smart Filter Function ---
function filterByCategory(category) {
    currentFilter = category.toLowerCase();
    const movieElements = document.querySelectorAll('.movie-link');
    const chips = document.querySelectorAll('.filter-chip');
    
    // Update UI active state
    chips.forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-filter') === category);
    });

    let foundCount = 0;
    movieElements.forEach(link => {
        const text = link.innerText.toLowerCase();
        const isMatch = (currentFilter === "all") || text.includes(currentFilter);
        
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) foundCount++;
    });
}

// --- Share Link Function ---
function shareMovie(title, url) {
    if (navigator.share) {
        navigator.share({
            title: `Watch ${title} on CineView`,
            url: url
        }).catch(console.error);
    } else {
        // Fallback: Copy to clipboard
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Link copied to clipboard!");
    }
}

// --- Request System ---
async function sendRequest() {
    const searchInputs = document.querySelectorAll('.search-input');
    let movieName = "";
    searchInputs.forEach(input => { if(input.value.trim() !== "") movieName = input.value.trim(); });

    if (!movieName) return;
    if (Date.now() - lastRequestTime < 30000) return;

    const btn = document.getElementById('reqBtn');
    btn.innerText = "Sending...";
    btn.disabled = true;

    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n<b>🎬 Movie:</b> ${movieName}\n<b>🌐 Platform:</b> CineView Web`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: DISCUSSION_GROUP_ID, text: message, parse_mode: 'HTML' })
        });
        const data = await res.json();
        if (data.ok) {
            lastRequestTime = Date.now();
            document.getElementById('requestBox').innerHTML = `<h3 style="color:#00ff00;">✅ Request Sent!</h3><p>We've noted <b>${movieName}</b>.</p>`;
        }
    } catch (e) { btn.disabled = false; }
}

// --- Search Handler ---
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const requestBox = document.getElementById('requestBox');
    let foundCount = 0;

    document.querySelectorAll('.movie-link').forEach(link => {
        const text = link.textContent.toLowerCase();
        const isMatch = text.includes(term) && (currentFilter === "all" || text.includes(currentFilter));
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) foundCount++;
    });

    if (foundCount === 0 && term.length > 0) requestBox.classList.remove('hidden');
    else requestBox.classList.add('hidden');
}

// --- Slider logic ---
async function updateSlider() {
    refreshMovieData();
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    if (!movie) return;

    const sliderBg = document.getElementById('sliderBg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const playBtn = document.getElementById('playBtn');

    let url = movie.imdbId 
        ? `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        let result = movie.imdbId ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            if (sliderBg) sliderBg.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.6), #121212), url('${BACKDROP_BASE + result.backdrop_path}')`;
            if (sliderTitle) sliderTitle.innerText = movie.title;
            if (movieRating) movieRating.innerHTML = `<i class="fas fa-star" style="color:#f5c518"></i> ${result.vote_average.toFixed(1)}`;
            if (playBtn) playBtn.href = movie.link;
            document.getElementById('sliderImg').src = POSTER_BASE + result.poster_path;
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    refreshMovieData();
    
    // Sort logic
    const movieGrid = document.getElementById('movieGrid');
    if (movieGrid) {
        const movieElements = Array.from(movieGrid.getElementsByClassName('movie-link'));
        movieElements.sort((a, b) => {
            const isNewA = /2025|2026|New/i.test(a.innerText);
            const isNewB = /2025|2026|New/i.test(b.innerText);
            if (isNewB && !isNewA) return 1;
            if (isNewA && !isNewB) return -1;
            return 0.5 - Math.random();
        });
        movieGrid.innerHTML = "";
        movieElements.forEach(el => movieGrid.appendChild(el));
    }

    // Event Listeners
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => input.addEventListener('input', handleSearch));

    document.querySelector('.menu-toggle')?.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    if (movieData.length > 0) {
        updateSlider();
        setInterval(updateSlider, 8000);
    }
});
