const { neon } = require('@neondatabase/serverless');

// This function handles ALL database requests (Watchlist, History, Comments)
exports.handler = async (event) => {
    const sql = neon(process.env.DATABASE_URL);
    const body = event.body ? JSON.parse(event.body) : {};
    const { action, userId, movieId, movieData, text, userName } = body;

    try {
        // 1. Initialize Tables (Run once)
        if (action === 'init') {
            await sql`CREATE TABLE IF NOT EXISTS watchlist (user_id TEXT, movie_id TEXT, PRIMARY KEY(user_id, movie_id))`;
            await sql`CREATE TABLE IF NOT EXISTS history (user_id TEXT, movie_id TEXT, movie_data JSONB, watched_at TIMESTAMP DEFAULT NOW())`;
            await sql`CREATE TABLE IF NOT EXISTS comments (movie_id TEXT, user_name TEXT, text TEXT, created_at TIMESTAMP DEFAULT NOW())`;
            return { statusCode: 200, body: "Tables ready" };
        }

        // 2. Watchlist Logic
        if (action === 'addWatchlist') {
            await sql`INSERT INTO watchlist (user_id, movie_id) VALUES (${userId}, ${movieId}) ON CONFLICT DO NOTHING`;
            return { statusCode: 200, body: "Added" };
        }
        if (action === 'getWatchlist') {
            const rows = await sql`SELECT movie_id FROM watchlist WHERE user_id = ${userId}`;
            return { statusCode: 200, body: JSON.stringify(rows.map(r => r.movie_id)) };
        }

        // 3. History Logic
        if (action === 'addHistory') {
            await sql`INSERT INTO history (user_id, movie_id, movie_data) VALUES (${userId}, ${movieId}, ${JSON.stringify(movieData)})`;
            return { statusCode: 200, body: "Saved" };
        }
        if (action === 'getHistory') {
            const rows = await sql`SELECT movie_data FROM history WHERE user_id = ${userId} ORDER BY watched_at DESC LIMIT 10`;
            return { statusCode: 200, body: JSON.stringify(rows.map(r => r.movie_data)) };
        }

        // 4. Comments Logic
        if (action === 'postComment') {
            await sql`INSERT INTO comments (movie_id, user_name, text) VALUES (${movieId}, ${userName}, ${text})`;
            return { statusCode: 200, body: "Posted" };
        }
        if (action === 'getComments') {
            const rows = await sql`SELECT user_name, text, created_at FROM comments WHERE movie_id = ${movieId} ORDER BY created_at DESC`;
            return { statusCode: 200, body: JSON.stringify(rows) };
        }

        return { statusCode: 400, body: "Unknown Action" };
    } catch (err) {
        return { statusCode: 500, body: err.message };
    }
};
