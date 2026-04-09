/* ═══════════════════════════════════════════════════════════════════
   HACKBOARD AI — Shared App Core
   All shared logic: auth guard, constants, helpers, Firestore
   listeners, renderers, charts, timers, overlays.
   ═══════════════════════════════════════════════════════════════════ */

// Namespace
window.HB = window.HB || {};

(function(HB) {
  'use strict';

  // ─── CONSTANTS ──────────────────────────────────────────────────
  const ADMIN_EMAIL = 'admincse2@hackboard.ai';

  const BADGE_NAMES = {
    innovative: 'MOST INNOVATIVE', crowd: 'CROWD FAVORITE',
    dark: 'DARK HORSE', pitch: 'BEST PITCH', fan: 'FAN FAVORITE'
  };
  const BADGE_CLASSES = {
    innovative: 'badge-innovative', crowd: 'badge-crowd',
    dark: 'badge-dark', pitch: 'badge-pitch', fan: 'badge-fan'
  };

  const SEED_TEAMS = [
    { name: 'Neural Beats', project: 'AI Music Composer', color: '#e8253a', genre: 'Lo-Fi AI', members: ['Asha', 'Leo', 'Dev'], desc: 'Real-time AI that composes original tracks based on your mood.', badges: ['innovative', 'crowd'], bpm: 142, score: 355, votes: 0, round1: 180, round2: 175 },
    { name: 'Code Vinyl', project: 'Retro Dev Tools', color: '#4a9eff', genre: 'Synthwave UX', members: ['Sam', 'Priya', 'Jin'], desc: 'Bringing back the joy of coding with retro-styled dev tools.', badges: ['dark'], bpm: 128, score: 333, votes: 0, round1: 160, round2: 173 },
    { name: 'Flux Reactor', project: 'Real-time Collab', color: '#9b6dff', genre: 'Punk DevOps', members: ['Riya', 'Kai', 'Zara'], desc: 'Zero-latency collaborative coding environment.', badges: ['pitch'], bpm: 115, score: 308, votes: 0, round1: 156, round2: 152 },
    { name: 'Groove OS', project: 'Music-first OS', color: '#2ecc71', genre: 'Neo-Soul Data', members: ['Omar', 'Nina', 'Felix'], desc: 'An operating system where everything has a beat.', badges: [], bpm: 98, score: 285, votes: 0, round1: 142, round2: 143 },
    { name: 'Bass Drop', project: 'Sound Visualizer', color: '#ff7043', genre: 'Garage ML', members: ['Tia', 'Marco', 'Suki'], desc: 'Real-time 3D sound visualization using WebGL and ML.', badges: ['fan'], bpm: 88, score: 265, votes: 0, round1: 133, round2: 132 },
    { name: 'Echo Chamber', project: 'Ambient Work App', color: '#f5c842', genre: 'Ambient Cloud', members: ['Bea', 'Yuki', 'Ash'], desc: 'Productivity app that adapts ambient sound to your workflow.', badges: [], bpm: 72, score: 237, votes: 0, round1: 118, round2: 119 },
  ];

  // ─── SHARED STATE ───────────────────────────────────────────────
  let teams = [];
  let multiplier = 1;
  let announcements = ['HACKATHON IS LIVE — TEAMS COMPETING'];
  let prevRanks = {};
  let currentNowPlayingId = null;
  let lastWinnerShown = '';
  let lastMultiplierTimestamp = null;
  let isFirstEventCallback = true;
  let roundTimers = { r1Start: '', r1End: '', r2Start: '', r2End: '' };
  let timerInterval = null;
  let unsubscribeTeams = null;
  let unsubscribeEvent = null;

  // Charts (managed internally, updated not recreated)
  let barChart = null, pieChart = null, radarChart = null;
  let lastTeamCount = 0;

  // Render debounce
  let renderFrame = null;

  // ─── EXPORTS ────────────────────────────────────────────────────
  HB.ADMIN_EMAIL = ADMIN_EMAIL;
  HB.BADGE_NAMES = BADGE_NAMES;
  HB.BADGE_CLASSES = BADGE_CLASSES;
  HB.getTeams = () => teams;
  HB.getMultiplier = () => multiplier;
  HB.getCurrentNowPlayingId = () => currentNowPlayingId;
  HB.getRoundTimers = () => roundTimers;

  // ─── AUTH GUARD ─────────────────────────────────────────────────
  // Returns a Promise that resolves with the user when auth is confirmed.
  // Injects a loading screen and blocks the app until auth resolves.
  HB.initAuthGuard = function(options = {}) {
    const { requireAdmin = false, appElementId = 'main-app' } = options;

    return new Promise((resolve, reject) => {
      let resolved = false;

      window.auth.onAuthStateChanged(user => {
        if (resolved) return;
        resolved = true;

        const loadingEl = document.getElementById('auth-loading');
        const appEl = document.getElementById(appElementId);
        const authTextEl = document.getElementById('auth-text');
        const authErrorEl = document.getElementById('auth-error-text');

        if (!user) {
          // Not logged in
          if (authTextEl) authTextEl.style.display = 'none';
          if (authErrorEl) { authErrorEl.textContent = 'NOT AUTHENTICATED — REDIRECTING TO LOGIN...'; authErrorEl.style.display = 'block'; }
          setTimeout(() => { window.location.href = 'login.html'; }, 1000);
          reject(new Error('Not authenticated'));
          return;
        }

        if (requireAdmin && user.email !== ADMIN_EMAIL) {
          // Not admin
          if (authTextEl) authTextEl.style.display = 'none';
          if (authErrorEl) { authErrorEl.textContent = 'ACCESS DENIED — ADMIN ONLY'; authErrorEl.style.display = 'block'; }
          setTimeout(() => { window.location.href = 'login.html'; }, 1200);
          reject(new Error('Not admin'));
          return;
        }

        // Auth confirmed — show the app
        if (appEl) appEl.classList.remove('auth-hidden');
        if (loadingEl) {
          loadingEl.classList.add('fade-out');
          setTimeout(() => loadingEl.remove(), 500);
        }

        resolve(user);
      });
    });
  };

  HB.signOut = function() {
    window.auth.signOut().then(() => { window.location.href = 'login.html'; });
  };

  // ─── HELPERS ────────────────────────────────────────────────────
  HB.totalScore = function(t) {
    return Math.round((t.round1 + t.round2) * multiplier);
  };

  HB.maxScore = function() {
    return teams.length ? Math.max(...teams.map(HB.totalScore)) : 1;
  };

  HB.sorted = function() {
    return [...teams].sort((a, b) => HB.totalScore(b) - HB.totalScore(a));
  };

  HB.getInitials = function(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  HB.formatDuration = function(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ─── SEED DATA ──────────────────────────────────────────────────
  HB.seedIfEmpty = async function() {
    const snap = await window.db.collection('teams').limit(1).get();
    if (snap.empty) {
      const batch = window.db.batch();
      SEED_TEAMS.forEach(team => { batch.set(window.db.collection('teams').doc(), team); });
      batch.set(window.db.collection('event').doc('current'), {
        winner: '', winnerId: '', winnerColor: '',
        announcement: 'HACKATHON IS LIVE — TEAMS COMPETING',
        multiplier: 1, multiplierName: '',
        r1Start: '', r1End: '', r2Start: '', r2End: '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      await batch.commit();
    }
  };

  // ─── FIRESTORE LISTENERS ────────────────────────────────────────
  // Options: { onTeamsUpdate, onEventUpdate, isAdmin }
  HB.stopListeners = function() {
    if (typeof unsubscribeTeams === 'function') {
      try { unsubscribeTeams(); } catch (_) {}
    }
    if (typeof unsubscribeEvent === 'function') {
      try { unsubscribeEvent(); } catch (_) {}
    }
    unsubscribeTeams = null;
    unsubscribeEvent = null;
  };

  HB.startListeners = function(callbacks = {}) {
    const { onTeamsUpdate, onEventUpdate, isAdmin = false } = callbacks;
    // Ensure idempotent startup: avoid duplicate realtime subscriptions.
    HB.stopListeners();
    isFirstEventCallback = true;

    // Teams listener
    unsubscribeTeams = window.db.collection('teams').onSnapshot(snapshot => {
      teams = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        teams.push({
          id: doc.id,
          name: data.name || '',
          project: data.project || '',
          color: data.color || '#e8253a',
          genre: data.genre || '',
          members: Array.isArray(data.members) ? data.members.join(', ') : (data.members || ''),
          desc: data.desc || '',
          badges: data.badges || [],
          bpm: data.bpm || 80,
          score: data.score || 0,
          votes: data.votes || 0,
          round1: data.round1 || 0,
          round2: data.round2 || 0
        });
      });

      // Debounced rendering
      if (renderFrame) cancelAnimationFrame(renderFrame);
      renderFrame = requestAnimationFrame(() => {
        HB.renderTracklist(isAdmin);
        HB.setNowPlaying(currentNowPlayingId);
        HB.updateCharts();
        HB.populateSelects(isAdmin);
        if (onTeamsUpdate) onTeamsUpdate(teams);
      });
    }, err => console.error('Teams listener error:', err));

    // Event listener
    unsubscribeEvent = window.db.collection('event').doc('current').onSnapshot(doc => {
      if (!doc.exists) return;
      const data = doc.data();

      // On first callback, just record current state — don't show overlays
      const isInitial = isFirstEventCallback;
      isFirstEventCallback = false;

      // Multiplier — only show overlay for NEW changes (not on initial load)
      if (data.multiplier && data.multiplier !== multiplier) {
        multiplier = data.multiplier;

        if (!isInitial && data.multiplierName && multiplier > 1) {
          HB.showMultiplierOverlay(multiplier, data.multiplierName);
        }

        if (data.timestamp) lastMultiplierTimestamp = data.timestamp.toMillis();

        // Re-render with new multiplier
        if (renderFrame) cancelAnimationFrame(renderFrame);
        renderFrame = requestAnimationFrame(() => {
          HB.renderTracklist(isAdmin);
          HB.setNowPlaying(currentNowPlayingId);
          HB.updateCharts();
        });
      }

      // Announcement
      if (data.announcement) {
        announcements = [data.announcement.toUpperCase()];
        HB.updateMarquee();
      }

      // Winner — only show overlay for NEW winners (not on initial load)
      if (data.winner && data.winner !== lastWinnerShown) {
        lastWinnerShown = data.winner;
        if (!isInitial) {
          HB.showWinnerOverlay(data.winner, data.winnerColor || '#f5c842');
        }
      } else if (!data.winner) {
        lastWinnerShown = '';  
      }

      // Timer data
      roundTimers = {
        r1Start: data.r1Start || '',
        r1End: data.r1End || '',
        r2Start: data.r2Start || '',
        r2End: data.r2End || ''
      };

      if (!timerInterval) HB.startTimerTick();
      HB.updateTimerDisplay();

      if (onEventUpdate) onEventUpdate(data);
    }, err => console.error('Event listener error:', err));
  };

  // ─── POPULATE SELECTS ───────────────────────────────────────────
  HB.populateSelects = function(isAdmin) {
    const ids = isAdmin
      ? ['badge-team-select', 'winner-select', 'h2h-a', 'h2h-b']
      : ['h2h-a', 'h2h-b'];

    ids.forEach(id => {
      const sel = document.getElementById(id);
      if (!sel) return;
      const current = sel.value;
      sel.innerHTML = teams.map(t =>
        `<option value="${t.id}">${t.name}</option>`
      ).join('');
      if (current && teams.find(x => x.id === current)) sel.value = current;
    });
  };

  // ─── TRACKLIST RENDERER ─────────────────────────────────────────
  HB.renderTracklist = function(isAdmin) {
    const s = HB.sorted();
    const tl = document.getElementById('tracklist');
    if (!tl) return;
    tl.innerHTML = '';

    s.forEach((t, i) => {
      const rank = i + 1;
      const rc = prevRanks[t.id] && prevRanks[t.id] < rank ? 'rank-down' :
                 prevRanks[t.id] && prevRanks[t.id] > rank ? 'rank-up' : '';
      const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
      const score = HB.totalScore(t);
      const spd = (3 / (t.bpm / 80)).toFixed(2);
      const init = HB.getInitials(t.name);

      const item = document.createElement('div');
      item.className = `track-item ${rc}`;
      item.id = `track-${t.id}`;
      item.onclick = () => HB.setNowPlaying(t.id);

      let voteBtn = '';
      if (!isAdmin) {
        voteBtn = `<button onclick="event.stopPropagation();HB.voteForTeam('${t.id}')"
          style="background:none;border:1px solid var(--gray3);color:var(--cream-dim);padding:3px 8px;border-radius:3px;cursor:pointer;font-family:'Space Mono',monospace;font-size:8px;letter-spacing:1px;transition:.2s;flex-shrink:0"
          onmouseover="this.style.borderColor='var(--red)';this.style.color='var(--red)'"
          onmouseout="this.style.borderColor='var(--gray3)';this.style.color='var(--cream-dim)'"
        >♥</button>`;
      }

      item.innerHTML = `
        <div class="track-rank ${rankClass}">${rank === 1 ? '♛' : rank === 2 ? '♜' : rank === 3 ? '♝' : rank}</div>
        <div class="track-vinyl">
          <div class="vinyl-disk spin" style="width:36px;height:36px;border-radius:50%;background:conic-gradient(#111 0deg,#1a1a1a 45deg,#111 90deg,#1a1a1a 135deg,#111 180deg,#1a1a1a 225deg,#111 270deg,#1a1a1a 315deg);animation-duration:${spd}s">
            <div class="vinyl-label" style="width:14px;height:14px;background:${t.color};left:11px;top:11px;font-size:5px;display:flex;align-items:center;justify-content:center;color:#000;font-weight:700">${init}</div>
          </div>
        </div>
        <div class="track-info">
          <div class="track-name">${t.name}</div>
          <div class="track-genre">${t.genre}</div>
        </div>
        <div>
          <div class="track-score ticking" id="ts-${t.id}">${score}</div>
          <div class="track-bpm">${isAdmin ? t.bpm.toFixed(0) + ' BPM' : (t.votes || 0) + ' VOTES'}</div>
        </div>
        ${voteBtn}`;

      tl.appendChild(item);
      prevRanks[t.id] = rank;
    });

    const countEl = document.getElementById('team-count');
    if (countEl) countEl.innerText = `${teams.length} ACTS`;
  };

  // ─── NOW PLAYING ────────────────────────────────────────────────
  HB.setNowPlaying = function(teamId) {
    const t = teams.find(x => x.id == teamId) || HB.sorted()[0];
    if (!t) return;
    currentNowPlayingId = t.id;

    const score = HB.totalScore(t);
    const max = HB.maxScore();
    const init = HB.getInitials(t.name);
    const spd = (3 / (t.bpm / 80)).toFixed(2);

    // Highlight active track
    document.querySelectorAll('.track-item').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`track-${t.id}`);
    if (el) el.classList.add('active');

    // Update hero section
    const setTextById = (id, text) => { const e = document.getElementById(id); if (e) e.textContent = text; };
    setTextById('np-team', t.name);
    setTextById('np-project', t.project);
    setTextById('np-score', score);
    setTextById('np-bpm', t.bpm.toFixed(0));
    setTextById('np-rank', t.genre);

    // Big vinyl
    const bv = document.getElementById('big-vinyl');
    if (bv) {
      bv.style.background = `conic-gradient(#111 0deg,${t.color}22 45deg,#111 90deg,${t.color}11 135deg,#111 180deg,${t.color}22 225deg,#111 270deg,${t.color}11 315deg)`;
      bv.style.animationDuration = spd + 's';
    }
    const vl = document.getElementById('vinyl-label');
    if (vl) { vl.style.background = t.color; vl.textContent = init; }

    // Score bar
    const bar = document.getElementById('np-bar');
    if (bar) {
      bar.style.width = (score / max * 100) + '%';
      bar.style.background = t.color;
    }

    // Badges
    const bdiv = document.getElementById('np-badges');
    if (bdiv) {
      bdiv.innerHTML = t.badges.map(b =>
        `<span class="badge ${BADGE_CLASSES[b]}">${BADGE_NAMES[b]}</span>`
      ).join('');
    }

    // Round breakdown (judge panel) if present
    const jr = document.getElementById('judge-rows');
    if (jr) {
      const roundData = [{ label: 'ROUND 1', val: t.round1 }, { label: 'ROUND 2', val: t.round2 }];
      const maxRound = Math.max(t.round1, t.round2, 1);
      jr.innerHTML = roundData.map(r => `
        <div class="judge-row">
          <span class="judge-name">${r.label}</span>
          <div class="judge-bar"><div class="judge-bar-fill" style="width:${r.val / maxRound * 100}%;background:${t.color}"></div></div>
          <span class="judge-score">${r.val}</span>
        </div>
      `).join('');
    }

    // Round info boxes (admin view)
    const r1box = document.getElementById('r1-box-val');
    const r2box = document.getElementById('r2-box-val');
    if (r1box) r1box.textContent = t.round1;
    if (r2box) r2box.textContent = t.round2;
  };

  // ─── CHARTS (Smart Update) ──────────────────────────────────────
  HB.updateCharts = function() {
    if (!teams.length) return;
    const s = HB.sorted();
    const labels = s.map(t => t.name);
    const data = s.map(t => HB.totalScore(t));
    const colors = s.map(t => t.color);

    const barCanvas = document.getElementById('bar-chart');
    const pieCanvas = document.getElementById('pie-chart');

    // If team count changed, must rebuild; otherwise just update data
    if (teams.length !== lastTeamCount) {
      // Rebuild charts
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
      barChart = null;
      pieChart = null;
      lastTeamCount = teams.length;
    }

    // Bar chart
    if (barCanvas) {
      if (barChart) {
        barChart.data.labels = labels;
        barChart.data.datasets[0].data = data;
        barChart.data.datasets[0].backgroundColor = colors;
        barChart.update('none'); // Skip animation for smooth update
      } else {
        barChart = new Chart(barCanvas, {
          type: 'bar',
          data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, borderRadius: 4 }] },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#888', font: { family: 'Space Mono', size: 9 } }, grid: { color: '#1a1a1a' } },
              y: { ticks: { color: '#888', font: { family: 'Space Mono', size: 9 } }, grid: { color: '#1a1a1a' } }
            }
          }
        });
      }
    }

    // Pie chart
    if (pieCanvas) {
      if (pieChart) {
        pieChart.data.labels = labels;
        pieChart.data.datasets[0].data = data;
        pieChart.data.datasets[0].backgroundColor = colors;
        pieChart.update('none');
      } else {
        pieChart = new Chart(pieCanvas, {
          type: 'doughnut',
          data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '65%' }
        });
      }
    }
  };

  // ─── HEAD TO HEAD ───────────────────────────────────────────────
  HB.renderH2H = function() {
    if (teams.length < 2) return;
    const idA = document.getElementById('h2h-a')?.value;
    const idB = document.getElementById('h2h-b')?.value;
    const a = teams.find(t => t.id === idA);
    const b = teams.find(t => t.id === idB);
    if (!a || !b || a === b) return;

    const cats = ['Round 1', 'Round 2', 'Votes', 'Total'];
    const radarCanvas = document.getElementById('radar-chart');
    if (!radarCanvas) return;

    if (radarChart) {
      // Smart update
      radarChart.data.datasets[0].label = a.name;
      radarChart.data.datasets[0].data = [a.round1, a.round2, a.votes, HB.totalScore(a)];
      radarChart.data.datasets[0].borderColor = a.color;
      radarChart.data.datasets[0].backgroundColor = a.color + '33';
      radarChart.data.datasets[0].pointBackgroundColor = a.color;
      radarChart.data.datasets[1].label = b.name;
      radarChart.data.datasets[1].data = [b.round1, b.round2, b.votes, HB.totalScore(b)];
      radarChart.data.datasets[1].borderColor = b.color;
      radarChart.data.datasets[1].backgroundColor = b.color + '33';
      radarChart.data.datasets[1].pointBackgroundColor = b.color;
      radarChart.update('none');
    } else {
      radarChart = new Chart(radarCanvas, {
        type: 'radar',
        data: {
          labels: cats,
          datasets: [
            { label: a.name, data: [a.round1, a.round2, a.votes, HB.totalScore(a)], borderColor: a.color, backgroundColor: a.color + '33', borderWidth: 2, pointBackgroundColor: a.color },
            { label: b.name, data: [b.round1, b.round2, b.votes, HB.totalScore(b)], borderColor: b.color, backgroundColor: b.color + '33', borderWidth: 2, pointBackgroundColor: b.color }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#d4cfc4', font: { family: 'Space Mono', size: 10 } } } },
          scales: { r: { ticks: { color: '#555', backdropColor: 'transparent', font: { size: 9 } }, grid: { color: '#2a2a2a' }, pointLabels: { color: '#888', font: { family: 'Space Mono', size: 10 } }, min: 0 } }
        }
      });
    }
  };

  // ─── VOTING ─────────────────────────────────────────────────────
  HB.voteForTeam = async function(teamId) {
    try {
      await window.db.collection('teams').doc(teamId).update({
        votes: firebase.firestore.FieldValue.increment(1)
      });
    } catch (err) { console.error('Vote error:', err); }
  };

  // ─── MARQUEE ────────────────────────────────────────────────────
  HB.updateMarquee = function() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const text = announcements.map(a => `● ${a}`).join(' ');
    track.innerHTML = `<span>${text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>${text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
  };

  // ─── OVERLAYS ───────────────────────────────────────────────────
  HB.showMultiplierOverlay = function(val, name) {
    const ov = document.getElementById('mult-overlay');
    if (!ov) return;
    document.getElementById('mult-text').textContent = `${val}x`;
    document.getElementById('mult-sub').textContent = name;
    ov.classList.add('show');
    setTimeout(() => ov.classList.remove('show'), 3500);
  };

  HB.showWinnerOverlay = function(name, color) {
    const ov = document.getElementById('winner-overlay');
    if (!ov) return;
    document.getElementById('winner-text').textContent = name;
    const wv = document.getElementById('winner-vinyl');
    if (wv) {
      wv.style.background = `conic-gradient(#111 0deg,${color}44 45deg,#111 90deg,${color}22 135deg,#111 180deg,${color}44 225deg,#111 270deg,${color}22 315deg)`;
    }
    const wvl = document.getElementById('winner-vinyl-label');
    if (wvl) wvl.textContent = HB.getInitials(name);
    ov.classList.add('show');
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }
  };

  HB.closeWinner = function() {
    const ov = document.getElementById('winner-overlay');
    if (ov) ov.classList.remove('show');
  };

  // ─── TIMER ──────────────────────────────────────────────────────
  HB.startTimerTick = function() {
    if (timerInterval) return;
    timerInterval = setInterval(HB.updateTimerDisplay, 1000);
    HB.updateTimerDisplay();
  };

  HB.updateTimerDisplay = function() {
    HB._updateOneTimer('r1', roundTimers.r1Start, roundTimers.r1End);
    HB._updateOneTimer('r2', roundTimers.r2Start, roundTimers.r2End);
  };

  HB._updateOneTimer = function(prefix, startStr, endStr) {
    const countdownEl = document.getElementById(`${prefix}-countdown`);
    const statusEl = document.getElementById(`${prefix}-status`);
    if (!countdownEl || !statusEl) return;

    if (!startStr || !endStr) {
      countdownEl.textContent = '--:--:--';
      statusEl.textContent = 'NOT SET';
      statusEl.className = 'timer-card-status waiting';
      return;
    }

    const now = new Date();
    const start = new Date(startStr);
    const end = new Date(endStr);

    if (now < start) {
      countdownEl.textContent = HB.formatDuration(start - now);
      statusEl.textContent = 'STARTS IN';
      statusEl.className = 'timer-card-status waiting';
    } else if (now >= start && now < end) {
      countdownEl.textContent = HB.formatDuration(end - now);
      statusEl.textContent = '● LIVE';
      statusEl.className = 'timer-card-status active';
    } else {
      countdownEl.textContent = '00:00:00';
      statusEl.textContent = 'ENDED';
      statusEl.className = 'timer-card-status ended';
    }
  };

  // ─── CLOCK ──────────────────────────────────────────────────────
  HB.startClock = function() {
    const el = document.getElementById('clock');
    if (!el) return;
    setInterval(() => {
      el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);
    el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
  };

})(window.HB);
