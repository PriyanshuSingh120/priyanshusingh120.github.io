const { neon } = require('@neondatabase/serverless');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const sql = neon(process.env.DATABASE_URL);
    const body = JSON.parse(event.body);
    const { action, userId, movieId, movieData, text, userName } = body;

    try {
        // Initialize Tables
        await sql`CREATE TABLE IF NOT EXISTS watchlist (user_id TEXT, movie_id TEXT, PRIMARY KEY(user_id, movie_id))`;
        await sql`CREATE TABLE IF NOT EXISTS history (user_id TEXT, movie_id TEXT, movie_data JSONB, watched_at TIMESTAMP DEFAULT NOW())`;
        await sql`CREATE TABLE IF NOT EXISTS comments (movie_id TEXT, user_name TEXT, text TEXT, created_at TIMESTAMP DEFAULT NOW())`;

        switch(action) {
            case 'addWatchlist':
                await sql`INSERT INTO watchlist (user_id, movie_id) VALUES (${userId}, ${movieId}) ON CONFLICT DO NOTHING`;
                return { statusCode: 200, body: JSON.stringify({status: "ok"}) };
            case 'getWatchlist':
                const wRows = await sql`SELECT movie_id FROM watchlist WHERE user_id = ${userId}`;
                return { statusCode: 200, body: JSON.stringify(wRows.map(r => r.movie_id)) };
            case 'addHistory':
                await sql`INSERT INTO history (user_id, movie_id, movie_data) VALUES (${userId}, ${movieId}, ${JSON.stringify(movieData)})`;
                return { statusCode: 200, body: JSON.stringify({status: "ok"}) };
            case 'getHistory':
                const hRows = await sql`SELECT DISTINCT ON (movie_id) movie_data FROM history WHERE user_id = ${userId} ORDER BY movie_id, watched_at DESC LIMIT 10`;
                return { statusCode: 200, body: JSON.stringify(hRows.map(r => r.movie_data)) };
            case 'postComment':
                await sql`INSERT INTO comments (movie_id, user_name, text) VALUES (${movieId}, ${userName}, ${text})`;
                return { statusCode: 200, body: JSON.stringify({status: "ok"}) };
            case 'getComments':
                const cRows = await sql`SELECT user_name, text, created_at FROM comments WHERE movie_id = ${movieId} ORDER BY created_at DESC`;
                return { statusCode: 200, body: JSON.stringify(cRows) };
            default:
                return { statusCode: 400, body: "Invalid Action" };
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
