// JavaScript to handle track selection
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('hsi');
    const tracklist = document.querySelectorAll('.tracklist a');

    tracklist.forEach(track => {
        track.addEventListener('click', function (e) {
            e.preventDefault();
            const src = this.getAttribute('data-src');
            audio.src = src;
            audio.play(); // Auto-play the selected track
        });
    });
});