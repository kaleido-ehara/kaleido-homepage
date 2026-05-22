/* Kaleidoscope SVG — 12-fold rotational symmetry via mirrored wedge.
   Inner shapes drift continuously (rAF) so the pattern keeps changing,
   not just the overall rotation. */
const { useMemo, useId, useRef, useEffect } = React;

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function Wedge({ palette, seed = 0, shapeRefs }) {
  const r = 500;

  // Shape config + per-shape animation parameters
  const shapes = useMemo(() => {
    const rng = mulberry32(seed * 9173 + 17);
    const out = [];
    out.push({ kind: 'arc', r1: r * 0.78, r2: r * 0.96, color: palette[0], op: 1 });
    out.push({ kind: 'triangle', p: [[r*0.5,0],[r*0.78,0],[r*0.62, r*0.18]], color: palette[1], op: 1 });
    out.push({ kind: 'arc', r1: r * 0.30, r2: r * 0.44, color: palette[2], op: 1 });
    out.push({ kind: 'triangle', p: [[0,0],[r*0.74,0],[r*0.55, r*0.18]], color: palette[3], op: 0.9 });
    out.push({ kind: 'triangle', p: [[r*0.16,0],[r*0.46,0],[r*0.32, r*0.10]], color: palette[4], op: 1 });
    out.push({ kind: 'triangle', p: [[r*0.46, r*0.04],[r*0.62, r*0.06],[r*0.54, r*0.16]], color: palette[5] || palette[0], op: 1 });
    for (let i = 0; i < 4; i++) {
      const radius = r * (0.22 + rng() * 0.55);
      const angle = rng() * Math.PI / 6;
      out.push({
        kind: 'dot',
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        rad: 5 + rng() * 9,
        color: palette[i % palette.length],
        op: 1,
      });
    }
    out.push({
      kind: 'line',
      x1: 0, y1: 0,
      x2: r * 0.74 * Math.cos(Math.PI/12),
      y2: r * 0.74 * Math.sin(Math.PI/12),
      color: palette[1], op: 0.9
    });

    // Attach per-shape animation parameters (drift + rotation + scale pulse)
    out.forEach((s, i) => {
      s._anim = {
        driftAmp: 12 + rng() * 22,        // pixels
        driftSpeed: 0.15 + rng() * 0.35,  // radians per second
        driftPhase: rng() * Math.PI * 2,
        rotSpeed: (rng() - 0.5) * 0.3,    // radians per second
        scaleAmp: 0.06 + rng() * 0.08,
        scaleSpeed: 0.2 + rng() * 0.4,
        scalePhase: rng() * Math.PI * 2,
        // Wobble direction (some shapes drift mainly radially, others tangentially)
        angleBias: rng() * Math.PI * 2,
      };
    });
    return out;
  }, [seed, palette.join(',')]);

  return (
    <g>
      {shapes.map((s, i) => {
        const setRef = el => {
          if (shapeRefs && shapeRefs.current) {
            shapeRefs.current[i] = { el, anim: s._anim };
          }
        };
        if (s.kind === 'arc') {
          const a1 = 0, a2 = Math.PI / 6;
          const x1o = s.r2 * Math.cos(a1), y1o = s.r2 * Math.sin(a1);
          const x2o = s.r2 * Math.cos(a2), y2o = s.r2 * Math.sin(a2);
          const x1i = s.r1 * Math.cos(a2), y1i = s.r1 * Math.sin(a2);
          const x2i = s.r1 * Math.cos(a1), y2i = s.r1 * Math.sin(a1);
          const d = `M ${x1o} ${y1o} A ${s.r2} ${s.r2} 0 0 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${s.r1} ${s.r1} 0 0 0 ${x2i} ${y2i} Z`;
          return (
            <g key={i} ref={setRef}>
              <path d={d} fill={s.color} opacity={s.op} />
            </g>
          );
        }
        if (s.kind === 'triangle') {
          const pts = s.p.map(([x, y]) => `${x},${y}`).join(' ');
          return (
            <g key={i} ref={setRef}>
              <polygon points={pts} fill={s.color} opacity={s.op} />
            </g>
          );
        }
        if (s.kind === 'dot') {
          return (
            <g key={i} ref={setRef}>
              <circle cx={s.x} cy={s.y} r={s.rad} fill={s.color} opacity={s.op} />
            </g>
          );
        }
        if (s.kind === 'line') {
          return (
            <g key={i} ref={setRef}>
              <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.color} strokeWidth="3" opacity={s.op} />
            </g>
          );
        }
        return null;
      })}
    </g>
  );
}

function Kaleidoscope({ palette, seed = 1, size = 800, className, style, speed = 1 }) {
  const id = useId().replace(/:/g, '_');
  const wedgeId = `wedge-${id}`;
  const shapeRefs = useRef([]);

  // rAF loop — mutate transform attributes directly on each shape group.
  // The wedge lives in <defs> but each <use> renders its current state, so
  // changes propagate to all 12 mirrored/rotated copies.
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = ((now - start) / 1000) * speed;
      shapeRefs.current.forEach(item => {
        if (!item || !item.el) return;
        const a = item.anim;
        const dx = Math.sin(t * a.driftSpeed + a.driftPhase) * a.driftAmp * Math.cos(a.angleBias);
        const dy = Math.cos(t * a.driftSpeed + a.driftPhase) * a.driftAmp * Math.sin(a.angleBias);
        const rot = (a.rotSpeed * t * 180 / Math.PI);
        const scl = 1 + Math.sin(t * a.scaleSpeed + a.scalePhase) * a.scaleAmp;
        item.el.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)}) scale(${scl.toFixed(3)}) rotate(${rot.toFixed(2)})`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Build 12 rotated copies (6 wedges, each mirrored)
  const copies = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * 60;
    copies.push(
      <g key={`a${i}`} transform={`rotate(${angle})`}>
        <use href={`#${wedgeId}`} />
      </g>
    );
    copies.push(
      <g key={`b${i}`} transform={`rotate(${angle}) scale(1,-1)`}>
        <use href={`#${wedgeId}`} />
      </g>
    );
  }

  return (
    <svg viewBox="-520 -520 1040 1040" className={className} style={style} aria-hidden="true">
      <defs>
        <g id={wedgeId}>
          <Wedge palette={palette} seed={seed} shapeRefs={shapeRefs} />
        </g>
        <radialGradient id={`fade-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`mask-${id}`}>
          <rect x="-520" y="-520" width="1040" height="1040" fill={`url(#fade-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#mask-${id})`}>{copies}</g>
      {/* Central jewel */}
      <circle cx="0" cy="0" r="14" fill={palette[0]} opacity="0.9" />
      <circle cx="0" cy="0" r="6" fill={palette[5] || palette[0]} />
    </svg>
  );
}

window.Kaleidoscope = Kaleidoscope;
