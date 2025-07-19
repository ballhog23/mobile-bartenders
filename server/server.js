import app from './app.js';

// server config
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 server running on http://localhost:${PORT}/`))