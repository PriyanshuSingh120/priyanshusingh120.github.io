// 1. Move these to the TOP (Global Scope)
const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7'; 
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"; 
let movieData = []; // This MUST be outside

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- Collect and Randomize Movies ---
    const movieCards = document.querySelectorAll('.movie-link');
    movieData = Array.from(movieCards).map(card => {
        return {
            link: card.getAttribute('href'),
            title: card.querySelector('h3').innerText.trim(),
            imdbId: card.getAttribute('data-id'), 
            searchTitle: card.querySelector('h3').innerText.replace(/\[.*?\]/g, '').trim()
        };
    });

    // START THE SLIDER
    if (movieData.length > 0) {
        updateSlider(); // Start first one immediately
        setInterval(updateSlider, 6000); // Change every 6 seconds
    }

    // --- Search Logic ---
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase();
            document.querySelectorAll('.movie-link').forEach(link => {
                const isMatch = link.textContent.toLowerCase().includes(term);
                link.style.display = isMatch ? '' : 'none';
            });
        });
    }
});


async function updateSlider() {
    if (movieData.length === 0) return;

    const sliderImg = document.getElementById('sliderImg');
    const sliderBg = document.getElementById('sliderBg');

    sliderImg.style.opacity = "0";


    const movie = movieData[Math.floor(Math.random() * movieData.length)];

    let url = movie.imdbId 
        ? `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        : `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.searchTitle)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let result = movie.imdbId ? data.movie_results[0] : data.results[0];

        if (result) {
            const backdropLink = result.backdrop_path ? BACKDROP_BASE + result.backdrop_path : "";
            const posterLink = result.poster_path ? POSTER_BASE + result.poster_path : "";

            setTimeout(() => {
                if (backdropLink) sliderBg.style.backgroundImage = `url('${backdropLink}')`;
                if (posterLink) sliderImg.src = posterLink;
                
                document.getElementById('sliderTitle').innerText = movie.title;
                document.getElementById('movieRating').innerHTML = `⭐ Rating: ${result.vote_average.toFixed(1)}`;
                document.getElementById('playBtn').href = movie.link;
                const imgPreloader = new Image();
                imgPreloader.src = posterLink;
                imgPreloader.onload = () => {
                    sliderImg.src = posterLink;
                    sliderImg.style.opacity = "1";
                };

                // 3. FADE BACK IN
                sliderImg.style.opacity = "1";
                // sliderBg.style.opacity = "1";
            }, 400); // This matches the 0.4s in your CSS
        }
    } catch (err) {
        console.error("Animation Error:", err);
        sliderImg.style.opacity = "1"; // Ensure it doesn't stay invisible
    }
}


document.querySelectorAll('.movie-link').forEach(link => {
    const tmdbId = link.getAttribute('data-id');
    const currentHref = link.getAttribute('href');
    

    if (tmdbId && !currentHref.includes('&tmdb=')) {
        link.setAttribute('href', `${currentHref}&tmdb=${tmdbId}`);
    }
});