import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, onSnapshot, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 1. Setup (Config is handled by environment)
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'cineview-prod';

// 2. Global State
let currentUser = null;

// 3. Auth Listener
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    const userBtn = document.getElementById('userProfileBtn');
    const nameDisplay = document.getElementById('userNameDisplay');
    
    if (user) {
        if (nameDisplay) nameDisplay.innerText = user.email.split('@')[0];
        // Load cloud watchlist/history if on index
        if (window.location.pathname.includes('index')) syncWatchlist();
    } else {
        if (nameDisplay) nameDisplay.innerText = "Login";
    }
});

// 4. Save History (Call this when player loads)
export const saveToHistory = async (movieData) => {
    if (!currentUser) return;
    const historyRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'history', movieData.id);
    await setDoc(historyRef, {
        ...movieData,
        timestamp: serverTimestamp()
    });
};

// 5. Comment Logic
export const postComment = async (movieId, text) => {
    if (!currentUser) return alert("Please login to comment!");
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'comments');
    await addDoc(colRef, {
        movieId,
        text,
        user: currentUser.email.split('@')[0],
        timestamp: serverTimestamp()
    });
};

// 6. Like Logic
export const toggleLike = async (movieId) => {
    if (!currentUser) return;
    const likeRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'likes', movieId);
    const docSnap = await getDoc(likeRef);
    if (docSnap.exists()) {
        await deleteDoc(likeRef);
        return false;
    } else {
        await setDoc(likeRef, { movieId, liked: true });
        return true;
    }
};

// 7. Sync Watchlist (Cloud vs Local)
async function syncWatchlist() {
    if (!currentUser) return;
    const colRef = collection(db, 'artifacts', appId, 'users', currentUser.uid, 'watchlist');
    onSnapshot(colRef, (snapshot) => {
        const cloudList = snapshot.docs.map(d => d.id);
        // Merge with local if needed, then update UI
        localStorage.setItem('cineview_watchlist', JSON.stringify(cloudList));
    });
}
