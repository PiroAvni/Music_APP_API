const express = require('express');
const cors = require('cors');

const app = express();

const music = require('./Data/albums.json')

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send("The music api")
})

// API endpoints
app.get('/albums', (req, res) => {
    res.json(music);
  });
  
  app.get('/albums/:albumTitle', (req, res) => {
    const albumTitle = req.params.albumTitle;
    const album = music.find((album) => album.title.toLowerCase() === albumTitle.toLowerCase());
    if (!album) {
      return res.json({ error: 'Album not found' });
    }
    res.json(album);
  });
  
  app.get('/albums/:albumTitle/songs/:songTitle', (req, res) => {
    const albumTitle = req.params.albumTitle;
    const songTitle = req.params.songTitle;
    const album = music.find((album) => album.title.toLowerCase() === albumTitle.toLowerCase());
    if (!album) {
      return res.json({ error: 'Album not found' });
    }
    const song = album.songs.find((song) => song.title.toLowerCase() === songTitle.toLowerCase());
    if (!song) {
      return res.json({ error: 'Song not found' });
    }
    res.json(song);
  });
  
  // Run the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
module.exports = app