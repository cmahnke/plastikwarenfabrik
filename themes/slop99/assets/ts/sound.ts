document.addEventListener("DOMContentLoaded", function() {
    // AudioContext initialisieren (Cross-Browser)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return; // Kein Support

    const audioCtx = new AudioContext();

    function playClickSound() {
        // AudioContext muss oft durch User-Interaktion aktiviert werden
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Retro "Blip" Sound Konfiguration
        oscillator.type = 'square'; // Square Wave klingt schön nach 8-bit Computer
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);

        // Lautstärkehüllkurve (kurz und knackig)
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
    }

    // Event Listener für alle Links und Buttons
    document.addEventListener('mousedown', function(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON') {
            playClickSound();
        }
    });
});