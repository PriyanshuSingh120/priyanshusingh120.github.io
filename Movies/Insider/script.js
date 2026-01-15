const movieData = [
        { title: "Avatar: Fire And Ash", link: "Insider/avatarfaa.html", img: "https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", tags: "Action | Thriller | Sci-Fi | 2025" },
        { title: "Chhava", link: "Insider/chhava.html", img: "https://image.tmdb.org/t/p/w500/9F4lPRLjfBjsu0zjWNOZQMa8a4V.jpg", tags: "History| Thriller | Action | 2025" },
        { title: "Jana Nayagan", link: "Insider/jananayagan.html", img: "https://cdn.district.in/movies-assets/images/cinema/jana--6c8caf60-dbdd-11f0-a680-332b345d0f23.jpg", tags: "Action | Adventure | 2026" },
        { title: "Beast", link: "Insider/beast.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86juoHqNu02UX1Zg_bnnd4GlN7T847IC6Z5ohKJA9GX-xxSUTWDdIGeU&s=10", tags: "Action | Comedy | 2022" },
        { title: "[18+] Game Of Thrones S3", link: "episodes/got3.html", img: "https://upload.wikimedia.org/wikipedia/en/1/1d/Game_of_Thrones_Season_3.jpg", tags: "Action | Drama | 2013" },
        { title: "[18+] Game Of Thrones S2", link: "episodes/got2.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcc4myHHLydYJrshVYmbcZMq-KgKTzHiBO9C1gETAu93BTTxxiA57dkk&s=10", tags: "Action | Drama | 2012" },
        { title: "[18+] Game Of Thrones S1", link: "episodes/got1.html", img: "https://i.pinimg.com/736x/cb/13/3d/cb133d3ccd5dd67463513d892173753c.jpg", tags: "Action | Drama | 2011" },
        { title: "Kis Kis Ko Pyar Karu 2", link: "Insider/kiskiskopyarkaru2.html", img: "https://m.media-amazon.com/images/M/MV5BOTJkZDAxNTUtNGZhYy00Mjg5LTlhZTctZDQ3MjRhODRmYzI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", tags: "Comedy | Drama | 2025" },
        { title: "Dhurandhar", link: "Insider/dhurandhar.html", img: "https://m.media-amazon.com/images/M/MV5BMTNmNjM0OTktNmQ5NC00MWY1LWE4MDEtYWM0MjU4M2U0NTdiXkEyXkFqcGc@._V1_.jpg", tags: "Action | Thriller | 2025" },
        { title: "The Family Man 3", link: "episodes/familyman3.html", img: "https://catimages.org/images/2025/11/21/The-Family-Man-S03-Hindi-HDRip-ALL-Episodes.jpg", tags: "Action | Crime | 2025" },
        { title: "Padakkalam", link: "Insider/padakkalam.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_PBYt7QTtcJ-FhDCqHiDd84_lw2bFve8I_jqPLx-m_asz7YLX80ALs2E&s=10", tags: "Drama | Comedy | 2025" },
        { title: "The Final Destination", link: "Insider/finaldestination.html", img: "https://image.tmdb.org/t/p/w500/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg", tags: "Action | Horror | 2025" },
        { title: "Wall-E", link: "Insider/walle.html", img: "https://upload.wikimedia.org/wikipedia/en/4/4c/WALL-E_poster.jpg", tags: "Animated | Adventure | 2008" },
        { title: "Panchayat Season 1", link: "episodes/panchayats1.html", img: "https://image.tmdb.org/t/p/w500/hmjIgLSh2bVcHDQqQ0f0xeen24x.jpg", tags: "Drama | Comedy | 2020" },
        { title: "Panchayat Season 2", link: "episodes/panchayats2.html", img: "https://image.tmdb.org/t/p/w500/gRKDEpUPd2pp2msmwdgEW34V0SL.jpg", tags: "Drama | Comedy | 2022" },
        { title: "Panchayat Season 3", link: "episodes/panchayats3.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnHIyZn59WEBrdmnjj6XQIchRvDPV2HWvdRWpbgDWOwalJzrKAcF-DkEh&s=10", tags: "Drama | Comedy | 2024" },
        { title: "Tees Maar Khan", link: "Insider/teesmaarkhan.html", img: "https://m.media-amazon.com/images/M/MV5BYjJiZmZkZGYtYjA1OC00MjRkLWFlYTgtYjM4ODBlYWI1MjQwXkEyXkFqcGc@._V1_.jpg", tags: "Action | Drama | 2022" },
        { title: "Transformers", link: "Insider/transformer.html", img: "https://m.media-amazon.com/images/M/MV5BZWI1ZDY1YTQtMjRkNy00ZDZhLWE3OTItMTIwNzliY2Y1MTZhXkEyXkFqcGc@._V1_.jpg", tags: "Animated | Action | 2024" },
        { title: "The Bengal Files", link: "Insider/bengalfiles.html", img: "https://m.media-amazon.com/images/M/MV5BM2ViMGI2NmYtNmIyYS00MDA1LTg2MTgtMjY2ODJhYTllNWRhXkEyXkFqcGc@._V1_.jpg", tags: "History | Horror | 2025" },
        { title: "Bomb", link: "Insider/bomb.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrAQUy4_NjW-qXq0i7b1y9T7Jr71YPige7_KdDPvWBlfnzaz0Oi-8jTY&s=10", tags: "Adventure | Comedy | 2025" },
        { title: "Chhichhore", link: "Insider/chhichhore.html", img: "https://m.media-amazon.com/images/M/MV5BMjFkYThiNDMtMmFhYS00ZjQ5LWJjZjMtZmQ3ODAxYmIwM2RlXkEyXkFqcGc@._V1_.jpg", tags: "Comedy | Drama | 2019" },
        { title: "Akhanda 2", link: "Insider/akhanda2.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SooyoLyOkvEgwlLQt8gDEgnVfZLul3k9NoTpTrk8sYWieHdkE2GR8tI&s=10", tags: "Action | Drama | 2025" },
        { title: "3 Idiots", link: "Insider/3idiots.html", img: "https://m.media-amazon.com/images/I/81TeJPHjP-L._AC_UF1000,1000_QL80_.jpg", tags: "Comedy | Drama | 2009" },
        { title: "The Kashmir Files", link: "Insider/kashmirfiles.html", img: "https://m.media-amazon.com/images/M/MV5BYTUwZTNjY2MtNmRjOC00YmI1LThlNWUtZTFkMDgzNTc5ODAwXkEyXkFqcGc@._V1_.jpg", tags: "History | Drama | 2025" },
        { title: "Kaun Praveen Tambe", link: "Insider/pravintambe.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jRvsYLBHQiOq0oiH4QHgOomTQfp213ym7jgzmxJxdF2OD7geyy89t0cO&s=10", tags: "Sports | Biography | 2022" },
        { title: "Stephen", link: "Insider/stephen.html", img: "https://m.media-amazon.com/images/M/MV5BMTdiOTNhNjItMzk3ZC00YTBlLWE2YjQtZDQ4ZjYyOWNjZjA4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", tags: "Action | Horror | 2025" },
        { title: "Memories Of Murder", link: "Insider/memoriesofmurder.html", img: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p89594_p_v8_ag.jpg", tags: "Crime | Mystery | 2003" },
        { title: "Vanvaas", link: "Insider/vanvaas.html", img: "https://images.justwatch.com/poster/323472518/s718/vanvaas.jpg", tags: "Family | Drama | 2024" },
        { title: "Saali Mohabbat", link: "Insider/salimohabbat.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhf_bUrTITA4rlncGcv7Yn8iJWJ_QZ65mDmaFnOwTr0OQiIpG0fDg0Trj&s=10", tags: "Crime | Thriller | 2025" },
        { title: "IT", link: "Insider/it.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50mRvA5Tb9MHlM4iesO23IQmsM3_EY3YaRhcuTUo4BXkW0DSeXTAbGkk&s=10", tags: "Horror | Thriller | 2017" },
        { title: "Cuttputlli", link: "Insider/cuttputlli.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zMxl8JPG8OH_SCEaoNeKPzmFDqXjNG1G86Chgauf-d_ODm5SvmvK8YNt&s=10", tags: "Crime | Suspense | 2022" },
        { title: "UdaiPur Files", link: "Insider/udaipur.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9j0YPFQWnZQ9EQuwPg-fmmUWplio8H1JwhuQgMq2s6V9DZv9uUFhH0qi&s=10", tags: "Action | Crime | 2025" },
        { title: "They Call Him OG", link: "Insider/og.html", img: "https://m.media-amazon.com/images/M/MV5BM2IwMmZmZjYtZTQzMi00MWNlLWFlZTUtNTI4ZDdhZWE0OTFmXkEyXkFqcGc@._V1_.jpg", tags: "Action | Crime | 2025" },
        { title: "Madagascar", link: "Insider/madagascar.html", img: "https://upload.wikimedia.org/wikipedia/en/3/36/Madagascar_Theatrical_Poster.jpg", tags: "Animated | Comedy | 2005" },
        { title: "Despicable 4", link: "Insider/despicable4.html", img: "https://m.media-amazon.com/images/M/MV5BNzY0ZTlhYzgtOTgzZC00ZTg2LTk4NTEtZDllM2E2NGE5Njg2XkEyXkFqcGc@._V1_.jpg", tags: "Animated | Comedy | 2024" },
        { title: "Stranger Things 5", link: "episodes/stranger5.html", img: "https://image.tmdb.org/t/p/w500/AaLrOh33YLkK1WLEB8Uml7FL8fm.jpg", tags: "Sci-Fi | Mystery | 2025" },
        { title: "Thamma", link: "Insider/thamma.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNTel1Jb41WgqCGnOBv-8n6f_z0UfhMsL_dlyXqnE9Z-6Q6Phx5PzjmU&s=10", tags: "Horror | Comedy | 2025" },
        { title: "Ratatouille", link: "Insider/ratatouille.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnPmqAEdTgVyXk6jr93TfwiUzkAEyQSueyxLN7Z8eYaNmKlXBrWv2wW8&s=10", tags: "Animated | Funny | 2007" },
        { title: "Ne ZHA", link: "Insider/nezha.html", img: "https://m.media-amazon.com/images/S/pv-target-images/29f1a9e3bb05411727c8327813a1c58c928e780338c4f1de55936b67780d8572.jpg", tags: "Animated | Action | 2019" },
        { title: "Raid 2", link: "Insider/raid2.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSt3lM5lf1ze5Yx8nw1IOGK72HxXEWzSNfEJqdugPMHyD94hEVvHR5Hfxm&s=10", tags: "Action | Crime | 2025" },
        { title: "The Wild Robot", link: "Insider/wildrobot.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRDKmZfWky_Has4nb59nxC6Ta6Wlk_JFRraBgx4z0NaelG0cLseiInnI&s=10", tags: "Animated | Sci-Fi | 2024" },
        { title: "MS Dhoni", link: "Insider/msd.html", img: "https://pix1.wapkizfile.info/download/7e07118c9ad8223a2d1d005fd3fdc96e/filmy4wap+wapkizs+com/M-S-Dhoni-The-Untold-Story-2016-Bollywood-Hindi-Full-Movie-BluRay-HD-ESub-(filmyfly.observer).jpg", tags: "Sports | Story | 2016" },
        { title: "Leo", link: "Insider/leo.html", img: "https://upload.wikimedia.org/wikipedia/en/7/75/Leo_%282023_Indian_film%29.jpg", tags: "Action | Thriller | 2023" },
        { title: "Zootopia 2", link: "Insider/zootopia2.html", img: "https://images.justwatch.com/poster/336822920/s718/zootopia-2.jpg", tags: "Animated | Mystery | 2025" },
        { title: "War 2", link: "Insider/war2.html", img: "https://prigames.netlify.app/movies/images/images/war2.jpg", tags: "Action | Thriller | 2025" },
        { title: "Bahubali: The Epic", link: "Insider/Bahubali.html", img: "https://prigames.netlify.app/movies/images/images/2.jpg", tags: "War | Action | 2025" },
        { title: "Free Birds", link: "Insider/2.html", img: "https://prigames.netlify.app/movies/images/images/1.jpg", tags: "Animated | Comedy | 2024" }
    ];

    function generateCards() {
        const grid = document.getElementById('recommendationGrid');
        if(!grid) return;
        
        // Shuffle the database so the user sees different movies every time
        const shuffled = movieData.sort(() => 0.5 - Math.random());

        // Limit to 12 movies so the page isn't too long (optional)
        const displayMovies = shuffled.slice(0, 15);

        displayMovies.forEach(movie => {
            const cardHTML = `
                <a href="${movie.link}" class="movie-link">
                    <div class="movie-card">
                        <div class="movie-poster-container">
                            <img src="${movie.img}" alt="${movie.title}" class="movie-poster" loading="lazy">
                        </div>
                        <div class="movie-info">
                            <h3>${movie.title}</h3>
                            <p>${movie.tags}</p>
                        </div>
                    </div>
                </a>
            `;
            grid.innerHTML += cardHTML;
        });
    }


    window.onload = generateCards;
