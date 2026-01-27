const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 

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
    const topLimit = Math.min(movieData.length, 20);
    const trendingMovies = movieData.slice(0, topLimit);
    const olderMovies = movieData.slice(topLimit);
    const pickFromTrending = Math.random() < 0.7 || olderMovies.length === 0;

    return pickFromTrending 
        ? trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
        : olderMovies[Math.floor(Math.random() * olderMovies.length)];
}

async function sendRequest() {
    // Finds the search input that actually has text
    const searchInputs = document.querySelectorAll('.search-input');
    let movieName = "";
    searchInputs.forEach(input => {
        if(input.value.trim() !== "") movieName = input.value.trim();
    });

    if (!movieName) return;

    const btn = document.getElementById('reqBtn');
    const requestBox = document.getElementById('requestBox');
    
    btn.innerText = "Sending...";
    btn.disabled = true;

    // We use HTML parse_mode instead of Markdown to avoid character errors with "_"
    const message = `<b>📥 NEW MOVIE REQUEST</b>\n\n` +
                    `<b>🎬 Movie:</b> ${movieName}\n` +
                    `<b>👤 Status:</b> User Requested\n\n` +
                    `Hey admin, someone is looking for this on CineView!`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: DISCUSSION_GROUP_ID,
                text: message,
                parse_mode: 'HTML' // Changed from Markdown to HTML for stability
            })
        });

        const data = await response.json();

        if (data.ok) {
            // Play a success sound (optional - using a built-in browser beep if you want)
            requestBox.innerHTML = `
                <h3 style="color: #00ff00;">✅ Request Sent!</h3>
                <p>We've sent your request for <b>${movieName}</b> to our team.</p>
                <p><a href="https://t.me/prigames_chat" target="_blank" style="color: #0088cc; text-decoration: none; font-weight: bold;">Join Discussion Group to track updates →</a></p>
            `;
        } else {
            throw new Error(data.description);
        }
    } catch (e) {
        console.error("Request failed:", e);
        btn.innerText = "Retry Request";
        btn.disabled = false;
        // Use a simple message box instead of alert
        const errorMsg = document.createElement('p');
        errorMsg.style.color = "red";
        errorMsg.innerText = "Failed to send. Please try again.";
        requestBox.appendChild(errorMsg);
    }
}

function handleSearch() {
    const searchInput = event.target;
    const requestBox = document.getElementById('requestBox');
    const term = searchInput.value.toLowerCase();
    let foundCount = 0;

    document.querySelectorAll('.movie-link').forEach(link => {
        const isMatch = link.textContent.toLowerCase().includes(term);
        link.style.display = isMatch ? '' : 'none';
        if (isMatch) foundCount++;
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
                if (backdropLink && sliderBg) sliderBg.style.backgroundImage = `url('${backdropLink}')`;
                if (sliderTitle) sliderTitle.innerText = movie.title;
                if (movieRating) {
                    const rating = result.vote_average ? result.vote_average.toFixed(1) : "N/A";
                    movieRating.innerHTML = `⭐ Rating: ${rating}`;
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
        setInterval(updateSlider, 6000);
    }

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
});
