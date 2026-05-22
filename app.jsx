const { useState, useEffect, useRef } = React;

// ============ DATA ============
const SERVICES = [
  { num: '00', jp: '経営戦略', en: 'Management Strategy', desc: '全ての支援領域を束ねるコアドメイン。経営の方向性を定め、実行可能な戦略へと落とし込みます。' },
  { num: '01', jp: '人事・組織', en: 'HR & Organization', desc: '採用・評価・組織設計・人材育成。人的資本経営の実践を支援します。' },
  { num: '02', jp: 'マーケティング', en: 'Marketing', desc: '顧客獲得・LTV向上・デジタルマーケティング戦略の設計と実行支援。' },
  { num: '03', jp: 'ブランディング', en: 'Branding', desc: '企業・サービスブランドの構築。VI設計からブランド浸透まで一貫支援。' },
  { num: '04', jp: '広報PR', en: 'Public Relations', desc: 'メディア戦略・プレスリリース・SNS広報。パブリックイメージの最大化。' },
  { num: '05', jp: 'AI活用', en: 'AI Integration', desc: '業務へのAI導入・プロンプト設計・自動化ワークフロー構築で生産性を革新。' },
  { num: '06', jp: 'DX', en: 'Digital Transformation', desc: 'デジタル化戦略・ツール選定・社内定着まで、DX推進を伴走支援。' },
  { num: '07', jp: 'M&A / PMI', en: 'M&A · Post-Merger', desc: 'M&A戦略・デューデリジェンス・PMI（統合後マネジメント）の実行支援。' },
];

const APPROACH = [
  { num: '01', title: 'ヒアリング・診断', desc: '経営課題・組織状態・市場環境を深くヒアリングし、本質的な問いを設定します。' },
  { num: '02', title: '戦略設計', desc: '貴社固有の状況に合わせたオーダーメイドの戦略・施策ロードマップを策定。' },
  { num: '03', title: 'チーム編成', desc: '必要な専門性を持つコンサルタント・フリーランスを最適に組み合わせます。' },
  { num: '04', title: '実行支援', desc: '計画倒れにならないよう、施策実行を現場レベルまで伴走してサポート。' },
  { num: '05', title: '効果検証・改善', desc: '定量・定性の両面で成果を検証し、次の打ち手へとつなげます。' },
];

const WHY = [
  { num: '01', title: 'オーダーメイドの支援設計', desc: '業界標準のテンプレートではなく、貴社の状況・フェーズ・カルチャーに合わせてゼロから支援を設計します。二度と同じ形にはならない——それがカレイドの流儀です。' },
  { num: '02', title: '多領域をカバーする専門チーム', desc: '経営戦略からAI・M&Aまで、8つの専門ドメインを一社でカバー。複合的な課題にも、最適なチームを素早く編成して対応します。' },
  { num: '03', title: '戦略から実行まで一貫伴走', desc: '「提言で終わり」にしません。策定した戦略の実行フェーズまで責任を持って伴走し、現場に根付く成果を共に創ります。' },
];

// ============ PALETTES — vivid jewel tones ============
const PALETTES = {
  prism: ['#0a2fe6', '#e6173a', '#ffb800', '#00a866', '#c91488', '#00b5d9'],
  cobalt: ['#0a2fe6', '#00b5d9', '#5b1ad9', '#ffb800', '#e6173a', '#ffffff'],
  fire: ['#e6173a', '#ff6a00', '#ffb800', '#c91488', '#0a2fe6', '#ffffff'],
  forest: ['#00a866', '#0a8a9a', '#ffb800', '#e6173a', '#5b1ad9', '#ffffff'],
};

// ============ NAV ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#concept', label: 'Concept' },
    { href: '#services', label: 'Services' },
    { href: '#approach', label: 'Approach' },
    { href: '#why', label: 'Why Kaleido' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="nav-logo">
        <span className="dot"></span>KALEIDO
      </a>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <a href="#contact" className="nav-cta">Contact</a>
    </nav>
  );
}

// ============ REVEAL HOOK ============
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

// ============ HERO ============
function Hero({ palette, speed }) {
  const ref = useReveal();
  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-kaleido">
        <Kaleidoscope palette={palette} seed={3} speed={speed} />
      </div>
      <div className="hero-inner">
        <div className="hero-eyebrow reveal">Kaleido Consulting — Est. 2026</div>
        <h1 className="hero-title-jp reveal reveal-delay-1">
          同じ形の支援は、<br/>
          <span className="accent-mark-2">一つとしてない。</span>
        </h1>
        <p className="hero-title-en reveal reveal-delay-2">
          Never the same form, twice — bespoke consulting for every client.
        </p>
        <p className="hero-desc reveal reveal-delay-3">
          経営戦略・人事・マーケティング・AI活用まで、カレイドは多面的な専門性で貴社の成長に伴走します。テンプレートではなく、問いと対話から始まる、オーダーメイドの支援を。
        </p>
        <div className="hero-meta reveal reveal-delay-4">
          <span>Strategy</span>
          <span>/</span>
          <span>People</span>
          <span>/</span>
          <span>Brand</span>
          <span>/</span>
          <span>AI</span>
          <span>/</span>
          <span>M&amp;A</span>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="hero-scroll-line"></span>
      </div>
    </section>
  );
}

// ============ CONCEPT ============
function Concept({ palette, speed }) {
  const ref = useReveal();
  return (
    <section id="concept" className="concept" ref={ref}>
      <div className="concept-kaleido">
        <Kaleidoscope palette={palette} seed={11} speed={speed} />
      </div>
      <div className="section concept-inner" style={{ padding: '160px 56px' }}>
        <div className="reveal">
          <div className="section-label">Our Concept</div>
          <h2 className="section-title">
            なぜ、<br/>カレイドなのか。
          </h2>
          <p className="concept-quote">
            万華鏡が同じ形を<br/>
            二度と<span className="accent">見せないように</span>、<br/>
            私たちは貴社にだけ<br/>
            合った支援の形を、<br/>
            毎回ゼロから設計します。
          </p>
        </div>
        <div className="concept-body reveal reveal-delay-2">
          <p>テンプレートではなく、問いと対話から始まる。</p>
          <p>経営の本質に向き合い、オーダーメイドの戦略と実行で、企業の可能性を多面的に引き出す——それがカレイドです。</p>
          <p>業界に最適化された定型解ではなく、貴社にだけ合うひとつの解を。同じ景色を二度と映さない万華鏡のように、毎回、新しい形で。</p>
        </div>
      </div>
    </section>
  );
}

// ============ ETYMOLOGY ============
function Etymology() {
  const ref = useReveal();
  return (
    <section className="etymology section" ref={ref}>
      <div className="etymology-grid">
        <div className="etym-mark reveal">
          Kaleido
          <span className="sub">Etymology · 語源</span>
        </div>
        <div>
          <div className="etym-words">
            <div className="etym-word reveal reveal-delay-1">
              <div className="etym-word-key">kalos</div>
              <div className="gloss">美しい</div>
              <div className="greek">Ancient Greek</div>
            </div>
            <div className="etym-word reveal reveal-delay-2">
              <div className="etym-word-key">eidos</div>
              <div className="gloss">形態</div>
              <div className="greek">Ancient Greek</div>
            </div>
          </div>
          <p className="etym-text reveal reveal-delay-3">
            「Kaleido」はギリシャ語の <em>kalos</em>（美しい）と <em>eidos</em>（形態）を語源とする接頭辞。万華鏡＝<em>Kaleidoscope</em> の前半部分から来ており、変幻極まりない、二度と同じ形にはならないという意味を持ちます。多彩で多面的なコンサルティングのあり方を体現した名前です。
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
function Services({ palette, speed }) {
  const ref = useReveal();
  return (
    <section id="services" className="services" ref={ref}>
      <div className="services-kaleido">
        <Kaleidoscope palette={palette} seed={5} speed={speed} />
      </div>
      <div className="section">
        <div className="reveal">
          <div className="section-label">Services</div>
          <h2 className="section-title">支援領域</h2>
          <p className="section-lead">
            経営の全領域にわたる専門チームが、貴社の課題に応じて<br/>
            ベストな組み合わせで対応します。
          </p>
        </div>
        <div className="services-grid reveal reveal-delay-1">
          {SERVICES.map(s => (
            <div className="service" key={s.num}>
              <div className="service-dot"></div>
              <div className="service-num">{s.num}</div>
              <div className="service-jp">{s.jp}</div>
              <div className="service-en">{s.en}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ APPROACH ============
function Approach() {
  const ref = useReveal();
  return (
    <section id="approach" className="approach section" ref={ref}>
      <div className="reveal">
        <div className="section-label">Our Approach</div>
        <h2 className="section-title">カレイドのアプローチ</h2>
        <p className="section-lead">
          課題の表面ではなく本質に向き合い、<br/>
          戦略から実行まで一貫して伴走します。
        </p>
      </div>
      <div className="approach-list">
        {APPROACH.map((a, i) => (
          <div className={`approach-row reveal reveal-delay-${Math.min(i+1, 4)}`} key={a.num}>
            <div className="approach-num">{a.num}</div>
            <h3 className="approach-title">{a.title}</h3>
            <p className="approach-desc">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ WHY ============
function Why({ palette, speed }) {
  const ref = useReveal();
  return (
    <section id="why" className="why" ref={ref}>
      <div className="why-kaleido">
        <Kaleidoscope palette={palette} seed={13} speed={speed} />
      </div>
      <div className="section">
        <div className="reveal">
          <div className="section-label">Why Kaleido</div>
          <h2 className="section-title">選ばれる理由</h2>
        </div>
        <div className="why-grid">
          {WHY.map((w, i) => (
            <div className={`why-card reveal reveal-delay-${i+1}`} key={w.num}>
              <div className="why-num">{w.num}</div>
              <div className="why-divider"></div>
              <h3 className="why-title">{w.title}</h3>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA ============
function CTA({ palette, speed }) {
  return (
    <section id="contact" className="cta">
      <div className="cta-kaleido">
        <Kaleidoscope palette={palette} seed={21} speed={speed} />
      </div>
      <div className="cta-inner">
        <div>
          <h2 className="cta-title">
            貴社だけの<br/>
            <span className="accent">形</span>を、設計する。
          </h2>
          <span className="cta-title-en">Let's find your form.</span>
          <p className="cta-sub">
            二度と同じ形にはならない、貴社のためだけの支援を。<br/>
            まずは、30分の無料カウンセリングから始めましょう。
          </p>
        </div>
        <div className="cta-btn-wrap">
          <a href="#" className="cta-btn">
            お問い合わせ
            <span className="arrow">→</span>
          </a>
          <div className="cta-meta">contact@kaleido-consulting.jp</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo"><span className="dot"></span>KALEIDO CONSULTING</div>
      <div>© 2026 Kaleido Consulting Inc. · All Rights Reserved</div>
    </footer>
  );
}

// ============ TWEAKS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "prism",
  "spinSpeed": 1
}/*EDITMODE-END*/;

function TweaksHost({ tweaks, setTweak }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--spin-mult', tweaks.spinSpeed);
  }, [tweaks.spinSpeed]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="万華鏡の配色" />
      <TweakSelect
        label="Palette"
        value={tweaks.palette}
        onChange={v => setTweak('palette', v)}
        options={[
          { value: 'prism', label: 'Prism（標準・全色）' },
          { value: 'cobalt', label: 'Cobalt（青系）' },
          { value: 'fire', label: 'Fire（暖色系）' },
          { value: 'forest', label: 'Forest（緑系）' },
        ]}
      />
      <TweakSection label="アニメーション" />
      <TweakSlider
        label="回転速度"
        value={tweaks.spinSpeed}
        onChange={v => setTweak('spinSpeed', v)}
        min={0} max={3} step={0.1}
        unit="×"
      />
    </TweaksPanel>
  );
}

// ============ APP ============
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES.rose;

  // Apply spin speed via direct style override on every kaleido layer
  useEffect(() => {
    const mult = Math.max(tweaks.spinSpeed || 1, 0.01);
    document.querySelectorAll('.hero-kaleido, .why-kaleido, .concept-kaleido, .cta-kaleido')
      .forEach(el => { el.style.animationDuration = (180 / mult) + 's'; });
    document.querySelectorAll('.services-kaleido')
      .forEach(el => { el.style.animationDuration = (280 / mult) + 's'; });
  }, [tweaks.spinSpeed, tweaks.palette]);

  return (
    <>
      <Nav />
      <Hero palette={palette} speed={tweaks.spinSpeed} />
      <Concept palette={palette} speed={tweaks.spinSpeed} />
      <Etymology />
      <Services palette={palette} speed={tweaks.spinSpeed} />
      <Approach />
      <Why palette={palette} speed={tweaks.spinSpeed} />
      <CTA palette={palette} speed={tweaks.spinSpeed} />
      <Footer />
      <TweaksHost tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
