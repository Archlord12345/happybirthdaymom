import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// API pour récupérer la liste des fichiers MP3
app.get('/api/music-files', (req, res) => {
    const musicDir = path.join(__dirname, 'src', 'music');
    
    try {
        if (!fs.existsSync(musicDir)) {
            return res.json([]);
        }

        const files = fs.readdirSync(musicDir)
            .filter(file => file.endsWith('.mp3'))
            .sort()
            .map(file => ({
                name: file.replace('.mp3', '').replace(/[-_]/g, ' '),
                path: `/music/${file}`
            }));

        res.json(files);
    } catch (error) {
        console.error('Erreur lors de la lecture du dossier music:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Servir les fichiers MP3
app.use('/music', express.static(path.join(__dirname, 'src', 'music')));

// Fallback pour SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎉 Serveur d'anniversaire lancé sur http://localhost:${PORT}`);
    console.log(`🎵 Les musiques sont servies depuis /api/music-files`);
});
