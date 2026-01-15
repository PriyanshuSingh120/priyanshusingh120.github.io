const movies = {
    "2": { title: "Free Birds", link: "https://prigames.netlify.app/insider/2.html" },
    "3idiots": { title: "3 Idiots", link: "https://prigames.netlify.app/insider/3idiots.html" },
    "bahubali": { title: "Bahubali", link: "https://prigames.netlify.app/insider/Bahubali.html" },
    "despicable4": { title: "Despicable Me 4", link: "https://prigames.netlify.app/insider/Despicable4.html" },
    "dhurandhar": { title: "Dhurandhar", link: "https://prigames.netlify.app/insider/Dhurandhar.html" },
    "enemy": { title: "Enemy", link: "https://prigames.netlify.app/insider/Enemy.html" },
    "ferdinand": { title: "Ferdinand", link: "https://prigames.netlify.app/insider/Ferdinand.html" },
    "iceage": { title: "Ice Age", link: "https://prigames.netlify.app/insider/Iceage.html" },
    "idlikadai": { title: "Idli Kadai", link: "https://prigames.netlify.app/insider/Idlikadai.html" },
    "kaalidhar": { title: "Kaalidhar Laapata", link: "https://prigames.netlify.app/insider/Kaalidhar%20Laapata.html" },
    "kadaram": { title: "Kadaram Kondan", link: "https://prigames.netlify.app/insider/Kadaram.html" },
    "kanata": { title: "Kantara", link: "https://prigames.netlify.app/insider/Kanata.html" },
    "kishkindhapuri": { title: "Kishkindhapuri", link: "https://prigames.netlify.app/insider/Kishkindhapuri.html" },
    "kuruchetra": { title: "Kuruchetra", link: "https://prigames.netlify.app/insider/Kuruchetra.html" },
    "padakkalam": { title: "Padakkalam", link: "https://prigames.netlify.app/insider/Padakkalam.html" },
    "saiyara": { title: "Saiyara", link: "https://prigames.netlify.app/insider/Saiyara.html" },
    "doraemon2": { title: "Stand By Me Doraemon 2", link: "https://prigames.netlify.app/insider/Stand%20By%20me%20Doremon%202.html" },
    "texas-chainsaw": { title: "Texas Chainsaw", link: "https://prigames.netlify.app/insider/Texas%20Chainsaw.html" },
    "thamma": { title: "Thamma", link: "https://prigames.netlify.app/insider/Thamma.html" },
    "vash2": { title: "Vash 2", link: "https://prigames.netlify.app/insider/Vash2.html" },
    "walle": { title: "Wall-E", link: "https://prigames.netlify.app/insider/Walle.html" },
    "ajey": { title: "Ajey", link: "https://prigames.netlify.app/insider/ajey.html" },
    "akhanda2": { title: "Akhanda 2", link: "https://prigames.netlify.app/insider/akhanda2.html" },
    "avatarfaa": { title: "Avatar: Fire And Ash", link: "https://prigames.netlify.app/insider/avatarfaa.html" },
    "babyjohn": { title: "Baby John", link: "https://prigames.netlify.app/insider/babyJohn.html" },
    "badguy2": { title: "The Bad Guys 2", link: "https://prigames.netlify.app/insider/badguy2.html" },
    "beast": { title: "Beast", link: "https://prigames.netlify.app/insider/beast.html" },
    "bengalfiles": { title: "The Bengal Files", link: "https://prigames.netlify.app/insider/bengalfiles.html" },
    "bomb": { title: "Bomb", link: "https://prigames.netlify.app/insider/bomb.html" },
    "chhava": { title: "Chhava", link: "https://prigames.netlify.app/insider/chhava.html" },
    "chhichhore": { title: "Chhichhore", link: "https://prigames.netlify.app/insider/chhichhore.html" },
    "chidiya": { title: "Chidiya", link: "https://prigames.netlify.app/insider/chidiya.html" },
    "cuttputlli": { title: "Cuttputlli", link: "https://prigames.netlify.app/insider/cuttputlli.html" },
    "dhol": { title: "Dhol", link: "https://prigames.netlify.app/insider/dhol.html" },
    "ekdiwanekidiwaniyat": { title: "Ek Deewane Ki Deewaniyat", link: "https://prigames.netlify.app/insider/ekdiwanekidiwaniyat.html" },
    "elio": { title: "Elio", link: "https://prigames.netlify.app/insider/elio.html" },
    "finaldestination": { title: "The Final Destination", link: "https://prigames.netlify.app/insider/finaldestination.html" },
    "goat": { title: "The Greatest Of All Time", link: "https://prigames.netlify.app/insider/goat.html" },
    "haq": { title: "Haq", link: "https://prigames.netlify.app/insider/haq.html" },
    "interstallar": { title: "Interstellar", link: "https://prigames.netlify.app/insider/interstallar.html" },
    "it": { title: "IT", link: "https://prigames.netlify.app/insider/it.html" },
    "jananayagan": { title: "Jana Nayagan", link: "https://prigames.netlify.app/insider/jananayagan.html" },
    "jester": { title: "The Jester", link: "https://prigames.netlify.app/insider/jester.html" },
    "johnyenglish": { title: "Johnny English", link: "https://prigames.netlify.app/insider/johnyenglish.html" },
    "jollyllb3": { title: "Jolly LLB 3", link: "https://prigames.netlify.app/insider/jollyllb3.html" },
    "kashmirfiles": { title: "The Kashmir Files", link: "https://prigames.netlify.app/insider/kashmirfiles.html" },
    "kiskis": { title: "Kis Kis Ko Pyar Karu 2", link: "https://prigames.netlify.app/insider/kiskiskopyarkaru2.html" },
    "kungfupanda": { title: "Kung Fu Panda", link: "https://prigames.netlify.app/insider/kungfupanda.html" },
    "leo": { title: "Leo", link: "https://prigames.netlify.app/insider/leo.html" },
    "madagascar": { title: "Madagascar", link: "https://prigames.netlify.app/insider/madagascar.html" },
    "mahavtar": { title: "Mahavtar Narsimha", link: "https://prigames.netlify.app/insider/mahavtar.html" },
    "memories": { title: "Memories Of Murder", link: "https://prigames.netlify.app/insider/memoriesofmurder.html" },
    "msd": { title: "MS Dhoni", link: "https://prigames.netlify.app/insider/msd.html" },
    "nezha": { title: "Ne Zha", link: "https://prigames.netlify.app/insider/nezha.html" },
    "og": { title: "They Call Him OG", link: "https://prigames.netlify.app/insider/og.html" },
    "pravin": { title: "Kaun Pravin Tambe", link: "https://prigames.netlify.app/insider/pravintambe.html" },
    "pushinboots": { title: "Puss In Boots", link: "https://prigames.netlify.app/insider/pushinboots.html" },
    "raid": { title: "Raid", link: "https://prigames.netlify.app/insider/raid.html" },
    "raid2": { title: "Raid 2", link: "https://prigames.netlify.app/insider/raid2.html" },
    "ratatouille": { title: "Ratatouille", link: "https://prigames.netlify.app/insider/ratatouille.html" },
    "salimohabbat": { title: "Saali Mohabbat", link: "https://prigames.netlify.app/insider/salimohabbat.html" },
    "stephen": { title: "Stephen", link: "https://prigames.netlify.app/insider/stephen.html" },
    "strikingrescue": { title: "Striking Rescue", link: "https://prigames.netlify.app/insider/strikingrescue.html" },
    "teesmaarkhan": { title: "Tees Maar Khan", link: "https://prigames.netlify.app/insider/teesmaarkhan.html" },
    "theboy": { title: "The Boy", link: "https://prigames.netlify.app/insider/theboy.html" },
    "tholu": { title: "Tholu Bommalata", link: "https://prigames.netlify.app/insider/tholu.html" },
    "tomandjerry": { title: "Tom And Jerry", link: "https://prigames.netlify.app/insider/tomandjerry.html" },
    "transformer": { title: "Transformers", link: "https://prigames.netlify.app/insider/transformer.html" },
    "udaipur": { title: "Udaipur Files", link: "https://prigames.netlify.app/insider/udaipur.html" },
    "v": { title: "V", link: "https://prigames.netlify.app/insider/v.html" },
    "vanvaas": { title: "Vanvaas", link: "https://prigames.netlify.app/insider/vanvaas.html" },
    "vash": { title: "Vash", link: "https://prigames.netlify.app/insider/vash.html" },
    "war2": { title: "War 2", link: "https://prigames.netlify.app/insider/war2.html" },
    "wildrobot": { title: "The Wild Robot", link: "https://prigames.netlify.app/insider/wildrobot.html" },
    "zootopia": { title: "Zootopia", link: "https://prigames.netlify.app/insider/zootopia.html" },
    "zootopia2": { title: "Zootopia 2", link: "https://prigames.netlify.app/insider/zootopia2.html" }
};

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


