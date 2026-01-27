const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
const DISCUSSION_GROUP_ID = '-1003555701279';
const TELEGRAM_TOKEN = '7287243554:AAHa43wD_V2roGLep1aQgKHn0vqXHYlFp-M';

let movieData = []; 

/**
 * Scans the HTML to build the local database
 */
function refreshMovieData() {
    const movieCards = document.querySelectorAll('.movie-link');
    movieData = Array.from(movieCards).map(card => {
        const tmdbId = card.getAttribute('data-id');
        const title = card.querySelector('h3').innerText.trim();
        return {
            element: card,
            id: tmdbId,
            title: title,
            cleanTitle: title.toLowerCase().replace(/season \d+/g, '').trim(),
            link: card.getAttribute('href')
        };
    });
}

/**
 * Fetches TMDB Trending and matches with local library
 */
async function loadTop10() {
    const top10Grid = document.getElementById('top10Grid');
    if (!top10Grid) return;

    try {
        // 1. Fetch Trending from TMDB
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        const trendingList = data.results;

        let finalTop10 = [];

        // 2. Match Trending with your site content
        trendingList.forEach(trend => {
            const trendName = (trend.title || trend.name).toLowerCase();
            const match = movieData.find(m => 
                (m.id && m.id == trend.id) || m.cleanTitle === trendName
            );
            if (match && !finalTop10.includes(match)) finalTop10.push(match);
        });

        // 3. Fill remaining slots with your latest uploads if < 10 matches
        if (finalTop10.length < 10) {
            const latest = movieData.slice(0, 15); // Grab first few from sorted grid
            latest.forEach(m => {
                if (finalTop10.length < 10 && !finalTop10.includes(m)) finalTop10.push(m);
            });
        }

        // 4. Render with Numbers
        top10Grid.innerHTML = "";
        finalTop10.slice(0, 10).forEach((movie, index) => {
            const clone = movie.element.cloneNode(true);
            clone.className = 'top10-card';
            
            // Create the big number
            const num = document.createElement('div');
            num.className = 'rank-num';
            num.innerText = index + 1;
            
            clone.appendChild(num);
            top10Grid.appendChild(clone);
        });

    } catch (e) {
        console.error("Top 10 failed to load", e);
    }
}

// --- Slider & Search Logic ---
async function updateSlider() {
    const movie = movieData[Math.floor(Math.random() * Math.min(movieData.length, 20))];
    if (!movie) return;

    const sliderBg = document.getElementById('sliderBg');
    const sliderTitle = document.getElementById('sliderTitle');
    const movieRating = document.getElementById('movieRating');
    const playBtn = document.getElementById('playBtn');
    const sliderImg = document.getElementById('sliderImg');

    let url = movie.id 
        ? `https://api.themoviedb.org/3/find/${movie.id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = movie.id ? (data.movie_results?.[0] || data.tv_results?.[0]) : data.results?.[0];

        if (result) {
            sliderBg.style.backgroundImage = `linear-gradient(to bottom, transparent, #121212), url('${BACKDROP_BASE + result.backdrop_path}')`;
            sliderTitle.innerText = movie.title;
            movieRating.innerHTML = `⭐ ${result.vote_average.toFixed(1)}`;
            playBtn.href = movie.link;
            sliderImg.src = POSTER_BASE + result.poster_path;
            sliderImg.style.opacity = "1";
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Refresh
    refreshMovieData();

    // 2. Sort main grid (Newest First)
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

    // 3. Load Top 10 based on Trending
    loadTop10();

    // 4. Start Slider
    if (movieData.length > 0) {
        updateSlider();
        setInterval(updateSlider, 8000);
    }

    // 5. Search Logic
    document.querySelectorAll('.search-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('#movieGrid .movie-link').forEach(link => {
                link.style.display = link.innerText.toLowerCase().includes(term) ? '' : 'none';
            });
        });
    });
});
