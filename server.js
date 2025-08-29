const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files seperti index.html

// Endpoint untuk fetch data dari API melalui server (proxy)
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

// Endpoint untuk proxy gambar (thumbnail)
app.get('/proxy/image', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send('No URL provided');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        // Set header untuk gambar
        res.set('Content-Type', response.headers.get('content-type'));
        response.body.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to proxy image');
    }
});

// Endpoint untuk proxy download video/file (streaming)
app.get('/proxy/download', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send('No URL provided');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file');
        
        // Set header untuk download
        res.set('Content-Type', response.headers.get('content-type'));
        res.set('Content-Disposition', `attachment; filename="video.mp4"`); // Adjust filename jika perlu
        
        response.body.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to proxy download');
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
