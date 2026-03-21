/* === Carta Cumpleaños - App === */

let audioCtx;

// Sonido al abrir
function sonidoAbrir() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
}

// Melodía "Cumpleaños feliz" completa
function tocarMelodia() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const notas = [
            { f: 523.25, t: 0, d: 0.2 },
            { f: 523.25, t: 0.25, d: 0.2 },
            { f: 587.33, t: 0.5, d: 0.45 },
            { f: 523.25, t: 1.0, d: 0.45 },
            { f: 698.46, t: 1.5, d: 0.45 },
            { f: 659.25, t: 2.0, d: 0.8 },
            
            { f: 523.25, t: 3.0, d: 0.2 },
            { f: 523.25, t: 3.25, d: 0.2 },
            { f: 587.33, t: 3.5, d: 0.45 },
            { f: 523.25, t: 4.0, d: 0.45 },
            { f: 783.99, t: 4.5, d: 0.45 },
            { f: 698.46, t: 5.0, d: 0.8 },
            
            { f: 523.25, t: 6.0, d: 0.2 },
            { f: 523.25, t: 6.25, d: 0.2 },
            { f: 1046.50, t: 6.5, d: 0.45 },
            { f: 880.00, t: 7.0, d: 0.45 },
            { f: 698.46, t: 7.5, d: 0.45 },
            { f: 659.25, t: 8.0, d: 0.45 },
            { f: 587.33, t: 8.5, d: 0.8 },
            
            { f: 932.33, t: 9.5, d: 0.2 },
            { f: 932.33, t: 9.75, d: 0.2 },
            { f: 880.00, t: 10.0, d: 0.45 },
            { f: 698.46, t: 10.5, d: 0.45 },
            { f: 783.99, t: 11.0, d: 0.45 },
            { f: 698.46, t: 11.5, d: 1.0 }
        ];
        const now = audioCtx.currentTime;
        notas.forEach(({ f, t, d }) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = f;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.08, now + t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
            osc.start(now + t);
            osc.stop(now + t + d);
        });
    } catch (e) {}
}

window.abrirCarta = function() {
    sonidoAbrir();
    tocarMelodia();

    document.body.classList.add('carta-abierta');
    document.getElementById('sobre-wrap').classList.add('abierto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('carta').classList.add('visible');
        document.getElementById('btn-magia')?.classList.add('visible');
        document.getElementById('btn-replay')?.classList.add('visible');
        document.getElementById('btn-descargar')?.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        crearParticulas();
        confeti();
    }, 350);
};

function cerrarCarta() {
    document.body.classList.remove('carta-abierta');
    document.getElementById('sobre-wrap')?.classList.remove('abierto');
    document.getElementById('carta')?.classList.remove('visible');
    document.getElementById('btn-magia')?.classList.remove('visible');
    document.getElementById('btn-replay')?.classList.remove('visible');
    document.getElementById('btn-descargar')?.classList.remove('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function explosionMagica(event) {
    const emojis = ['💖', '✨', '🌸', '💫', '🦋', '⭐', '❤️‍🔥', '🎁'];
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'magia-particula';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 250;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 80; 
        const rot = (Math.random() - 0.5) * 1080;
        
        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        p.style.setProperty('--rot', rot + 'deg');
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
    
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
    } catch(e) {}
    
    // Confeti extra on click
    confeti(30);
}

async function descargarImagenes() {
    // Festejo primero (instantáneo)
    const modal = document.getElementById('modal-descarga');
    if (modal) modal.classList.add('activo');
    
    confeti(100);
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); 
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); 
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.7);
    } catch(e) {}

    const imagenes = [
        'imagen1.jpeg',
        'WhatsApp Image 2026-03-20 at 7.03.06 PM.jpeg',
        'WhatsApp Image 2026-03-20 at 7.03.07 PM.jpeg'
    ];
    
    // Truco para forzar descarga: usar fetch para generar un objeto Blob local
    for (const imgSrc of imagenes) {
        try {
            const response = await fetch(imgSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = imgSrc; // Nombre del archivo que se descargará
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Liberar memoria
            setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        } catch (error) {
            console.error('Error usando fetch, usando fallback', error);
            // Fallback en caso de que fetch falle (por ejemplo por block de CORS local)
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = imgSrc;
            a.download = imgSrc;
            a.target = '_blank'; // Al menos abrir en ventana nueva para no romper la carta
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        // Pausa breve entre cada imagen para que el navegador procese los archivos individualmente
        await new Promise(r => setTimeout(r, 400));
    }
}

// Confeti
function confeti(cantidad = 70) {
    let c = document.getElementById('confetti-canvas');
    if (!c) {
        c = document.createElement('canvas');
        c.id = 'confetti-canvas';
        document.body.appendChild(c);
    }
    c.style.display = 'block';
    const ctx = c.getContext('2d');
    c.width = innerWidth;
    c.height = innerHeight;

    const colores = ['#d4af37', '#b8860b', '#e8d5d8', '#f5e6d3'];
    const part = [];

    for (let i = 0; i < cantidad; i++) {
        part.push({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            s: Math.random() * 5 + 3,
            col: colores[Math.floor(Math.random() * colores.length)],
            vy: Math.random() * 1.8 + 1.2,
            vx: (Math.random() - 0.5) * 1.2,
            r: Math.random() * 360,
            vr: (Math.random() - 0.5) * 6
        });
    }

    function anim() {
        ctx.clearRect(0, 0, c.width, c.height);
        part.forEach((p, i) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.r * Math.PI / 180);
            ctx.fillStyle = p.col;
            ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s);
            ctx.restore();
            p.y += p.vy;
            p.x += p.vx;
            p.r += p.vr;
            if (p.y > c.height + 15) part.splice(i, 1);
        });
        if (part.length) requestAnimationFrame(anim);
        else c.style.display = 'none';
    }
    anim();
}

// Partículas de fondo
function crearParticulas() {
    const cont = document.getElementById('particulas');
    if (!cont || cont.querySelector('.particula')) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particula';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.animationDuration = (10 + Math.random() * 10) + 's';
        cont.appendChild(p);
    }
}

// Lightbox para fotos
function initLightbox() {
    const polaroids = document.querySelectorAll('.polaroid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCerrar = document.getElementById('lightbox-cerrar');

    if (!lightbox || !lightboxImg) return;

    polaroids.forEach(p => {
        const img = p.querySelector('img');
        if (img) {
            p.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('activo');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    function cerrarLightbox() {
        lightbox.classList.remove('activo');
        document.body.style.overflow = '';
    }

    if (lightboxCerrar) lightboxCerrar.addEventListener('click', cerrarLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarLightbox();
    });
}

// Easter egg: doble clic para más confeti
document.addEventListener('dblclick', () => {
    if (document.getElementById('carta')?.classList.contains('visible')) {
        confeti(40);
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initLightbox();

    document.getElementById('btn-magia')?.addEventListener('click', explosionMagica);
    document.getElementById('btn-descargar')?.addEventListener('click', descargarImagenes);
    document.getElementById('modal-cerrar')?.addEventListener('click', () => {
        document.getElementById('modal-descarga')?.classList.remove('activo');
    });

    document.getElementById('btn-replay')?.addEventListener('click', () => {
        cerrarCarta();
    });

    window.addEventListener('resize', () => {
        const c = document.getElementById('confetti-canvas');
        if (c && c.width !== innerWidth) {
            c.width = innerWidth;
            c.height = innerHeight;
        }
    });
});
