import React, { useState, useRef, useEffect } from 'react';
import { Music, Music2, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const MusicPlayer = ({ autoPlayAfterInteract }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [tracks, setTracks] = useState([]);
    const [volume, setVolume] = useState(0.7);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef(null);

    // Charger dynamiquement tous les fichiers MP3 du dossier music
    useEffect(() => {
        const loadMusicFiles = async () => {
            setIsLoading(true);
            try {
                // Essayer d'abord l'API du serveur
                const response = await fetch('/api/music-files');
                if (response.ok) {
                    const files = await response.json();
                    if (files.length > 0) {
                        setTracks(files);
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.log("API serveur non disponible, utilisation des imports statiques");
            }

            // Fallback: charger les fichiers statiquement
            try {
                const modules = import.meta.glob('/src/music/*.mp3', { eager: true });
                const musicTracks = Object.entries(modules).map(([path, module]) => {
                    const fileName = path.split('/').pop().replace('.mp3', '');
                    return {
                        name: fileName.replace(/[-_]/g, ' ').toUpperCase(),
                        path: path.replace('/src', ''),
                        url: module.default || path
                    };
                });
                
                if (musicTracks.length > 0) {
                    setTracks(musicTracks);
                } else {
                    // Fallback final: utiliser les fichiers connus
                    setTracks([{
                        name: 'HAPPY BIRTHDAY SONG',
                        path: '/music/happybirthdaysong.mp3',
                        url: '/music/happybirthdaysong.mp3'
                    }]);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des musiques:", error);
                // Fallback ultime
                setTracks([{
                    name: 'HAPPY BIRTHDAY SONG',
                    path: '/music/happybirthdaysong.mp3',
                    url: '/music/happybirthdaysong.mp3'
                }]);
            }
            setIsLoading(false);
        };

        loadMusicFiles();
    }, []);

    // Mettre à jour la source audio quand la piste change
    useEffect(() => {
        if (audioRef.current && tracks.length > 0) {
            const track = tracks[currentTrackIndex];
            const trackUrl = track.url || track.path;
            audioRef.current.src = trackUrl;
            audioRef.current.volume = volume;
            
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.log("Lecture impossible:", err);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrackIndex, tracks]);

    // Autoplay après interaction
    useEffect(() => {
        if (autoPlayAfterInteract && audioRef.current && tracks.length > 0) {
            const playAudio = async () => {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay bloqué, en attente d'interaction utilisateur");
                }
            };
            playAudio();
        }
    }, [autoPlayAfterInteract, tracks]);

    const toggleMusic = () => {
        if (!audioRef.current || tracks.length === 0) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(err => {
                console.log("Erreur de lecture:", err);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    const nextTrack = () => {
        if (tracks.length > 0) {
            const newIndex = (currentTrackIndex + 1) % tracks.length;
            setCurrentTrackIndex(newIndex);
            setIsPlaying(true);
        }
    };

    const prevTrack = () => {
        if (tracks.length > 0) {
            const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            setCurrentTrackIndex(newIndex);
            setIsPlaying(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleTrackEnd = () => {
        // Passer automatiquement à la piste suivante
        nextTrack();
    };

    const trackName = tracks.length > 0 
        ? tracks[currentTrackIndex].name
        : (isLoading ? 'Chargement...' : 'Aucune musique');

    return (
        <>
            <audio 
                ref={audioRef}
                onEnded={handleTrackEnd}
                crossOrigin="anonymous"
            />
            
            <div className="music-player-container">
                {/* Affichage de la piste actuelle */}
                {tracks.length > 0 && (
                    <div className="track-info">
                        <p className="track-name">{trackName}</p>
                        <p className="track-counter">{currentTrackIndex + 1} / {tracks.length}</p>
                    </div>
                )}

                {/* Contrôles de lecture */}
                <div className="player-controls">
                    <button
                        className="control-btn prev-btn"
                        onClick={prevTrack}
                        title="Piste précédente"
                        disabled={tracks.length === 0 || isLoading}
                    >
                        <SkipBack size={20} />
                    </button>

                    <button
                        className="control-btn play-btn"
                        onClick={toggleMusic}
                        title={isPlaying ? "Pause" : "Lecture"}
                        disabled={tracks.length === 0 || isLoading}
                    >
                        {isPlaying ? <Music2 size={28} /> : <Music size={28} />}
                    </button>

                    <button
                        className="control-btn next-btn"
                        onClick={nextTrack}
                        title="Piste suivante"
                        disabled={tracks.length === 0 || isLoading}
                    >
                        <SkipForward size={20} />
                    </button>

                    {/* Contrôle du volume */}
                    <div className="volume-control-wrapper">
                        <button
                            className="control-btn volume-btn"
                            onClick={() => setShowVolumeControl(!showVolumeControl)}
                            title="Volume"
                        >
                            <Volume2 size={20} />
                        </button>
                        {showVolumeControl && (
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                                title="Ajuster le volume"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;
