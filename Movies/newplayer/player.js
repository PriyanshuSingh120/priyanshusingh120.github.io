const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7';

// --- YOUR DATABASE ---
const movieDatabase = {
    // --- SERIES DATABASE ADDITION ---
    "familyman3": { 
        "title": "The Family Man Season 3", 
        "img": "https://catimages.org/images/2025/11/21/The-Family-Man-S03-Hindi-HDRip-ALL-Episodes.jpg",
        "tmdb": "95440",
        "episodes": ["https://short.icu/OzcIkav01","https://short.icu/hvs4iLHuM","https://short.icu/A3S4gqYx4","https://short.icu/u42XsM7xb","https://short.icu/d1uqiv21f","https://short.icu/UDEuAwdmI","https://short.icu/LhM_9VDym"]
    },
    "pushpa-the-rise": { "title": "Pushpa: The Rise", "src": "https://short.icu/BFqd9jO7g", "year": "2021", "img": "https://image.tmdb.org/t/p/w500/h6Pd89ngvl9quPVsx3KoJlQsvk9.jpg" },
    "got1": { 
        "title": "Game Of Thrones Season 1", 
        "img": "https://i.pinimg.com/736x/cb/13/3d/cb133d3ccd5dd67463513d892173753c.jpg",
        "tmdb": "1399",
        "episodes": ["https://short.icu/h2B8qM3lG","https://short.icu/no_u3ua8-","https://short.icu/wIdcX5hFw","https://short.icu/taNL76E-D","https://short.icu/VROKYQ2Qi","https://short.icu/Z65Ic8gUl","https://short.icu/C2t7B60T6","https://short.icu/L7K7Bm4Ei","https://short.icu/sxCOYY6-z","https://short.icu/0izCNMFmG"]
    },
    "got2": { 
        "title": "Game Of Thrones Season 2", 
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcc4myHHLydYJrshVYmbcZMq-KgKTzHiBO9C1gETAu93BTTxxiA57dkk&s=10",
        "tmdb": "1399",
        "episodes": ["https://short.icu/iCoJ7LxST","https://short.icu/HDBdhe2r2","https://short.icu/KFfmh0oAX","https://short.icu/FPNbWnfQI","https://short.icu/nki1MkRAB6","https://short.icu/rsTXTuU1Qt","https://short.icu/jQ-ai9T6K","https://short.icu/yL89Eg2QV","https://short.icu/-RaIXDOaz","https://short.icu/KtwsCC_iV"]
    },
    "got3": { 
        "title": "Game Of Thrones Season 3", 
        "img": "https://upload.wikimedia.org/wikipedia/en/1/1d/Game_of_Thrones_Season_3.jpg",
        "tmdb": "1399",
        "episodes": ["https://short.icu/HWzUOfgpw","https://short.icu/X6F_qpnJn","https://short.icu/w33oywFGy","https://short.icu/MCy5_F8oA","https://short.icu/5mMZa1Jp8J","https://short.icu/EdcmsxTUS6","https://short.icu/BXK8RyCIX","https://short.icu/SzVEQFNmS","https://short.icu/vSRBxADZxe","https://short.icu/d-xFc6TKc"]
    },
    "kapils3": { 
        "title": "The Kapil Sharma Show Season 3", 
        "img": "https://catimages.org/images/2025/06/21/The-Great-Indian-Kapil-Show-2025-S03-HDHub4u.Ms.jpg",
        "tmdb": "254558",
        "episodes": ["https://short.icu/xVfDacuLX7","https://short.icu/uj4eBNozm","https://short.icu/0xsHh_sy0","https://short.icu/9sfprsaaj","https://short.icu/qfwY2Q1Is","https://short.icu/1zNYJWhqv","https://short.icu/RCLhytk2_"]
    },
    "panchayats1": { 
        "title": "Panchayat Season 1", 
        "img": "https://image.tmdb.org/t/p/w500/hmjIgLSh2bVcHDQqQ0f0xeen24x.jpg",
        "tmdb": "100147",
        "episodes": ["https://short.icu/k0yxHyLcD","https://short.icu/X4iK9DLrO","https://short.icu/IOhU7xfQx","https://short.icu/kD9Omk0qB","https://short.icu/DoLn2KrAp","https://short.icu/G0Ef-WA0r","https://short.icu/ZXDyvQaOP","https://short.icu/XrPdo8Lfh"]
    },
    "panchayats2": { 
        "title": "Panchayat Season 2", 
        "img": "https://image.tmdb.org/t/p/w500/gRKDEpUPd2pp2msmwdgEW34V0SL.jpg",
        "tmdb": "100147",
        "episodes": ["https://short.icu/DFMFBYw4O","https://short.icu/276sG4v3U","https://short.icu/aIWwkKsde","https://short.icu/UGi8ht-Jo","https://short.icu/jLoccqc_L","https://short.icu/7Gmq0saQg","https://short.icu/AY-YfajxG","https://short.icu/75cf0cYUH"]
    },
    "panchayats3": { 
        "title": "Panchayat Season 3", 
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnHIyZn59WEBrdmnjj6XQIchRvDPV2HWvdRWpbgDWOwalJzrKAcF-DkEh&s=10",
        "tmdb": "100147",
        "episodes": ["https://short.icu/-vTX_z3xn","https://short.icu/hhDMWIDB2o","https://short.icu/uiwMOHpiF","https://short.icu/57tVp9O_d","https://short.icu/npCKPiZtx","https://short.icu/n840f2I4Om","https://short.icu/DIuaDb7xL","https://short.icu/h6BegcHTn"]
    },
    "stranger1": { 
        "title": "Stranger Things Season 1", 
        "img": "https://upload.wikimedia.org/wikipedia/en/b/b1/Stranger_Things_season_1.jpg",
        "tmdb": "66732",
        "episodes": ["https://short.icu/dhm7Qju2Y","https://short.icu/-jIY7Q0Jd","https://short.icu/duBAiUxLr","https://short.icu/ZVdWUzMSQ","https://short.icu/NQUwO_Vcs","https://short.icu/oAO22IYtJ","https://short.icu/fvsycrib8","https://short.icu/qXYiBfIkc"]
    },
    "stranger2": { 
        "title": "Stranger Things Season 2", 
        "img": "https://rukminim2.flixcart.com/image/480/640/jnamvm80/poster/h/w/r/large-stranger-things-season-2-poster-a3-13-x-19-inches-original-imafay3m5fddv8pg.jpeg?q=90",
        "tmdb": "66732",
        "episodes": ["https://short.icu/Hv98JtXqP","https://short.icu/u7yaLWyeU","https://short.icu/qy98uByTu","https://short.icu/X3C7Hrkg4w","https://short.icu/4t7j9LcKS","https://short.icu/8j2Ka8G3f","https://short.icu/U29a48Pbp","https://short.icu/cjKqCFwtM","https://short.icu/59aHcRazI"]
    },
    "stranger3": { 
        "title": "Stranger Things Season 3", 
        "img": "https://images-cdn.ubuy.co.in/65f1068a040c0d18bb2bc623-netflix-stranger-things-season-3-one.jpg",
        "tmdb": "66732",
        "episodes": ["https://short.icu/PpRii_0c4","https://short.icu/KqhyEdjjP","https://short.icu/DYsqEF6x-","https://short.icu/hrQX01zqW","https://short.icu/LBVcRP5Be","https://short.icu/nXza7aCU0","https://short.icu/nnCAcMbVK","https://short.icu/T4fQjs7Hq"]
    },
    "stranger5": { 
        "title": "Stranger Things Season 5", 
        "img": "https://image.tmdb.org/t/p/w500/AaLrOh33YLkK1WLEB8Uml7FL8fm.jpg",
        "tmdb": "66732",
        "episodes": ["https://short.icu/RrBB6-79l","https://short.icu/YcwrZOAyz","https://short.icu/U8oxvfuW2","https://short.icu/pBvuStnhl"]
    },
    "3idiots": { "title": "3Idiots", "src": "https://short.icu/V550M_IBX", "year": "2009", "img": "https://m.media-amazon.com/images/I/81TeJPHjP-L._AC_UF1000,1000_QL80_.jpg" },
    "ajey": { "title": "Ajey: The Untold Story of a Yogi", "src": "https://short.icu/7IHRfjVYh", "year": "2024", "img": "https://upload.wikimedia.org/wikipedia/en/b/b7/Ajey-Poster.jpg" },
    "akhanda2": { "title": "Akhanda 2", "src": "https://short.icu/nmVnnZszs", "year": "2025", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SooyoLyOkvEgwlLQt8gDEgnVfZLul3k9NoTpTrk8sYWieHdkE2GR8tI&s=10" },
    "avatarfaa": { "title": "Avatar: Fire And Ash", "src": "https://short.icu/5K--e2ETQ", "year": "2025", "img": "https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    "babyjohn": { "title": "Baby John", "src": "https://short.icu/3Jyzu6nxg", "year": "2024", "img": "https://upload.wikimedia.org/wikipedia/en/2/29/Baby_John_%28title_card%29.jpg" },
    "badguy2": { "title": "The Bad Guys 2", "src": "https://short.icu/Sx2MGzBMN", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/5DJbIWxIotQYUnRrRGhSxjxmvye.jpg" },
    "bahubali": { "title": "Bahubali: The Epic", "src": "https://short.icu/W7nBMAmEU", "year": "2015", "img": "https://prigames.netlify.app/movies/images/2.jpg" },
    "beast": { "title": "Beast", "src": "https://short.icu/D7RA4p5IJ", "year": "2022", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86juoHqNu02UX1Zg_bnnd4GlN7T847IC6Z5ohKJA9GX-xxSUTWDdIGeU&s=10" },
    "bengalfiles": { "title": "The Bengal Files", "src": "https://short.icu/DR1jx5Krn", "year": "2024", "img": "https://m.media-amazon.com/images/M/MV5BM2ViMGI2NmYtNmIyYS00MDA1LTg2MTgtMjY2ODJhYTllNWRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    "bomb": { "title": "Bomb", "src": "https://short.icu/fbvoDeEHK", "year": "2024", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrAQUy4_NjW-qXq0i7b1y9T7Jr71YPige7_KdDPvWBlfnzaz0Oi-8jTY&s=10" },
    "chhava": { "title": "Chhava", "src": "https://short.icu/k1zmEDRH0", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/9F4lPRLjfBjsu0zjWNOZQMa8a4V.jpg" },
    "chhichhore": { "title": "Chhichhore", "src": "https://short.icu/pt5bNHwf_", "year": "2019", "img": "https://m.media-amazon.com/images/M/MV5BMjFkYThiNDMtMmFhYS00ZjQ5LWJjZjMtZmQ3ODAxYmIwM2RlXkEyXkFqcGc@._V1_.jpg" },
    "chidiya": { "title": "Chidiya", "src": "https://short.icu/ltcMJUUkW", "year": "2024", "img": "https://catimages.org/images/2025/11/12/Chidiya-2016-HDHub4u.Ms.jpg" },
    "cuttputlli": { "title": "Cuttputlli", "src": "https://short.icu/A_8QDqEIOv", "year": "2022", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zMxl8JPG8OH_SCEaoNeKPzmFDqXjNG1G86Chgauf-d_ODm5SvmvK8YNt&s=10" },
    "despicable4": { "title": "Despicable Me 4", "src": "https://short.icu/MlXMrR0vd", "year": "2024", "img": "https://m.media-amazon.com/images/M/MV5BNzY0ZTlhYzgtOTgzZC00ZTg2LTk4NTEtZDllM2E2NGE5Njg2XkEyXkFqcGc@._V1_.jpg" },
    "dhol": { "title": "Dhol", "src": "https://short.icu/yjR4wpIjj", "year": "2007", "img": "https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Dhol1.jpg/250px-Dhol1.jpg" },
    "ekdiwanekidiwaniyat": { "title": "Ek Deewane Ki Deewaniyat", "src": "https://short.icu/mT7S0woOR", "year": "2025", "img": "https://prigames.netlify.app/movies/images/16.jpg" },
    "elio": { "title": "Elio", "src": "https://short.icu/bVlKuxwS6", "year": "2025", "img": "https://image.tmdb.org/t/p/w400/w2ARwtc1zoh0pyfwmyhpZHwuXgK.jpg" },
    "enemy": { "title": "Enemy", "src": "https://short.icu/ZNj4md4uv4", "year": "2021", "img": "https://prigames.netlify.app/movies/images/3.jpg" },
    "ferdinand": { "title": "Ferdinand", "src": "https://short.icu/scPyaf-ML", "year": "2017", "img": "https://prigames.netlify.app/movies/images/4.jpg" },
    "finaldestination": { "title": "The Final Destination", "src": "https://short.icu/RzUsMNFwh", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg" },
    "goat": { "title": "The Greatest Of All Time", "src": "https://short.icu/MJYR2azA3", "year": "2024", "img": "https://prigames.netlify.app/movies/images/18.jpg" },
    "haq": { "title": "Haq", "src": "https://short.icu/jSykePxJJ", "year": "2024", "img": "https://catimages.org/images/2025/11/07/HAQ-2025-HDHub4u.Ms.jpg" },
    "iceage": { "title": "Ice Age", "src": "https://short.icu/rH53VwZtO", "year": "2002", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrg9dnUnh40xWuzfWR7k3V8WiB2_I55MTpihu9gq8tYywWZiDA4xkwMiGA&s=10" },
    "idlikadai": { "title": "Idli Kadai", "src": "https://short.icu/pqfA28SBkx", "year": "2025", "img": "https://prigames.netlify.app/movies/images/5.jpg" },
    "interstallar": { "title": "Interstellar", "src": "https://short.icu/QLElpjnf8", "year": "2014", "img": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
    "it": { "title": "IT", "src": "https://short.icu/b_2_gAfH8", "year": "2017", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50mRvA5Tb9MHlM4iesO23IQmsM3_EY3YaRhcuTUo4BXkW0DSeXTAbGkk&s=10" },
    "jester": { "title": "The Jester 2", "src": "https://short.icu/ZhLOxfemC", "year": "2023", "img": "https://prigames.netlify.app/movies/images/6.jpg" },
    "johnyenglish": { "title": "Johnny English", "src": "https://short.icu/o5_SzBsUr", "year": "2018", "img": "https://image.tmdb.org/t/p/w400/tCBxnZwLiY1BOKw3tH6AxHZdqPh.jpg" },
    "jollyllb3": { "title": "Jolly LLB 3", "src": "https://short.icu/6UJAPeNXp", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/bwRoU9p5GvjxgPfmIgsfcJ4ydng.jpg" },
    "kaalidhar-laapata": { "title": "Kaalidhar Laapata", "src": "https://short.icu/CixZbuDjj", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/a7ctu6C6f7tN87ve4HFDoELp7cH.jpg" },
    "kadaram": { "title": "Kadaram Kondan", "src": "https://short.icu/LhEIupaqA", "year": "2019", "img": "https://prigames.netlify.app/movies/images/7.jpg" },
    "kanata": { "title": "Kantara", "src": "https://short.icu/50cDs2ANa", "year": "2022", "img": "https://prigames.netlify.app/movies/images/8.jpg" },
    "kashmirfiles": { "title": "The Kashmir Files", "src": "https://short.icu/NeZaL_zgG", "year": "2022", "img": "https://m.media-amazon.com/images/M/MV5BYTUwZTNjY2MtNmRjOC00YmI1LThlNWUtZTFkMDgzNTc5ODAwXkEyXkFqcGc@._V1_.jpg" },
    "kishkindhapuri": { "title": "Kishkindhapuri", "src": "https://short.icu/G1-bPfZ9iN", "year": "2025", "img": "https://prigames.netlify.app/movies/images/9.jpg" },
    "kiskiskopyarkaru2": { "title": "Kis Kisko Pyaar Karoon 2", "src": "https://short.icu/2CimpUZoW", "year": "2025", "img": "https://m.media-amazon.com/images/M/MV5BOTJkZDAxNTUtNGZhYy00Mjg5LTlhZTctZDQ3MjRhODRmYzI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    "kungfupanda": { "title": "Kung Fu Panda", "src": "https://short.icu/MEjDHh08z", "year": "2008", "img": "https://catimages.org/images/2025/06/23/Kung.Fu.Panda.2008.jpg" },
    "kuruchetra": { "title": "Kuruchetra", "src": "https://short.icu/wnyLDUZ_U", "year": "2025", "img": "https://prigames.netlify.app/movies/images/10.jpg" },
    "leo": { "title": "Leo", "src": "https://short.icu/MdZ6aKsBP", "year": "2023", "img": "https://upload.wikimedia.org/wikipedia/en/7/75/Leo_%282023_Indian_film%29.jpg" },
    "madagascar": { "title": "Madagascar", "src": "https://short.icu/TxG57omyNYn", "year": "2005", "img": "https://upload.wikimedia.org/wikipedia/en/3/36/Madagascar_Theatrical_Poster.jpg" },
    "mahavtar": { "title": "Mahavtar Narsimha", "src": "https://short.icu/wnyLDUZ_U", "year": "2024", "img": "https://prigames.netlify.app/movies/images/11.jpg" },
    "memoriesofmurder": { "title": "Memories of Murder", "src": "https://short.icu/2QfE2wL_q", "year": "2003", "img": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p89594_p_v8_ag.jpg" },
    "msd": { "title": "MS Dhoni: The Untold Story", "src": "https://short.icu/rg6Bt52ku", "year": "2016", "img": "https://pix1.wapkizfile.info/download/7e07118c9ad8223a2d1d005fd3fdc96e/filmy4wap+wapkizs+com/M-S-Dhoni-The-Untold-Story-2016-Bollywood-Hindi-Full-Movie-BluRay-HD-ESub-(filmyfly.observer).jpg" },
    "nezha": { "title": "Ne Zha", "src": "https://short.icu/G1f59BLUr", "year": "2019", "img": "https://m.media-amazon.com/images/S/pv-target-images/29f1a9e3bb05411727c8327813a1c58c928e780338c4f1de55936b67780d8572.jpg" },
    "og": { "title": "They Call Him OG", "src": "https://short.icu/s9Yfqdc38", "year": "2025", "img": "https://m.media-amazon.com/images/M/MV5BM2IwMmZmZjYtZTQzMi00MWNlLWFlZTUtNTI4ZDdhZWE0OTFmXkEyXkFqcGc@._V1_.jpg" },
    "padakkalam": { "title": "Padakkalam", "src": "https://short.icu/bAiih2lxmQ", "year": "2024", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_PBYt7QTtcJ-FhDCqHiDd84_lw2bFve8I_jqPLx-m_asz7YLX80ALs2E&s=10" },
    "pravintambe": { "title": "Kaun Pravin Tambe", "src": "https://short.icu/WTa2sOemZ", "year": "2022", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jRvsYLBHQiOq0oiH4QHgOomTQfp213ym7jgzmxJxdF2OD7geyy89t0cO&s=10" },
    "pushinboots": { "title": "Puss in Boots", "src": "https://short.icu/yG8TgwG1n", "year": "2022", "img": "https://upload.wikimedia.org/wikipedia/en/7/78/Puss_in_Boots_The_Last_Wish_poster.jpg" },
    "raid": { "title": "Raid", "src": "https://short.icu/MNvF1Tcah", "year": "2018", "img": "https://m.media-amazon.com/images/M/MV5BZDcwMWZiYjgtYWE5Zi00NDk0LTkyMDctYzgzMzA4YTZlZjBlXkEyXkFqcGc@._V1_.jpg" },
    "raid2": { "title": "Raid 2", "src": "https://short.icu/gVlaDsDwIx", "year": "2025", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSt3lM5lf1ze5Yx8nw1IOGK72HxXEWzSNfEJqdugPMHyD94hEVvHR5Hfxm&s=10" },
    "ratatouille": { "title": "Ratatouille", "src": "https://short.icu/48Mz4uJEH0", "year": "2007", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnPmqAEdTgVyXk6jr93TfwiUzkAEyQSueyxLN7Z8eYaNmKlXBrWv2wW8&s=10" },
    "saiyara": { "title": "Saiyara", "src": "https://short.icu/ihBT4CEEG", "year": "2025", "img": "https://prigames.netlify.app/movies/images/17.jpg" },
    "salimohabbat": { "title": "Saali Mohabbat", "src": "https://short.icu/i6Yfs_xAI", "year": "2025", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhf_bUrTITA4rlncGcv7Yn8iJWJ_QZ65mDmaFnOwTr0OQiIpG0fDg0Trj&s=10" },
    "stand-by-me-doremon-2": { "title": "Stand By Me Doraemon 2", "src": "https://short.icu/DM1-dxLAK", "year": "2020", "img": "https://prigames.netlify.app/movies/images/12.jpg" },
    "stephen": { "title": "Stephen", "src": "https://short.icu/2LvjZPK7M", "year": "2024", "img": "https://m.media-amazon.com/images/M/MV5BMTdiOTNhNjItMzk3ZC00YTBlLWE2YjQtZDQ4ZjYyOWNjZjA4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    "strikingrescue": { "title": "Striking Rescue", "src": "https://short.icu/BHuq5Rp0C", "year": "2024", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eS6As9vD1v9dj49GMGk25nRQ6j0UqaTsRDYRr4h4dc63jSsF7iFf4cU&s=10" },
    "teesmaarkhan": { "title": "Tees Maar Khan", "src": "https://short.icu/6NpMbWcZx", "year": "2010", "img": "https://m.media-amazon.com/images/M/MV5BYjJiZmZkZGYtYjA1OC00MjRkLWFlYTgtYjM4ODBlYWI1MjQwXkEyXkFqcGc@._V1_.jpg" },
    "texas-chainsaw": { "title": "Texas Chainsaw", "src": "https://short.icu/nstC2-MBm", "year": "2013", "img": "https://prigames.netlify.app/movies/images/13.jpg" },
    "thamma": { "title": "Thamma", "src": "https://short.icu/KzjK4XScn", "year": "2025", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNTel1Jb41WgqCGnOBv-8n6f_z0UfhMsL_dlyXqnE9Z-6Q6Phx5PzjmU&s=10" },
    "theboy": { "title": "The Boy", "src": "https://short.icu/Vt5HcoHaO", "year": "2016", "img": "https://imgshare.info/images/2025/07/20/The-Boy-2016.jpg" },
    "tholu": { "title": "Tholu Bommalata", "src": "https://short.icu/tZkPvr3YG", "year": "2019", "img": "https://m.media-amazon.com/images/M/MV5BZTQ1MmE3MjgtN2E4ZC00MTNlLThlZWQtYjIzZjIxZjI1YTkxXkEyXkFqcGc@._V1_.jpg" },
    "tomandjerry": { "title": "Tom & Jerry", "src": "https://short.icu/3kJxY71MP", "year": "2021", "img": "https://imgshare.info/images/2025/08/11/Tom.and.Jerry.2021..jpg" },
    "transformer": { "title": "Transformers", "src": "https://short.icu/hdPkF6s5J", "year": "2024", "img": "https://m.media-amazon.com/images/M/MV5BZWI1ZDY1YTQtMjRkNy00ZDZhLWE3OTItMTIwNzliY2Y1MTZhXkEyXkFqcGc@._V1_.jpg" },
    "udaipur": { "title": "Udaipur Files", "src": "https://short.icu/1fufyTDBx", "year": "2024", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9j0YPFQWnZQ9EQuwPg-fmmUWplio8H1JwhuQgMq2s6V9DZv9uUFhH0qi&s=10" },
    "v": { "title": "V", "src": "https://short.icu/BPDUOSn2K", "year": "2020", "img": "https://upload.wikimedia.org/wikipedia/en/b/b5/V_%28film%29.jpg" },
    "vanvaas": { "title": "Vanvaas", "src": "https://short.icu/1ZjEprhN9", "year": "2024", "img": "https://images.justwatch.com/poster/323472518/s718/vanvaas.jpg" },
    "vash": { "title": "Vash", "src": "https://short.icu/tO1tpwyjS", "year": "2023", "img": "https://prigames.netlify.app/movies/images/14.jpg" },
    "vash2": { "title": "Vash Level 2", "src": "https://short.icu/zTUw_txMT", "year": "2025", "img": "https://prigames.netlify.app/movies/images/15.jpg" },
    "walle": { "title": "Wall-E", "src": "https://short.icu/7lElVPRJ2", "year": "2008", "img": "https://upload.wikimedia.org/wikipedia/en/4/4c/WALL-E_poster.jpg" },
    "war2": { "title": "War 2", "src": "https://short.icu/SaG_GCj5S", "year": "2025", "img": "https://prigames.netlify.app/movies/images/war2.jpg" },
    "wildrobot": { "title": "The Wild Robot", "src": "https://short.icu/gFViv8_Sw", "year": "2024", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRDKmZfWky_Has4nb59nxC6Ta6Wlk_JFRraBgx4z0NaelG0cLseiInnI&s=10" },
    "zootopia": { "title": "Zootopia", "src": "https://short.icu/yKobje7Xb", "year": "2016", "img": "https://catimages.org/images/2025/04/03/Zootopia.2016..jpg" },
    "zootopia2": { "title": "Zootopia 2", "src": "https://short.icu/gpH1bu08s", "year": "2025", "img": "https://images.justwatch.com/poster/336822920/s718/zootopia-2.jpg" },
    "raat-akeli-hai-the-bansal-murders": { "title": "Raat Akeli Hai - The Bansal Murders", "src": "https://short.icu/FYIdgZzZ7", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/8EpDSwnjMBc9dmTPEYBF4Bixmwf.jpg" }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const movie = movieDatabase[movieId];

    if (movie) {
        const player = document.getElementById('mainVideoPlayer');
        const titleEl = document.getElementById('displayTitle');
        const selectorArea = document.getElementById('episodeSelectorArea');
        const dropdown = document.getElementById('episodeDropdown');

        titleEl.innerText = movie.title;

        // CHECK IF IT IS A SERIES
        if (movie.episodes && movie.episodes.length > 0) {
            selectorArea.style.display = 'block'; // Show dropdown
            dropdown.innerHTML = ""; // Clear
            
            movie.episodes.forEach((url, index) => {
                let opt = document.createElement('option');
                opt.value = url;
                opt.innerText = `Episode ${index + 1}`;
                dropdown.appendChild(opt);
            });
            
            player.src = movie.episodes[0]; // Load Ep 1 by default
        } else {
            player.src = movie.src; // Just a regular movie
            selectorArea.style.display = 'none';
        }

        fetchMetaData(movie.title, urlParams.get('tmdb'));
        generateRecommendations(movieId);
    }
});

// Helper for Dropdown
function loadSpecificEpisode(url) {
    document.getElementById('mainVideoPlayer').src = url;
}

async function fetchMetaData(displayTitle, manualId) {
    const ratingEl = document.getElementById('imdbRatingDisplay');
    const yearEl = document.getElementById('displayYear');
    const descEl = document.getElementById('movieDescription');
    const titleEl = document.getElementById('displayTitle');

    const originalTitle = displayTitle;
    let url;
    
    // Priority check for ID passed via URL
    if (manualId) {
        url = `https://api.themoviedb.org/3/movie/${manualId}?api_key=${TMDB_API_KEY}`;
    } else {
        const searchQuery = originalTitle.replace(/\[.*?\]/g, '').trim();
        url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (manualId || (data.results && data.results.length > 0)) {
            // If search, filter results for best match
            let bestMatch = manualId ? data : data.results.sort((a, b) => {
                const aIsIndian = a.original_language === 'hi' || a.original_language === 'te';
                const bIsIndian = b.original_language === 'hi' || b.original_language === 'te';
                if (aIsIndian && !bIsIndian) return -1;
                if (!aIsIndian && bIsIndian) return 1;
                return b.popularity - a.popularity;
            })[0];

            // TITLE LOGIC: Use API name if original is short/filename-like
            if (originalTitle.length < 5 || originalTitle.toLowerCase().includes('.html')) {
                titleEl.innerText = bestMatch.title;
            } else {
                titleEl.innerText = originalTitle;
            }

            // Apply Metadata
            const rating = bestMatch.vote_average ? bestMatch.vote_average.toFixed(1) : "N/A";
            const year = (bestMatch.release_date || "2025").split('-')[0];

            ratingEl.innerHTML = `<i class="fab fa-imdb" style="color: #f5c518;"></i> IMDb: ${rating}`;
            yearEl.innerText = `📅 ${year}`;
            descEl.innerText = bestMatch.overview || "Overview not available.";
            
        } else {
            titleEl.innerText = originalTitle;
            descEl.innerText = "Enjoy the stream on CineView!";
        }
    } catch (e) {
        console.error("API Error", e);
        titleEl.innerText = originalTitle;
    }
}

function generateRecommendations(currentId) {
    const grid = document.getElementById('recommendationGrid');
    if (!grid) return;
    
    const keys = Object.keys(movieDatabase).filter(key => key !== currentId);
    const randomMovies = keys.sort(() => 0.5 - Math.random()).slice(0, 8);

    grid.innerHTML = ""; // Clear grid before injecting

    randomMovies.forEach(key => {
        const item = movieDatabase[key];
        const card = document.createElement('a');
        card.href = `player.html?id=${key}`;
        card.className = 'movie-link';
        card.innerHTML = `
            <div class="movie-card">
                <div class="movie-poster-container">
                    <img src="${item.img}" class="movie-poster" loading="lazy" onerror="this.src='https://via.placeholder.com/500x750?text=Poster+Missing'">
                </div>
                <div class="movie-info">
                    <h3>${item.title}</h3>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}





