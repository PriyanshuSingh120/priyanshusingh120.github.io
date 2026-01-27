const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 
let lastRequestTime = 0;

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

function getPrioritizedMovie() {
    if (movieData.length === 0) return null;
    const topLimit = Math.min(movieData.length, 25);
    const trendingMovies = movieData.slice(0, topLimit);
    const olderMovies = movieData.slice(topLimit);
    const pickFromTrending = Math.random() < 0.75 || olderMovies.length === 0;

    return pickFromTrending 
        ? trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
        : olderMovies[Math.floor(Math.random() * olderMovies.length)];
}

async function sendRequest() {
    const searchInputs = document.querySelectorAll('.search-input');
    let movieName = "";
    searchInputs.forEach(input => {
        if(input.value.trim() !== "") movieName = input.value.trim();
    });

    if (!movieName) return;

    // Spam Protection: 30 second cooldown
    const now = Date.now();
    if (now - lastRequestTime < 30000) {
        showStatus("Please wait a moment before requesting again.", "orange");
        return;
    }

    const btn = document.getElementById('reqBtn');
    const requestBox = document.getElementById('requestBox');
    
    btn.innerText = "Processing...";
    btn.disabled = true;

    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n` +
                    `<b>🎬 Movie:</b> ${movieName}\n` +
                    `<b>🌐 Platform:</b> CineView Web\n\n` +
                    `Admin, a user just requested this title!`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: DISCUSSION_GROUP_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            lastRequestTime = Date.now();
            requestBox.innerHTML = `
                <div style="padding: 20px;">
                    <h3 style="color: #00ff00; margin-bottom: 10px;">🚀 Request Sent!</h3>
                    <p style="color: #ccc; margin-bottom: 15px;">Your request for <b>${movieName}</b> is on its way to the admin team.</p>
                    <a href="https://t.me/prigames_chat" target="_blank" class="req-link">Join Discussion Group</a>
                    <button onclick="resetSearch()" style="margin-top: 15px; background: transparent; border: 1px solid #444; color: #888; padding: 5px 15px; border-radius: 4px; cursor: pointer;">Close</button>
                </div>
            `;
            // Clear inputs
            searchInputs.forEach(input => input.value = "");
        } else {
            throw new Error(data.description);
        }
    } catch (e) {
        btn.innerText = "Retry Request";
        btn.disabled = false;
        showStatus("Connection error. Please try again.", "red");
    }
}

function resetSearch() {
    const requestBox = document.getElementById('requestBox');
    const searchInputs = document.querySelectorAll('.search-input');
    requestBox.classList.add('hidden');
    searchInputs.forEach(input => {
        input.value = "";
        handleSearch({ target: input });
    });
}

function showStatus(msg, color) {
    const btn = document.getElementById('reqBtn');
    const originalText = btn.innerText;
    btn.innerText = msg;
    btn.style.backgroundColor = color;
    setTimeout(() => {
        btn.innerText = "🚀 Request this Movie";
        btn.style.backgroundColor = "#0088cc";
    }, 3000);
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const requestBox = document.getElementById('requestBox');
    let foundCount = 0;

    document.querySelectorAll('.movie-link').forEach(link => {
        const isMatch = link.textContent.toLowerCase().includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) {
            foundCount++;
            link.style.animation = "fadeIn 0.3s ease forwards";
        }
    });

    if (foundCount === 0 && term.length > 0) {
        requestBox.classList.remove('hidden');
    } else {
        requestBox.classList.add('hidden');
    }
}

async function updateSlider() {
    refreshMovieData();
    const movie = getPrioritizedMovie();
    if (!movie) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderBg = document.getElementById('sliderBg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const playBtn = document.getElementById('playBtn');

    if (sliderImg) sliderImg.style.opacity = "0";

    let url = movie.imdbId 
        ? `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let result = movie.imdbId ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            const backdropLink = result.backdrop_path ? BACKDROP_BASE + result.backdrop_path : "";
            const posterLink = result.poster_path ? POSTER_BASE + result.poster_path : "";

            setTimeout(() => {
                if (backdropLink && sliderBg) sliderBg.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.5), #121212), url('${backdropLink}')`;
                if (sliderTitle) sliderTitle.innerText = movie.title;
                if (movieRating) {
                    const rating = result.vote_average ? result.vote_average.toFixed(1) : "N/A";
                    movieRating.innerHTML = `<i class="fas fa-star" style="color:#f5c518"></i> ${rating}`;
                }
                if (playBtn) playBtn.href = movie.link;

                if (posterLink && sliderImg) {
                    const imgPreloader = new Image();
                    imgPreloader.src = posterLink;
                    imgPreloader.onload = () => {
                        sliderImg.src = posterLink;
                        sliderImg.style.opacity = "1";
                    };
                } else if (sliderImg) {
                    sliderImg.style.opacity = "1";
                }
            }, 400); 
        }
    } catch (err) {
        if (sliderImg) sliderImg.style.opacity = "1"; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    refreshMovieData();

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

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    if (movieData.length > 0) {
        updateSlider();
        setInterval(updateSlider, 7000);
    }

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
});
