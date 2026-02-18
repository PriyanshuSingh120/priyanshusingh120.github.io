const TMDB_API_KEY = 'dc691868b09daaabe9acc238ed898cf7';

const movieDatabase = {
    // --- SERIES DATABASE ADDITION ---
    "pushpa-the-rise": { "title": "Pushpa: The Rise", "src": "https://short.icu/BFqd9jO7g", "year": "2021", "img": "https://image.tmdb.org/t/p/w500/h6Pd89ngvl9quPVsx3KoJlQsvk9.jpg" },
    "got2": { 
        "title": "Game Of Thrones Season 2", 
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcc4myHHLydYJrshVYmbcZMq-KgKTzHiBO9C1gETAu93BTTxxiA57dkk&s=10",
        "tmdb": "1399",
        "episodes": ["https://short.icu/iCoJ7LxST","https://short.icu/HDBdhe2r2","https://short.icu/KFfmh0oAX","https://short.icu/FPNbWnfQI","https://short.icu/nki1MkRAB6","https://short.icu/rsTXTuU1Qt","https://short.icu/jQ-ai9T6K","https://short.icu/yL89Eg2QV","https://short.icu/-RaIXDOaz","https://short.icu/KtwsCC_iV"]
    },
    "the-traitors": { 
  "title": "The Traitors", 
  "img": "https://image.tmdb.org/t/p/w500/82gKEb78UPkYAMjXLSswwVzpCbI.jpg", 
  "tmdb": "271489", 
  "isSeries": true, 
  "episodes": ["https://short.icu/OECS7_O1Hh","https://short.icu/cy9s-nJSj","https://short.icu/2yMkFxb9V","https://short.icu/mUHwqpGa3","https://short.icu/Xw1za7G8e","https://short.icu/5cQX07cVU","https://short.icu/XDMYlF0qI","https://short.icu/ZiEXDePH10","https://short.icu/y6R6dRk4N","https://short.icu/GcXTWdzM3"] 
},
    "mercy": {
  "title": "Mercy",
  "img": "https://image.tmdb.org/t/p/w500/pyok1kZJCfyuFapYXzHcy7BLlQa.jpg",
  "year": "2026",
  "genre": "Sci-Fi, Action, Thriller",
  "tmdb": "1236153",
  "type": "movie",
  "src": "https://short.icu/8vi-2dDjV"
},
    "vanaveera": {
  "title": "Vanaveera",
  "img": "https://image.tmdb.org/t/p/w500/gCrNwHpoZ0haxm0jZxc9JHgyLq7.jpg",
  "year": "2026",
  "genre": "Drama, Action",
  "tmdb": "1588621",
  "type": "movie",
  "src": "https://short.icu/ZY8wrb8si"
},
    "harry-potter-and-the-deathly-hallows-part-2": {
  "title": "Harry Potter and the Deathly Hallows: Part 2",
  "img": "https://image.tmdb.org/t/p/w500/c54HpQmuwXjHq2C9wmoACjxoom3.jpg",
  "year": "2011",
  "genre": "Adventure, Fantasy",
  "tmdb": "12445",
  "type": "movie",
  "src": "https://short.icu/rJ3U8nKF1"
},
    "harry-potter-and-the-deathly-hallows-part-1": {
  "title": "Harry Potter and the Deathly Hallows: Part 1",
  "img": "https://image.tmdb.org/t/p/w500/iGoXIpQb7Pot00EEdwpwPajheZ5.jpg",
  "year": "2010",
  "genre": "Adventure, Fantasy",
  "tmdb": "12444",
  "type": "movie",
  "src": "https://short.icu/XoDotskI6"
},
    "how-to-train-your-dragon": {
  "title": "How to Train Your Dragon",
  "img": "https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqUo9xYeYxSZAR3b.jpg",
  "year": "2010",
  "genre": "Fantasy, Adventure, Animated, Family",
  "tmdb": "10191",
  "type": "movie",
  "src": "https://short.icu/du8P_P4oS"
},
    "vadh-2": {
  "title": "Vadh 2",
  "img": "https://image.tmdb.org/t/p/w500/pOJAaLMsc7T5rwVDTA7SRg9SAEU.jpg",
  "year": "2026",
  "genre": "Crime, Drama, Thriller",
  "tmdb": "1595507",
  "type": "movie",
  "src": "https://short.icu/KAYMPxAD9"
},
    "suicide-squad-isekai-s1": {
  "title": "Suicide Squad Isekai - Season 1",
  "img": "https://image.tmdb.org/t/p/w500/mCEeR8Fidw9Ck5oySoe96snj0BZ.jpg",
  "year": "2024",
  "genre": "Animated, Action & Adventure, Sci-Fi & Fantasy",
  "tmdb": "229926",
  "type": "series",
  "episodes": [
    "https://short.icu/JAnpqV7hR",
    "https://short.icu/xs8ETTRaT",
    "https://short.icu/fTjIuwTVg",
    "https://short.icu/GNRfrdj3F",
    "https://short.icu/Vw7kFPL4W",
    "https://short.icu/gi6CZjKQ8",
    "https://short.icu/TuO2WxU9r",
    "https://short.icu/0a1aYvv6Z",
    "https://short.icu/8V3G8l8Cy",
    "https://short.icu/b6yjD36xK"
  ]
},
    
    
    "your-name-": {
  "title": "Your Name.",
  "img": "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
  "year": "2016",
  "tmdb": "372058",
  "type": "movie",
  "src": "https://short.icu/QHegprce3"
},
    "theri": {
  "title": "Theri",
  "img": "https://image.tmdb.org/t/p/w500/f6BhexotEqO3GejXa3FopBNGL6M.jpg",
  "year": "2016",
  "genre": "Action, Crime, Thriller",
  "tmdb": "370076",
  "type": "movie",
  "src": "https://short.icu/FTibX8XjF"
},
    
    "chernobyl": { 
  "title": "Chernobyl", 
  "img": "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg", 
  "tmdb": "87108", 
  "isSeries": true, 
  "episodes": ["https://short.icu/e8a-E1--B","https://short.icu/H5epjTQ_4","https://short.icu/aV192cp_m","https://short.icu/-xiyaOk8x","https://short.icu/9iODPJ5pf"] 
},
    "rangasthalam": {
  "title": "Rangasthalam",
  "img": "https://image.tmdb.org/t/p/w500/yiEzDgBBFC25Zd6z0r7sMngn5vr.jpg",
  "year": "2018",
  "genre": "Action, Drama",
  "tmdb": "461126",
  "type": "movie",
  "src": "https://short.icu/UWjCXkYpG"
},
    
    "jujutsu-kaisen-s2": {
  "title": "JUJUTSU KAISEN - Season 2",
  "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLedtKonJc-_VedlguVLuQyGDbzAt6XNGDlc8iCsJ8vskP6h93Zmc4Ns&s=10",
  "year": "2023",
  "tmdb": "95479",
  "type": "series",
  "episodes": [
    "https://short.icu/FAU_YdyDW",
    "https://short.icu/amL6eldUO",
    "https://short.icu/OOqonZc4L",
    "https://short.icu/a7wJvVE31",
    "https://short.icu/IpIYrinV0",
    "https://short.icu/LqR5XhfgP",
    "https://short.icu/92YKmSzFi",
    "https://short.icu/IXAkc3FrF",
    "https://short.icu/_YcehkvsQ",
    "https://short.icu/qhpJ77an_",
    "https://short.icu/9KRimtl6X",
    "https://short.icu/8rz5dGuw_",
    "https://short.icu/h2mrR_6e_",
    "https://short.icu/ZG66qRuYe",
    "https://short.icu/4Qi1OIPhx",
    "https://short.icu/OP5ActP-l",
    "https://short.icu/t13NCPmkX",
    "https://short.icu/8PagrZQiF",
    "https://short.icu/H9WBDFsot",
    "https://short.icu/PzRpaGfYm",
    "https://short.icu/KFjqGLsAH",
    "https://short.icu/1Cb2OY4kq",
    "https://short.icu/MLVW2ckkF"
  ]
},
    "demon-slayer-kimetsu-no-yaiba-infinity-castle": {
  "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
  "img": "https://image.tmdb.org/t/p/w500/fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
  "year": "2025",
  "tmdb": "1311031",
  "type": "movie",
  "src": "https://short.icu/TW8VmJ33b"
},
    "o-romeo": {
  "title": "O'Romeo",
  "img": "https://image.tmdb.org/t/p/w500/Apqc5JSXQtUJPcBGm6tBO6wQaoq.jpg",
  "year": "2026",
  "genre": "Crime, Drama, Action",
  "tmdb": "1275574",
  "type": "movie",
  "src": "https://short.icu/3DPzTITfw"
},
    "doctor": {
  "title": "Doctor",
  "img": "https://image.tmdb.org/t/p/w500/ySPT0USsuDFG9pqHjI50GYOeQmj.jpg",
  "year": "2021",
  "genre": "Thriller, Comedy, Action",
  "tmdb": "673692",
  "type": "movie",
  "src": "https://short.icu/rTxfAqZ3m"
},
    "mark": {
  "title": "Mark",
  "img": "https://image.tmdb.org/t/p/w500/6LTDv6XHiHN0N77QIFg2tidVvhh.jpg",
  "year": "2025",
  "genre": "Action, Thriller",
  "tmdb": "1510339",
  "type": "movie",
  "src": "https://short.icu/KzX1Mt0Kf"
},
    "rise-of-the-guardians": {
  "title": "Rise of the Guardians",
  "img": "https://image.tmdb.org/t/p/w500/sW4qOa9yF0Ikg7lppncQ0n5UhKX.jpg",
  "year": "2012",
  "tmdb": "81188",
  "type": "movie",
  "src": "https://short.icu/wUwcs_-dD"
},
    "suzhal---the-vortex-s2": {
  "title": "Suzhal - The Vortex - Season 2",
  "img": "https://image.tmdb.org/t/p/w500/aScE4sIpKeHnGmmeOdN0AIvFRqp.jpg",
  "year": "2022",
  "tmdb": "200861",
  "type": "series",
  "episodes": [
    "https://short.icu/6ALJYztJt",
    "https://short.icu/xksgqBfIi",
    "https://short.icu/HFvY46BHV",
    "https://short.icu/4HXLfZ-Xp",
    "https://short.icu/YhM4rrjB9",
    "https://short.icu/dSvtdxtFv4",
    "https://short.icu/BybxIqw_F",
    "https://short.icu/WRR6tQHk0"
  ]
},
    "jujutsu-kaisen-s1": {
  "title": "JUJUTSU KAISEN - Season 1",
  "img": "https://image.tmdb.org/t/p/w500/fHQ2XHRdRix0rkDCShmGQ8c6d03.jpg",
  "year": "2020",
  "tmdb": "95479",
  "type": "series",
  "episodes": [
    "https://short.icu/H8xqVkzrv",
    "https://short.icu/l7FJArdld",
    "https://short.icu/Pd4oRWTEA",
    "https://short.icu/I84I9PmX5",
    "https://short.icu/RgxHTcsDs",
    "https://short.icu/x2BKBhbTc",
    "https://short.icu/G6Hnj4gHA",
    "https://short.icu/yoPXQruIg",
    "https://short.icu/3Tc5z02nL",
    "https://short.icu/nWYWIw_Xs",
    "https://short.icu/VWMaVr6cB",
    "https://short.icu/B63JeRz58",
    "https://short.icu/hH5UdAHas",
    "https://short.icu/Xj8JO72eD",
    "https://short.icu/fMUfK62XU",
    "https://short.icu/by5rVfiSJ",
    "https://short.icu/q760GLJV0",
    "https://short.icu/Z-3bq4_50",
    "https://short.icu/_zJCbInF_",
    "https://short.icu/RYWbZFsis",
    "https://short.icu/mtLDdNUGR",
    "https://short.icu/snUcXRBKv",
    "https://short.icu/bxWdKoiu6",
    "https://short.icu/uvSdk7hbCp"
  ]
},
    
    "special-ops-1-5-the-himmat-story": { 
  "title": "Special Ops 1.5 The Himmat Story", 
  "img": "https://image.tmdb.org/t/p/w500/nH5LDmNofN4p5mldUxxhVzfn4sk.jpg", 
  "tmdb": "138396", 
  "isSeries": true, 
  "episodes": ["https://short.icu/LmV_mN_cb","https://short.icu/UcVbbq_MD","https://short.icu/_iWWqQOVv","https://short.icu/oJHe9TNgr"] 
},
    "sarrainodu": {
  "title": "Sarrainodu",
  "img": "https://image.tmdb.org/t/p/w500/dYOlnzv8LmirzwtbXTU4ROGIebv.jpg",
  "year": "2016",
  "genre": "Action, Drama",
  "tmdb": "374954",
  "type": "movie",
  "src": "https://short.icu/Y1ZLlHvaU"
},
    "shiddat": {
  "title": "Shiddat",
  "img": "https://image.tmdb.org/t/p/w500/dEXxQAspQzZsw9VEiuVWRDJnvvy.jpg",
  "year": "2021",
  "genre": "Romance, Drama",
  "tmdb": "824744",
  "type": "movie",
  "src": "https://short.icu/pwp6oP_JD"
},
    "special-ops2": { 
  "title": "Special Ops 2", 
  "img": "https://image.tmdb.org/t/p/w500/rTOGcNzVMYGezpx9AxX7ilzLNEp.jpg", 
  "tmdb": "100612", 
  "isSeries": true, 
  "episodes": ["https://short.icu/y9uRorwCc","https://short.icu/qMK0HMlZ5","https://short.icu/eWyyF4n_e","https://short.icu/oTwsxPQ9s","https://short.icu/DNTsfroMqS","https://short.icu/OS-fMBklp","https://short.icu/TjOYm-0G0"] 
},
    "the-train-of-death": {
  "title": "The Train of Death",
  "img": "https://image.tmdb.org/t/p/w500/entDxWSkkzcutRm5S9pRWNmvyOJ.jpg",
  "year": "2024",
  "tmdb": "1128936",
  "type": "movie",
  "src": "https://short.icu/Oi7hIYRZS"
},
    "squid-game": { 
  "title": "Squid Game", 
  "img": "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg", 
  "tmdb": "93405", 
  "isSeries": true, 
  "episodes": ["https://short.icu/axDNRsVVT","https://short.icu/3yBJP9S4n","https://short.icu/Ai-OVpCJ3","https://short.icu/670eHUmkX","https://short.icu/QR20MthY6","https://short.icu/jQIFGDJd1"] 
},
    "making-true-detective": { 
  "title": "Making True Detective", 
  "img": "https://image.tmdb.org/t/p/w500/2DOB6Ta84XcOsZ7p2wQ42eZA6La.jpg", 
  "tmdb": "1615709", 
  "isSeries": true, 
  "episodes": ["https://short.icu/UpxR2X4RG","https://short.icu/5bionCFxN","https://short.icu/1TB0Yv19p","https://short.icu/SggRrnc22","https://short.icu/tdxbbJTov","https://short.icu/MfDQW-3eT","https://short.icu/m91PJ77jX","https://short.icu/GDRivrunF"] 
},
    "the-great-indian-kapil-show": { 
  "title": "The Great Indian Kapil Show (season 4)", 
  "img": "https://image.tmdb.org/t/p/w500/3KMCmGDlYLlJ8zGOhCs6f3FZcnj.jpg", 
  "tmdb": "247769", 
  "isSeries": true, 
  "episodes": ["https://short.icu/2yJowFkgD","https://short.icu/vC2yIcr2k","https://short.icu/paJyrkzNd","https://short.icu/mlVO9QwG-","https://short.icu/22RfZR3Gc","https://short.icu/lArfC8XaZ"] 
},
    "death-note-s1": {
  "title": "Death Note - Season 1",
  "img": "https://image.tmdb.org/t/p/w500/1BloDOEmKxPFzbCIuNCLmCrcx6L.jpg",
  "year": "2006",
  "tmdb": "13916",
  "type": "series",
  "episodes": [
    "https://short.icu/-k75AnmMf",
    "https://short.icu/uAr3NPEma",
    "https://short.icu/9jASzYtJX",
    "https://short.icu/tKco_sdJp",
    "https://short.icu/85Uu7ZM1V",
    "https://short.icu/sy0EKz6Kr",
    "https://short.icu/nMh3Q_pRSB",
    "https://short.icu/DNC5NZTPJ",
    "https://short.icu/_ZbO-Fuau",
    "https://short.icu/6c9rMQiaR",
    "https://short.icu/V30hn7_AZ",
    "https://short.icu/Cd-nn8v7U",
    "https://short.icu/iLxYjCAII",
    "https://short.icu/fsxu1w_BI",
    "https://short.icu/ObMBCuIMM",
    "https://short.icu/lzxJigJso",
    "https://short.icu/6p72Hyn54",
    "https://short.icu/pPBYEAAKf",
    "https://short.icu/5psZWQVaX",
    "https://short.icu/wMIpo78-3",
    "https://short.icu/GQjiQ5IBL",
    "https://short.icu/-LdnnkHEdm",
    "https://short.icu/JEprqLwvPG",
    "https://short.icu/ElFHWsS9v",
    "https://short.icu/65kXkmw0p",
    "https://short.icu/67LS3c-bu",
    "https://short.icu/H4cIIdrNl",
    "https://short.icu/K7orphdFd",
    "https://short.icu/mfBvHpHI4",
    "https://short.icu/9HdQ6HyEX",
    "https://short.icu/77J_-Ay0_",
    "https://short.icu/spR2pNhHG",
    "https://short.icu/NQmCCwfbb",
    "https://short.icu/HY_BK_YBX",
    "https://short.icu/SjwGUY_6P",
    "https://short.icu/B854BP1QW",
    "https://short.icu/GRG6yb9kf"
  ]
},
    "taskaree-the-smuggler-s-web": { 
  "title": "Taskaree: The Smuggler's Web", 
  "img": "https://image.tmdb.org/t/p/w500/25fKRXvQLBq4nXu9vjOVJcvCiiD.jpg", 
  "tmdb": "308482", 
  "isSeries": true, 
  "episodes": ["https://short.icu/735vwjsEy","https://short.icu/cJsTLVM5b","https://short.icu/Wg-JTtx7f","https://short.icu/ciqrOxriFL","https://short.icu/XyGIBdhCx","https://short.icu/t8BSpJSCE","https://short.icu/FHOAYrnpC"] 
},
    "steal": { 
  "title": "Steal", 
  "img": "https://image.tmdb.org/t/p/w500/6KmlaPhsohh3Ki9XJUq0jiUYbf3.jpg", 
  "tmdb": "254071", 
  "isSeries": true, 
  "episodes": ["https://short.icu/cRSBTqizP","https://short.icu/HtzjfsB9M","https://short.icu/r0wRBWrtz","https://short.icu/OLleBYyDr","https://short.icu/OClUen7k5","https://short.icu/u2fOUSZY8T"] 
},
    "space-gen-chandrayaan": { 
  "title": "Space Gen: Chandrayaan", 
  "img": "https://image.tmdb.org/t/p/w500/d6WIr1vycFCCdYewgRf8dpWxQQE.jpg", 
  "tmdb": "311632", 
  "isSeries": true, 
  "episodes": ["https://short.icu/QPjOsHaCQ","https://short.icu/QZD2usv2u","https://short.icu/AUC-QHlzi","https://short.icu/NYv37dBXEV","https://short.icu/sSwU2sfk4"] 
},
    "96": {
  "title": "96",
  "img": "https://image.tmdb.org/t/p/w500/nrVloCa2hCFOztRF1DZU2jnWIiQ.jpg",
  "year": "2018",
  "genre": "Romance",
  "tmdb": "441717",
  "type": "movie",
  "src": "https://short.icu/NBKxpU4-N"
},
    "special-ops": { 
  "title": "Special Ops", 
  "img": "https://image.tmdb.org/t/p/w500/rTOGcNzVMYGezpx9AxX7ilzLNEp.jpg", 
  "tmdb": "100612", 
  "isSeries": true, 
  "episodes": ["https://short.icu/LCiMGHDTq","https://short.icu/t2JlAS7LF","https://short.icu/i1zTMp9UT","https://short.icu/DBBRoMdmB","https://short.icu/zdB2MnbdS","https://short.icu/um_KmmQzE","https://short.icu/pOC0XtQdf","https://short.icu/Nhzq7boa2"] 
},
    "familyman3": { 
        "title": "The Family Man Season 3", 
        "img": "https://catimages.org/images/2025/11/21/The-Family-Man-S03-Hindi-HDRip-ALL-Episodes.jpg",
        "tmdb": "95440",
        "isSeries": true,
        "episodes": ["https://short.icu/OzcIkav01","https://short.icu/hvs4iLHuM","https://short.icu/A3S4gqYx4","https://short.icu/u42XsM7xb","https://short.icu/d1uqiv21f","https://short.icu/UDEuAwdmI","https://short.icu/LhM_9VDym"]
    },
    "mitti-ek-nayi-pehchaan": { 
  "title": "Mitti – Ek Nayi Pehchaan", 
  "img": "https://image.tmdb.org/t/p/w500/443pEkTNjSY4Y8PjIzJfxSslRYw.jpg", 
  "tmdb": "295719", 
  "isSeries": true, 
  "episodes": ["https://short.icu/xKenXm3Pe","https://short.icu/n68PkY7vV","https://short.icu/icJCKtgML","https://short.icu/l_L_DHV5b","https://short.icu/lo-180cDvb","https://short.icu/UAoRyDsym","https://short.icu/e0wLki7zS","https://short.icu/tmrLY95taf"] 
},
    "puzzle": { "title": "Puzzle", "src": "https://short.icu/e3kt7JPeH5", "year": "2018", "img": "https://image.tmdb.org/t/p/w500/7CfijsjOsPKzz2Dd1zoMF5VPmZo.jpg" },
    "got1": { 
        "title": "Game Of Thrones Season 1", 
        "img": "https://i.pinimg.com/736x/cb/13/3d/cb133d3ccd5dd67463513d892173753c.jpg",
        "tmdb": "1399",
        "isSeries": true,
        "episodes": ["https://short.icu/h2B8qM3lG","https://short.icu/no_u3ua8-","https://short.icu/wIdcX5hFw","https://short.icu/taNL76E-D","https://short.icu/VROKYQ2Qi","https://short.icu/Z65Ic8gUl","https://short.icu/C2t7B60T6","https://short.icu/L7K7Bm4Ei","https://short.icu/sxCOYY6-z","https://short.icu/0izCNMFmG"]
    },
    "liger": { "title": "Liger", "src": "https://short.icu/dAl9WbpLX", "year": "2022", "img": "https://image.tmdb.org/t/p/w500/bBZJAdfmcwhyvkwK1XajnHECdoY.jpg" },
    "got3": { 
        "title": "Game Of Thrones Season 3", 
        "img": "https://upload.wikimedia.org/wikipedia/en/1/1d/Game_of_Thrones_Season_3.jpg",
        "tmdb": "1399",
        "episodes": ["https://short.icu/HWzUOfgpw","https://short.icu/X6F_qpnJn","https://short.icu/w33oywFGy","https://short.icu/MCy5_F8oA","https://short.icu/5mMZa1Jp8J","https://short.icu/EdcmsxTUS6","https://short.icu/BXK8RyCIX","https://short.icu/SzVEQFNmS","https://short.icu/vSRBxADZxe","https://short.icu/d-xFc6TKc"]
    },
    "mrs-deshpande": { 
  "title": "Mrs. Deshpande", 
  "img": "https://image.tmdb.org/t/p/w500/7uZ9ZQHVfOACW7Got0wMg8ykGkz.jpg", 
  "tmdb": "260846", 
  "isSeries": true, 
  "episodes": ["https://short.icu/qGINu3Tpy","https://short.icu/MjKklN3ET","https://short.icu/KRLLBjLlT","https://short.icu/xxeuKEe0T","https://short.icu/Yym3EALTq","https://short.icu/1VTTcnegq"] 
},
    "kapils3": { 
        "title": "The Kapil Sharma Show Season 3", 
        "img": "https://catimages.org/images/2025/06/21/The-Great-Indian-Kapil-Show-2025-S03-HDHub4u.Ms.jpg",
        "tmdb": "254558",
        "episodes": ["https://short.icu/xVfDacuLX7","https://short.icu/uj4eBNozm","https://short.icu/0xsHh_sy0","https://short.icu/9sfprsaaj","https://short.icu/qfwY2Q1Is","https://short.icu/1zNYJWhqv","https://short.icu/RCLhytk2_"]
    },
    "super-30": { "title": "Super 30", "src": "https://short.icu/Ir1itWICQ", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/n0LdZvEqZjnSQSHzzwryFBYjXk1.jpg" },
    "panchayats1": { 
        "title": "Panchayat Season 1", 
        "img": "https://image.tmdb.org/t/p/w500/hmjIgLSh2bVcHDQqQ0f0xeen24x.jpg",
        "tmdb": "100147",
        "episodes": ["https://short.icu/z6b4cTVgE","https://short.icu/gDapNZNqr","https://short.icu/vuyMH3wTG","https://short.icu/Wwpef2jia","https://short.icu/oOhV_nW0r","https://short.icu/4UHcKWLHR","https://short.icu/vev_LatRV","https://short.icu/dLGOLEt8W"]
    },
    "despicable-me-3": { "title": "Despicable Me 3", "src": "https://short.icu/lYHluUjFr", "year": "2017", "img": "https://image.tmdb.org/t/p/w500/6t3YWl7hrr88lCEFlGVqW5yV99R.jpg" },
    "bigil": { "title": "Bigil", "src": "https://short.icu/yVgZQ1nYMp", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/s4Yi1RbMyyN3hH2hElwvluP2rOG.jpg" },
    "panchayats2": { 
        "title": "Panchayat Season 2", 
        "img": "https://image.tmdb.org/t/p/w500/gRKDEpUPd2pp2msmwdgEW34V0SL.jpg",
        "tmdb": "100147",
        "episodes": ["https://short.icu/DFMFBYw4O","https://short.icu/276sG4v3U","https://short.icu/aIWwkKsde","https://short.icu/UGi8ht-Jo","https://short.icu/jLoccqc_L","https://short.icu/7Gmq0saQg","https://short.icu/AY-YfajxG","https://short.icu/75cf0cYUH"] 
},
    "one-piece-film-red": {
  "title": "One Piece Film Red",
  "img": "https://image.tmdb.org/t/p/w500/m80kPdrmmtEh9wlLroCp0bwUGH0.jpg",
  "year": "2022",
  "tmdb": "900667",
  "type": "movie",
  "src": "https://short.icu/6r4MovW7d"
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
    "the-astronaut": {
  "title": "The Astronaut",
  "img": "https://image.tmdb.org/t/p/w500/souvvkJHYhztC1UqZ8lEVUiJa3J.jpg",
  "year": "2025",
  "genre": "Sci-Fi, Horror, Thriller",
  "tmdb": "1086260",
  "type": "movie",
  "src": "https://short.icu/VIUrgX4mv"
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
    "the-spongebob-movie-search-for-squarepants": {
  "title": "The SpongeBob Movie: Search for SquarePants",
  "img": "https://image.tmdb.org/t/p/w500/pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
  "year": "2025",
  "tmdb": "991494",
  "type": "movie",
  "src": "https://short.icu/m0LAfcqp1"
},
    "rabbit-trap": {
  "title": "Rabbit Trap",
  "img": "https://image.tmdb.org/t/p/w500/sKnwnnmBpjo9BEskHtja6ToXUV1.jpg",
  "year": "2025",
  "tmdb": "1193824",
  "type": "movie",
  "src": "https://short.icu/yRPvo363E"
},
    "train-to-busan": {
  "title": "Train to Busan",
  "img": "https://image.tmdb.org/t/p/w500/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg",
  "year": "2016",
  "tmdb": "396535",
  "type": "movie",
  "src": "https://short.icu/XAZdvIBWy"
},
    "gustaakh-ishq": {
  "title": "Gustaakh Ishq",
  "img": "https://image.tmdb.org/t/p/w500/eEl28LCW1DsXTRhmdlo2vjuaP5X.jpg",
  "year": "2025",
  "tmdb": "1238164",
  "type": "movie",
  "src": "https://short.icu/xz3Vdlj8K"
},
    "animal": {
  "title": "Animal",
  "img": "https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg",
  "year": "2023",
  "tmdb": "781732",
  "type": "movie",
  "src": "https://short.icu/8fq5gE5D9"
},
    "45": {
  "title": "45",
  "img": "https://image.tmdb.org/t/p/w500/luDTygZ6uAwaknc2isXZcz8YMvE.jpg",
  "year": "2025",
  "tmdb": "1382160",
  "type": "movie",
  "src": "https://short.icu/ouEaOoSAp"
},
    "spider-man": {
  "title": "Spider-Man",
  "img": "https://image.tmdb.org/t/p/w500/kjdJntyBeEvqm9w97QGBdxPptzj.jpg",
  "year": "2002",
  "tmdb": "557",
  "type": "movie",
  "src": "https://short.icu/1HYGgP4Sx"
},
    "the-fix": {
  "title": "The Fix",
  "img": "https://image.tmdb.org/t/p/w500/vY7bY2xZymoIOti4WM5K29OMzCS.jpg",
  "year": "2024",
  "tmdb": "931940",
  "type": "movie",
  "src": "https://short.icu/egXqIGq07"
},"hotel-transylvania-transformania": {
  "title": "Hotel Transylvania: Transformania",
  "img": "https://image.tmdb.org/t/p/w500/teCy1egGQa0y8ULJvlrDHQKnxBL.jpg",
  "year": "2022",
  "tmdb": "585083",
  "type": "movie",
  "src": "https://short.icu/B63hhJN52"
},
    "jurassic-world": {
  "title": "Jurassic World",
  "img": "https://image.tmdb.org/t/p/w500/rhr4y79GpxQF9IsfJItRXVaoGs4.jpg",
  "year": "2015",
  "tmdb": "135397",
  "type": "movie",
  "src": "https://short.icu/FIB7JBiNu"
},
    "stolen": {
  "title": "Stolen",
  "img": "https://image.tmdb.org/t/p/w500/xR5Endhjm4soY6fPgXY0jrpDZvL.jpg",
  "year": "2023",
  "tmdb": "1156202",
  "type": "movie",
  "src": "https://short.icu/KGcZypOHr"
},
    "mahaan": {
  "title": "Mahaan",
  "img": "https://image.tmdb.org/t/p/w500/aHBgBSHgpLHuX9jxUGISTAIDmyD.jpg",
  "year": "2022",
  "tmdb": "804337",
  "type": "movie",
  "src": "https://short.icu/GgWJSes1W"
},
    "sultan": { "title": "Sultan", "src": "https://short.icu/t-H9cuHzO", "year": "2016", "img": "https://image.tmdb.org/t/p/w500/vPTYtKuV8X5uUd3SqnzO14W6Dti.jpg" },
    "lubber-pandhu": { "title": "Lubber Pandhu", "src": "https://short.icu/zX7mBJdLR", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/jNyLZjIgaYVkBli2JihHwABlAPY.jpg" },
    "ujda-chaman": { "title": "Ujda Chaman", "src": "https://short.icu/sl5Rizeo4", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/hybSFEHZcehPN8oRdb5YjaxRk2u.jpg" },
    "kedarnath": { "title": "Kedarnath", "src": "https://short.icu/viIfjVThz", "year": "2018", "img": "https://image.tmdb.org/t/p/w500/viq6ltqew6ZU6dur1FUVKpf9tiZ.jpg" },
    "ted": { "title": "Ted", "src": "https://short.icu/CaS-mz9wA", "year": "2012", "img": "https://image.tmdb.org/t/p/w500/tZPTcdGTpxq4yJx1YxqBl0gthNz.jpg" },
    "amaran": { "title": "Amaran", "src": "https://short.icu/TDsIjVYSj", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/yj9DbvPWjytH2EvDpGuJwos69rn.jpg" },
    "ghost-rider-spirit-of-vengeance": { "title": "Ghost Rider: Spirit of Vengeance", "src": "https://short.icu/1A8YHwZza", "year": "2011", "img": "https://image.tmdb.org/t/p/w500/fUJOWsjjE8u1r4YOLYe1RLYy7bm.jpg" },
    "batti-gul-meter-chalu": { "title": "Batti Gul Meter Chalu", "src": "https://short.icu/L_RcePy5DI", "year": "2018", "img": "https://image.tmdb.org/t/p/w500/1vu8ytRpXHYjmVQ2g7Ro5j5k61F.jpg" },
    "12th-fail": { "title": "12th Fail", "src": "https://short.icu/-tGxzoOLL", "year": "2023", "img": "https://image.tmdb.org/t/p/w500/eebUPRI4Z5e1Z7Hev4JZAwMIFkX.jpg" },
    "welcome-back": { "title": "Welcome Back", "src": "https://short.icu/72MTfaND8", "year": "2015", "img": "https://image.tmdb.org/t/p/w500/xnRIT3ggVcJxGWylKw85n6pteLp.jpg" },
    "cheekatilo": { "title": "Cheekatilo", "src": "https://short.icu/wwLdO_MZa3", "year": "2026", "img": "https://image.tmdb.org/t/p/w500/pO86EjZb7QyGYk5RW4Xm4UWe5Uv.jpg" },
    "dhurandhar": { "title": "Dhurandhar", "src": "https://short.icu/rfFnG9g89", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/8FHOtUpNIk5ZPEay2N2EY5lrxkv.jpg" },
    "777-charlie": { "title": "777 Charlie", "src": "https://short.icu/rDBkCtcHEf", "year": "2022", "img": "https://image.tmdb.org/t/p/w500/qArPmXH0aWsT3SEtYl8XrU2Oz48.jpg" },
    "border-2": { "title": "Border 2", "src": "https://short.icu/s2mCKLYkm", "year": "2026", "img": "https://image.tmdb.org/t/p/w500/q7ow2BdAeQIc6zVteJ0x1Uxmixt.jpg" },
    "tere-ishk-mein": { "title": "Tere Ishk Mein", "src": "https://short.icu/TYhQXfBmF", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/7FsHlW9z7gDhDE4EXAE2WcXUVQj.jpg" },
    "parasite": { "title": "Parasite", "src": "https://short.icu/Zv2IYvYvU", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
    "homebound": { "title": "Homebound", "src": "https://short.icu/F50oSqRTM3", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/vyezjSvSdLO0bvr6jSNuFi6yuiw.jpg" },
    "silence-can-you-hear-it": { "title": "Silence... Can You Hear It?", "src": "https://short.icu/w1uCXZiCr", "year": "2021", "img": "https://image.tmdb.org/t/p/w500/9lxPuirAgtqHYG3JtIdfg7TucKn.jpg" },
    "spies-in-disguise": { "title": "Spies in Disguise", "src": "https://short.icu/u5Mow9z-X", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/e7rWcrnuNej3JeVjqmRu0jVeRa4.jpg" },
    "dream-girl-2": { "title": "Dream Girl 2", "src": "https://short.icu/FPyZTJMEU", "year": "2023", "img": "https://image.tmdb.org/t/p/w500/gvNeqDNwZ8isym8CeHZsZk1QiSJ.jpg" },
    "sitaare-zameen-par": { "title": "Sitaare Zameen Par", "src": "https://short.icu/6OmR4C0xX", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/adYjCJGSNiL7CIaDW3g0Bcg7r2Z.jpg" },
    "kung-fu-panda-4": { "title": "Kung Fu Panda 4", "src": "https://short.icu/X2HFGXffg", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" },
    "kabir-singh": { "title": "Kabir Singh", "src": "https://short.icu/rucro0oz5", "year": "2019", "img": "https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg" },
    "bumblebee": { "title": "Bumblebee", "src": "https://short.icu/U56hErh4E", "year": "2018", "img": "https://image.tmdb.org/t/p/w500/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg" },
    "ranarangam": { "title": "Ranarangam", "src": "https://short.icu/SpPK72jmQ", "year": "2019", "img": "https://image.tmdb.org/t/p/w500/ofeya3VH7q9EtzdQMhTWY3GFhaT.jpg" },
    "lost-ladies": { "title": "Lost Ladies", "src": "https://short.icu/KPvnEv-Ml", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/cGG5hCwPnMvuKzvUBnxo5y3DcVM.jpg" },
    "sankranthiki-vasthunam": { "title": "Sankranthiki Vasthunam", "src": "https://short.icu/t_4EX2NuZ", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/gFa07KuR3tWFI6YFTeGz930zeMo.jpg" },
    "luck": { "title": "Luck", "src": "https://short.icu/-6NC7zkIH", "year": "2022", "img": "https://image.tmdb.org/t/p/w500/1HOYvwGFioUFL58UVvDRG6beEDm.jpg" },
    "lucky-baskhar": { "title": "Lucky Baskhar", "src": "https://short.icu/1UCbVlsM0h", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/a47JQFl9L7VDa79tEvnTOJe0rPa.jpg" },
    "stree-2": { "title": "Stree 2", "src": "https://short.icu/L8MlxJ68xb", "year": "2024", "img": "https://image.tmdb.org/t/p/w500/nfnhwfUEFuSOxxf4jDdBlY6Lccw.jpg" },
    "vritta": { "title": "Vritta", "src": "https://short.icu/N2lYEchkf", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/oNPao9volH0jAA1jULlQ6hCOmAe.jpg" },
    "five-nights-at-freddy-s-2": { "title": "Five Nights at Freddy's 2", "src": "https://short.icu/mefNkkclf", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/udAxQEORq2I5wxI97N2TEqdhzBE.jpg" },
    "the-rip": { "title": "The Rip", "src": "https://short.icu/I92myT5vG", "year": "2026", "img": "https://image.tmdb.org/t/p/w500/p4bW2sJKAwcHuLpfoZK7Zo63osA.jpg" },
    "the-smashing-machine": { "title": "The Smashing Machine", "src": "https://short.icu/2oM9IXe8B", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/mPuBDGrVIBGOymBxR6rO3iIvBSe.jpg" },
    "godzilla-minus-one": { "title": "Godzilla Minus One", "src": "https://short.icu/bGHG9Au7ZO", "year": "2023", "img": "https://image.tmdb.org/t/p/w500/2E2WTX0TJEflAged6kzErwqX1kt.jpg" },
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
    "dangal": { "title": "Dangal", "src": "https://short.icu/36fxXWJ79", "year": "2016", "img": "https://image.tmdb.org/t/p/w500/cJRPOLEexI7qp2DKtFfCh7YaaUG.jpg" },
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
    "a-beautiful-mind": { "title": "A Beautiful Mind", "src": "https://short.icu/i8mdW6PtK", "year": "2001", "img": "https://image.tmdb.org/t/p/w500/rEIg5yJdNOt9fmX4P8gU9LeNoTQ.jpg" },
    "johnyenglish": { "title": "Johnny English", "src": "https://short.icu/o5_SzBsUr", "year": "2018", "img": "https://image.tmdb.org/t/p/w400/tCBxnZwLiY1BOKw3tH6AxHZdqPh.jpg" },
    "jollyllb3": { "title": "Jolly LLB 3", "src": "https://short.icu/6UJAPeNXp", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/bwRoU9p5GvjxgPfmIgsfcJ4ydng.jpg" },
    "kaalidhar-laapata": { "title": "Kaalidhar Laapata", "src": "https://short.icu/CixZbuDjj", "year": "2025", "img": "https://image.tmdb.org/t/p/w500/a7ctu6C6f7tN87ve4HFDoELp7cH.jpg" },
    "kadaram": { "title": "Kadaram Kondan", "src": "https://short.icu/LhEIupaqA", "year": "2019", "img": "https://prigames.netlify.app/movies/images/7.jpg" },
    "kanata": { "title": "Kantara", "src": "https://short.icu/50cDs2ANa", "year": "2022", "img": "https://prigames.netlify.app/movies/images/8.jpg" },
    "kashmirfiles": { "title": "The Kashmir Files", "src": "https://short.icu/NeZaL_zgG", "year": "2022", "img": "https://m.media-amazon.com/images/M/MV5BYTUwZTNjY2MtNmRjOC00YmI1LThlNWUtZTFkMDgzNTc5ODAwXkEyXkFqcGc@._V1_.jpg" },
    "kishkindhapuri": { "title": "Kishkindhapuri", "src": "https://short.icu/G1-bPfZ9iN", "year": "2025", "img": "https://prigames.netlify.app/movies/images/9.jpg" },
    "kiskiskopyarkaru2": { "title": "Kis Kisko Pyaar Karoon 2", "src": "https://short.icu/2CimpUZoW", "year": "2025", "img": "https://m.media-amazon.com/images/M/MV5BOTJkZDAxNTUtNGZhYy00Mjg5LTlhZTctZDQ3MjRhODRmYzI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    "kungfupanda": { "title": "Kung Fu Panda", "src": "https://short.icu/MEjDHh08z", "year": "2008", "img": "https://catimages.org/images/2025/06/23/Kung.Fu.Panda.2008.jpg" },
    "luck": { "title": "Luck", "src": "https://short.icu/-6NC7zkIH", "year": "2022", "img": "https://image.tmdb.org/t/p/w500/1HOYvwGFioUFL58UVvDRG6beEDm.jpg" },
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
    "rahu-ketu": { "title": "Rahu Ketu", "src": "https://short.icu/BR_0zqx3Q", "year": "2026", "img": "https://image.tmdb.org/t/p/w500/zjgWWOIsEqYNSa1fGRr82mBo3gv.jpg" },
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



let sources = { s1: '', s2: '', s3: '', s4: '' };

function initPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const tmdbId = urlParams.get('tmdb');
    const isHindi = urlParams.get('isHindi') === 'true';
    const typeParam = urlParams.get('type') || 'movie';

    const player = document.getElementById('mainVideoPlayer');
    const titleEl = document.getElementById('displayTitle');
    const switcher = document.getElementById('serverSwitcher');
    const selectorArea = document.getElementById('episodeSelectorArea');
    const dropdown = document.getElementById('episodeDropdown');

    if(switcher) switcher.style.display = 'none';

    // SCENARIO 1: Movie is in movieDatabase
    if (movieId && movieDatabase[movieId]) {
        const movie = movieDatabase[movieId];
        const isSeries = movie.isSeries || false;
        const typePath = isSeries ? 'tv' : 'movie';
        
        // Use database title (Prevents manipulation)
        titleEl.innerText = movie.title;

        // Setup S1 (Local)
        if (movie.episodes && movie.episodes.length > 0) {
            if(selectorArea) selectorArea.style.display = 'block';
            if(dropdown) {
                dropdown.innerHTML = "";
                movie.episodes.forEach((url, i) => {
                    let opt = document.createElement('option');
                    opt.value = url; opt.innerText = `Episode ${i + 1}`;
                    dropdown.appendChild(opt);
                });
            }
            sources.s1 = movie.episodes[0];
        } else {
            sources.s1 = movie.src;
            if(selectorArea) selectorArea.style.display = 'none';
        }

        // Setup Backups using manual-compliant URLs
        if (movie.tmdb) {
            sources.s2 = `https://player.smashy.stream/${typePath}/${movie.tmdb}${isSeries ? '?s=1&e=1' : ''}`;
            sources.s3 = `https://player.videasy.net/${typePath}/${movie.tmdb}?color=e50914&overlay=true&episodeSelector=true`;
            sources.s4 = `https://vidsrc.xyz/embed/${typePath}/${movie.tmdb}`;
            if(switcher) switcher.style.display = 'flex';
        }

        player.src = sources.s1;
        fetchMetaData(movie.title, movie.tmdb, isSeries, false); // false = Don't change title
        generateRecommendations(movieId);
    } 
    // SCENARIO 2: External Search Results
    else if (tmdbId) {
        const title = decodeURIComponent(urlParams.get('title') || "Now Playing");
        const isSeries = typeParam === 'series';
        const typePath = isSeries ? 'tv' : 'movie';
        titleEl.innerText = title;
        if(selectorArea) selectorArea.style.display = 'none';

        // Smashy Priority for external
        sources.s1 = `https://player.smashy.stream/${typePath}/${tmdbId}${isSeries ? '?s=1&e=1' : ''}`;
        sources.s2 = `https://player.videasy.net/${typePath}/${tmdbId}?color=e50914&overlay=true`;
        sources.s3 = `https://vidsrc.xyz/embed/${typePath}/${tmdbId}`;
        sources.s4 = `https://www.2embed.cc/embed/${isSeries ? 'tv' : ''}${tmdbId}${isSeries ? '&s=1&e=1' : ''}`;

        // Label updates
        if(document.getElementById('btn-s1')) document.getElementById('btn-s1').innerHTML = `<i class="fas fa-language"></i> Smashy`;
        if(document.getElementById('btn-s2')) document.getElementById('btn-s2').innerHTML = `<i class="fas fa-bolt"></i> VIDEASY`;
        if(document.getElementById('btn-s3')) document.getElementById('btn-s3').innerHTML = `<i class="fas fa-server"></i> Vidsrc`;

        if(switcher) switcher.style.display = 'flex';
        player.src = sources.s1;
        fetchMetaData(title, tmdbId, isSeries, true); // true = allow title update for search
        generateRecommendations('random');
    }
}

function switchServer(num) {
    const player = document.getElementById('mainVideoPlayer');
    const btns = document.querySelectorAll('.server-btn');
    btns.forEach(btn => {
        if(btn.id === `btn-s${num}`) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    const srcList = [sources.s1, sources.s2, sources.s3, sources.s4];
    if(srcList[num-1]) player.src = srcList[num-1];
}

function loadSpecificEpisode(url) {
    document.getElementById('mainVideoPlayer').src = url;
    sources.s1 = url;
}

async function fetchMetaData(title, id, isSeries, updateTitle) {
    const type = isSeries ? 'tv' : 'movie';
    const cleanTitle = title.replace(/Season \d+/i, '').replace(/\[.*?\]/g, '').trim();
    let url = id 
        ? `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        : `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&language=en-US`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const best = (data.results && data.results.length > 0) ? data.results[0] : data;

        if (best && !best.status_message) {
            const ratingEl = document.getElementById('imdbRatingDisplay');
            const yearEl = document.getElementById('displayYear');
            const descEl = document.getElementById('movieDescription');

            if(ratingEl) ratingEl.innerHTML = `<i class="fab fa-imdb" style="color: #f5c518;"></i> Rating: ${best.vote_average?.toFixed(1) || 'N/A'}`;
            if(yearEl) yearEl.innerHTML = `<i class="far fa-calendar-alt"></i> ${(best.release_date || best.first_air_date || '2025').split('-')[0]}`;
            if(descEl) descEl.innerText = best.overview || "Storyline details not available.";
            
            // Fix: Update title ONLY if search scenario, not for database items
            if(updateTitle) {
                const engTitle = best.title || best.name;
                if(engTitle) document.getElementById('displayTitle').innerText = engTitle;
            }
        }
    } catch (e) { console.error("Meta failed"); }
}

function generateRecommendations(currentId) {
    const grid = document.getElementById('recommendationGrid');
    if (!grid) return;
    const keys = Object.keys(movieDatabase).filter(k => k !== currentId);
    const shuffled = keys.sort(() => 0.5 - Math.random()).slice(0, 10);
    grid.innerHTML = "";
    shuffled.forEach(k => {
        const item = movieDatabase[k];
        const card = document.createElement('a');
        // This ensures the recommendation link carries all needed params
        const finalHref = item.tmdb ? `player.html?id=${k}&tmdb=${item.tmdb}&type=${item.isSeries ? 'series' : 'movie'}` : `player.html?id=${k}`;
        card.href = finalHref;
        card.className = 'movie-link';
        card.innerHTML = `
            <div class="movie-card">
                <div class="movie-poster-container">
                    <img src="${item.img}" class="movie-poster" loading="lazy">
                </div>
                <div class="movie-info"><h3>${item.title}</h3></div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Fixed: Window onload to ensure recommendation links work
window.onload = initPlayer;









