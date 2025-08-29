const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html dan aset statis

// Endpoint untuk proxy API download
app.post('/api/download', async (req, res) => {
    const { url } = req.body;
    const apiKey = 'xyz-key_1fzgS7F28d';
    const apiUrl = `https://xyz-rest-api.vercel.app/download/xnxx?apikey=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch API' });
    }
});

// Endpoint untuk proxy API search
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    const apiKey = 'xyz-key_1fzgS7F28d';
    const apiUrl = `https://xyz-rest-api.vercel.app/search/xnxx?apikey=${apiKey}&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch search API' });
    }
});

// Endpoint untuk proxy gambar (thumbnail)
app.get('/proxy/image', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send('No URL provided');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');
        res.set('Content-Type', response.headers.get('content-type'));
        response.body.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to proxy image');
    }
});

// Endpoint untuk proxy download video/file
app.get('/proxy/download', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send('No URL provided');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file');
        res.set('Content-Type', response.headers.get('content-type'));
        res.set('Content-Disposition', `attachment; filename="video.mp4"`);
        response.body.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to proxy download');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});