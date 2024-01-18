document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('hsi');
    const tracklist = document.querySelectorAll('.tracklist a');
    const currentlyPlaying = document.getElementById('currentlyPlaying'); // Get the div element in the footer

    let currentTrackIndex = -1; // Initialize the current track index to -1

    // Function to update the currently playing track
    function updateCurrentlyPlaying(trackName) {
        if (trackName) {
            currentlyPlaying.textContent = `now playing... ${trackName}`;
        } else {
            currentlyPlaying.textContent = "roll up & press play...";
        }
    }

    // Function to play the next track
    function playNextTrack() {
        if (currentTrackIndex < tracklist.length - 1) {
            currentTrackIndex++;
            const nextTrack = tracklist[currentTrackIndex];
            const src = nextTrack.getAttribute('data-src');
            audio.src = src;
            audio.play();
            updateCurrentlyPlaying(nextTrack.textContent);
        } else {
            // All tracks have been played, stop the audio player
            audio.pause();
            audio.currentTime = 0; // Reset the playback position to the beginning
            currentTrackIndex = -1; // Reset the current track index to -1
            updateCurrentlyPlaying(); // Reset the currently playing text to initial state
        }
    }

    // Event listener to play the selected track from the tracklist
    tracklist.forEach((track, index) => {
        track.addEventListener('click', function (e) {
            e.preventDefault();
            currentTrackIndex = index;
            const src = this.getAttribute('data-src');
            audio.src = src;
            audio.play();
            updateCurrentlyPlaying(this.textContent);
        });
    });

    // Event listener to check when the current track ends
    audio.addEventListener('ended', playNextTrack);

    // Event listener to handle the "play" button click on the audio player
    audio.addEventListener('play', function () {
        if (currentTrackIndex === -1) {
            playNextTrack(); // Automatically play the first track if none is currently selected
        }
    });

    // Set the initial text for 'currentlyPlaying' when the page loads
    updateCurrentlyPlaying();
});
