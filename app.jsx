const { useState, useEffect, useRef } = React;

// ============ DATA ============
const SERVICES = [
  { num: '01', jp: '経営戦略', en: 'Management Strategy', desc: '本質的な価値と進むべき方向を定め、経営判断に確信をもたらします。' },
  { num: '02', jp: '事業戦略', en: 'Business Strategy', desc: '事業固有の強みを源泉に、持続的な成長を実現する道筋を共に描きます。' },
  { num: '03', jp: '組織・人事', en: 'HR & Organization', desc: '採用・評価・制度設計・人材育成。人的資本経営の実践を支援します。' },
  { num: '04', jp: 'マーケティング', en: 'Marketing', desc: 'ブランディング・顧客獲得・LTV向上・デジタルマーケティング戦略の設計と実行支援。' },
  { num: '05', jp: '広報PR', en: 'Public Relations', desc: 'メディア戦略・プレスリリース・SNS広報。パブリックイメージの最大化。' },
  { num: '06', jp: 'AI活用', en: 'AI Integration', desc: '業務へのAI導入・自動化ワークフロー構築で生産性を革新。' },
  { num: '07', jp: 'DX', en: 'Digital Transformation', desc: 'デジタル化戦略・ツール選定、導入・社内定着まで、DX推進を伴走支援。' },
  { num: '08', jp: 'M&A / PMI', en: 'M&A · Post-Merger', desc: 'M&A戦略・デューデリジェンス・PMI（統合後マネジメント）の実行支援。' },
];

const APPROACH = [
  { num: '01', title: 'ヒアリング', desc: '経営課題・組織状態・市場環境を深くヒアリングし、本質的な問いを設定します。' },
  { num: '02', title: '戦略設計', desc: '貴社固有の状況に合わせたオーダーメイドの戦略・施策ロードマップを策定。' },
  { num: '03', title: 'チーム編成', desc: '必要な専門性を持つコンサルタントを最適に組み合わせます。' },
  { num: '04', title: '実行支援', desc: '施策実行を現場レベルまで伴走してサポート。' },
  { num: '05', title: '効果検証・改善', desc: '定量・定性の両面で成果を検証し、次の打ち手へとつなげます。' },
];

const WHY = [
  { num: '01', title: 'オーダーメイド型の支援設計', desc: '貴社の状況・フェーズ・カルチャーに合わせてゼロから支援を設計します。二度と同じ形にはならない——それがカレイドの流儀です。' },
  { num: '02', title: '多領域をカバーする専門チーム', desc: '経営戦略からAI・M&Aまで、8つの専門ドメインを一社でカバー。複合的な課題にも、最適なチームを素早く編成して対応します。' },
  { num: '03', title: '戦略から実行まで一貫伴走', desc: '策定した戦略の実行フェーズまで責任を持って伴走し、現場に根付く成果を共に創ります。' },
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
    { href: '#services', label: 'Services' },
    { href: '#approach', label: 'Approach' },
    { href: '#why', label: 'Why Kaleido' },
    { href: '#company', label: 'Company' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="nav-logo">
        <img src="kaleido-symbol.svg" alt="Kaleido symbol" className="nav-symbol" />
        <div className="nav-logo-text">
          <span className="nav-logo-en">Kaleido</span>
          <span className="nav-logo-ja">株式会社カレイド</span>
        </div>
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
        <p className="hero-desc reveal reveal-delay-2">
          経営戦略・人事・マーケティング・DX・AI活用まで、カレイドは多面的な専門性で貴社の事業成長に伴走します。<br/>
          問いと対話から始まる、オーダーメイドの支援を提供いたします。
        </p>
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
            「Kaleido」はギリシャ語の <em>kalos</em>（美しい）と <em>eidos</em>（形態）を語源としています。万華鏡＝<em>Kaleidoscope</em> の前半部分から来ており、変幻極まりない、二度と同じ形にはならないという意味を持ちます。多彩で多面的なコンサルティングのあり方を体現しています。
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
            経営の全領域にわたる専門チームで、貴社の事業成長・課題解決に伴走いたします。
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
          本質に向き合い、戦略から実行まで一気通貫して伴走いたします。
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
function CTA() {
  return (
    <section id="contact" className="cta-simple">
      <div className="section-label">Contact</div>
      <h2 className="cta-simple-title">お問い合わせ</h2>
      <p className="cta-simple-sub">
        お気軽にご連絡ください。担当より早急にご連絡いたします。
      </p>
      <a href="mailto:contact@kaleido-consulting.jp" className="cta-simple-btn">
        contact@kaleido-consulting.jp
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="kaleido-symbol.svg" alt="Kaleido" className="footer-symbol" />
        <div className="footer-logo-text">
          <span className="footer-logo-en">Kaleido</span>
          <span className="footer-logo-ja">株式会社カレイド</span>
        </div>
      </div>
      <div className="footer-copy">© 2026 Kaleido Inc. · All Rights Reserved</div>
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

// ============ COMPANY ============
function Company() {
  const ref = useReveal();
  const rows = [
    { label: '会社名',    value: '株式会社カレイド' },
    { label: '所在地',    value: '〒106-0032　東京都港区六本木３丁目１６番１２号 六本木ＫＳビル５Ｆ' },
    { label: '資本金',    value: '100,000円' },
    { label: '代表取締役', value: '江原 楓馬' },
  ];
  return (
    <section id="company" className="company section" ref={ref}>
      <div className="reveal">
        <div className="section-label">Company</div>
        <h2 className="section-title">会社概要</h2>
      </div>
      <table className="company-table reveal reveal-delay-1">
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <th>{r.label}</th>
              <td>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
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
      <Etymology />
      <Services palette={palette} speed={tweaks.spinSpeed} />
      <Approach />
      <Why palette={palette} speed={tweaks.spinSpeed} />
      <Company />
      <CTA />
      <Footer />
      <TweaksHost tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
