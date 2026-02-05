document.addEventListener("DOMContentLoaded", function() {
    const storageKey: string = 'retro_hit_counter';
    let count: string | null = localStorage.getItem(storageKey);

    if (!count) {
        // Startwert zwischen 10000 und 50000 für Glaubwürdigkeit
        count = (Math.floor(Math.random() * 40000) + 10000).toString();
    } else {
        // Zufälliger Anstieg zwischen 1 und 5 bei jedem Reload
        count = (parseInt(count) + Math.floor(Math.random() * 5) + 1).toString();
    }
    
    localStorage.setItem(storageKey, count);

    // Zahl formatieren (6-stellig mit führenden Nullen)
    const countStr: string = count.padStart(6, '0');

    // Canvas erstellen um das Bild zu generieren
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    
    if (!ctx) return;

    // Maße des Counters
    const width: number = 120;
    const height: number = 30;
    canvas.width = width;
    canvas.height = height;

    // Hintergrund (Schwarz)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Rahmen (3D Inset Effekt - Grau)
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, width, height);

    // Text (Rot, Digital-Look)
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillStyle = '#FF0000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(countStr, width / 2, height / 2 + 2);

    // Echtes Bild-Element erzeugen
    const img: HTMLImageElement = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.alt = "Besucherzähler";
    img.title = "Sie sind Besucher Nr. " + countStr;
    
    // Ins DOM einfügen
    const container: HTMLElement | null = document.getElementById('hit-counter');
    if (container) {
        container.appendChild(img);
    }
});